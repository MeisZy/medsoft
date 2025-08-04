import os
import requests
import csv
import json

# TIP - QC as center of origin
ORIGIN = "14.6091,121.0223"
OVERPASS_API_URL = "https://overpass-api.de/api/interpreter"
radius_m= 10000  

def fetch_medical_facilities():
    overpass_query = f"""
    [out:json];
    area["ISO3166-1"="PH"]->.city;
    (
      node["amenity"="hospital"](area.city);
      way["amenity"="hospital"](area.city);
      relation["amenity"="hospital"](area.city);
    );
    out body;
    >;
    out skel qt;
    out meta;
    """

    response = requests.post(OVERPASS_API_URL, data=overpass_query)

    if response.status_code == 200:
        results = response.json()["elements"]
        medical_facilities = []
        missing_city_count = 0
        for result in results:
            name = result.get("tags", {}).get("name", "Unknown")
            lat = result.get("lat", "")
            lon = result.get("lon", "")
            city = result.get("tags", {}).get("addr:city", "")
            if lat and lon and name != "Unknown": 
                medical_facilities.append({
                    "name": name,
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [float(lon), float(lat)]
                    },
                    "city": city
                })
                if not city:
                    missing_city_count += 1

        # hospital type categorization
        for facility in medical_facilities:
            if "General" in facility["name"]:
                facility["hospital_type"] = "Primary"
            elif "District" in facility["name"]:
                facility["hospital_type"] = "Secondary"
            else:
                facility["hospital_type"] = "Tertiary"

        return medical_facilities, missing_city_count
    else:
        print("Error fetching data from Overpass API")
        return [], 0

# Fetch medical facilities and missing city count
medical_facilities, missing_city_count = fetch_medical_facilities()

# Save as GeoJSON
geojson_file = os.path.join(os.path.dirname(__file__), "medical_facilities_osm.geojson")
with open(geojson_file, "w", encoding="utf-8") as file:
    file.write(json.dumps({
        "type": "FeatureCollection",
        "features": medical_facilities
    }, indent=2))

# Save as CSV 
csv_file = os.path.join(os.path.dirname(__file__), "medical_facilities_osm.csv")
with open(csv_file, "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["Name", "Latitude", "Longitude", "Hospital Type", "City", "Location"])
    for facility in medical_facilities:
        location = f"{facility['geometry']['coordinates'][1]}, {facility['geometry']['coordinates'][0]}"
        writer.writerow([facility["name"], facility["geometry"]["coordinates"][1], facility["geometry"]["coordinates"][0], facility["hospital_type"], facility["city"], location])

print(f"Data saved to {csv_file} and {geojson_file}")
print(f"Out of {len(medical_facilities)}, There are {missing_city_count} facilities lacking their respective location.")
print(f"{(missing_city_count / len(medical_facilities)) * 100:.2f}% are missing their respective locations")
