from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="my-application")

def get_location():
    location = geolocator.geocode("")
    return (location.latitude, location.longitude)

if __name__ == '__main__':
    lat, lon = get_location()
    print(f"Latitude: {lat}, Longitude: {lon}")
