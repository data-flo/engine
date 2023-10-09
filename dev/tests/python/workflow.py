import pandas as pd
from geopy.geocoders import Nominatim
import re
import sys

def split(location):
    regex = r"(-?\d+[\.,]?\d*)\s?([NS]?)\s?(-?\d+[\.,]?\d*)\s?([EW]?)"
    latitude = None
    longitude = None
    if isinstance(location, str):
        # print (location)
        matches = re.search(regex, location, re.IGNORECASE)

        if matches:
            # print ("Match was found at {start}-{end}: {match}".format(start = matches.start(), end = matches.end(), match = matches.group()))

            latitude = matches.group(1).replace(",", ".")
            longitude = matches.group(3).replace(",", ".")

            if matches.group(2) == "S" or matches.group(2) == "s":
                latitude = "-" + latitude
            
            if matches.group(4) == "W" or matches.group(4) == "e":
                longitude = "-" + longitude
            
            for groupNum in range(0, len(matches.groups())):
                groupNum = groupNum + 1
                
                # print ("Group {groupNum} found at {start}-{end}: {group}".format(groupNum = groupNum, start = matches.start(groupNum), end = matches.end(groupNum), group = matches.group(groupNum)))

    # sys.exit()
    return latitude, longitude

# Function to geocode an address using Nominatim (you may need an API key for heavy usage)
def geocode_address(address):
    geolocator = Nominatim(user_agent="geocoder")
    location = geolocator.geocode(address)
    if location:
        return location.latitude, location.longitude
    else:
        return None, None

# Read the CSV file
input_csv = "test_data_500Krow_66column.csv"
output_csv = "output.csv"  # Change this to your desired output file name

# Load the CSV into a DataFrame
df = pd.read_csv(input_csv, dtype = "string")

# Geocode the addresses in a specific column (e.g., 'Address') and create new columns for latitude and longitude
df[['Latitude', 'Longitude']] = df['lat_lon'].apply(split).apply(pd.Series)

# Save the DataFrame back to a new CSV file
df.to_csv(output_csv, index=False)

# print(f"Geocoding completed. Results saved to {output_csv}")
