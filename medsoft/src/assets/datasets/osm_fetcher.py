import os
import requests
import csv
import json

# TIP - QC as center of origin
ORIGIN = "14.6091,121.0223"
OVERPASS_API_URL = "https://lz4.overpass-api.de/api/interpreter"
radius_km = 100  
radius_m = radius_km * 1000

overpass_query = f"""
[out:json];
node(around:{radius_m},{ORIGIN})["amenity"="hospital"];
out body;
>;
out skel qt;
"""

response = requests.post(OVERPASS_API_URL, data=overpass_query)

filer = ""
if response.status_code == 200:
    results = response.json()["elements"]
    medical_facilities = []
    for result in results:
        name = result.get("tags", {}).get("name", "Unknown")
        lat = result.get("lat", "")
        lon = result.get("lon", "")
        if lat and lon and name != "Unknown": 
            medical_facilities.append({
                "name": name,
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [float(lon), float(lat)]
                }
            })

    # Add hospital type categorization
    for facility in medical_facilities:
        # Assign hospital type based on some criteria
        # For example, you can categorize based on the facility's name or location
        if "General" in facility["name"]:
            facility["hospital_type"] = "Primary"
        elif "District" in facility["name"]:
            facility["hospital_type"] = "Secondary"
        else:
            facility["hospital_type"] = "Tertiary"

    # Save as GeoJSON
    geojson_file = os.path.join(os.path.dirname(filer), "medical_facilities_osm.geojson")
    with open(geojson_file, "w", encoding="utf-8") as file:
        file.write(json.dumps({
            "type": "FeatureCollection",
            "features": medical_facilities
        }, indent=2))

    # Save as CSV with hospital type columns
    csv_file = os.path.join(os.path.dirname(filer), "medical_facilities_osm.csv")
    with open(csv_file, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["Name", "Latitude", "Longitude", "Hospital Type"])
        for facility in medical_facilities:
            writer.writerow([facility["name"], facility["geometry"]["coordinates"][1], facility["geometry"]["coordinates"][0], facility["hospital_type"]])

    print(f"Data saved to {csv_file}")
    print(f"Data saved to {geojson_file}")
else:
    print("Error fetching data from Overpass API")