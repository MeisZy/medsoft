'''import csv
from pymongo import MongoClient
import os


script_dir = os.path.dirname(__file__)
csv_file_path = os.path.join(script_dir, "medical_facilities_osm.csv")

try:
  client = MongoClient("mongodb://localhost:27017/")
  db = client["mongo_markers"]  
  collection = db["medsoft_leafletmarkers"]

  def append_data_to_mongodb():
      """
      This function reads data from a CSV file and appends it to a MongoDB collection.
      """
      with open(csv_file_path, "r") as csvfile:
          reader = csv.DictReader(csvfile)
          next(reader, None)

          for document in reader:
              data = dict(document)
              collection.insert_one(data)

  if __name__ == "__main__":
      append_data_to_mongodb()
      print("Data appended successfully!")

except FileNotFoundError as e:
  print(f"Error: File not found. {e}")
  print("Make sure the CSV file exists in the same directory as the script.")'''

