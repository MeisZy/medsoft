import os
import requests
import csv

ORIGIN = "14.6158,121.0421"
OVERPASS_API_URL = "https://lz4.overpass-api.de/api/interpreter"
radius_km = 10  

radius_m = radius_km * 1000

overpass_query = f"""
[out:json];
node(around:{radius_m},{ORIGIN})["amenity"="hospital"];
out;
"""

response = requests.post(OVERPASS_API_URL, data=overpass_query)

data = []
if response.status_code == 200:
    results = response.json()["elements"]
    for result in results:
        name = result.get("tags", {}).get("name", "Unknown")  
        lat = result.get("lat", "")
        lon = result.get("lon", "")
        if lat and lon: 
            data.append((name, lat, lon))

    csv_file = os.path.join(os.path.dirname(__file__), "medical_facilities_osm.csv")
    with open(csv_file, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["Name", "Latitude", "Longitude"])
        writer.writerows(data)

    print(f"Data saved to {csv_file}")
else:
    print("Error fetching data from Overpass API")
