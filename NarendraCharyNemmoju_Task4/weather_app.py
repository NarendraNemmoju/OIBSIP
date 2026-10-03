import requests

print("=== Basic Weather App ===")

city = input("Enter city name: ").strip()

if not city:
    print("Error: City name cannot be empty.")
else:
    try:
        # Find the city coordinates
        geo_url = "https://geocoding-api.open-meteo.com/v1/search"

        geo_params = {
            "name": city,
            "count": 1,
            "language": "en",
            "format": "json"
        }

        geo_response = requests.get(geo_url, params=geo_params)
        geo_data = geo_response.json()

        if "results" not in geo_data:
            print("Error: City not found.")
        else:
            latitude = geo_data["results"][0]["latitude"]
            longitude = geo_data["results"][0]["longitude"]
            city_name = geo_data["results"][0]["name"]

            # Get weather information
            weather_url = "https://api.open-meteo.com/v1/forecast"

            weather_params = {
                "latitude": latitude,
                "longitude": longitude,
                "current": "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m"
            }

            weather_response = requests.get(
                weather_url, params=weather_params
            )

            weather_data = weather_response.json()
            current = weather_data["current"]

            temperature = current["temperature_2m"]
            humidity = current["relative_humidity_2m"]
            weather_code = current["weather_code"]
            wind_speed = current["wind_speed_10m"]

            # Convert weather code into a simple condition
            if weather_code == 0:
                condition = "Clear sky"
            elif weather_code in [1, 2, 3]:
                condition = "Partly cloudy"
            elif weather_code in [45, 48]:
                condition = "Foggy"
            elif weather_code in [51, 53, 55, 56, 57]:
                condition = "Drizzle"
            elif weather_code in [61, 63, 65, 66, 67]:
                condition = "Rain"
            elif weather_code in [71, 73, 75, 77]:
                condition = "Snow"
            elif weather_code in [80, 81, 82]:
                condition = "Rain showers"
            elif weather_code in [95, 96, 99]:
                condition = "Thunderstorm"
            else:
                condition = "Unknown"

            print("\n=== Weather Information ===")
            print("City:", city_name)
            print("Temperature:", temperature, "°C")
            print("Humidity:", humidity, "%")
            print("Condition:", condition)
            print("Wind Speed:", wind_speed, "km/h")

    except requests.exceptions.RequestException:
        print("Error: Unable to connect to the weather service.")
    except (KeyError, IndexError):
        print("Error: Unable to process weather information.")