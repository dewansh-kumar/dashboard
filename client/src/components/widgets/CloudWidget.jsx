import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import cloudy from "../../assets/images/cloudy.png";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Replace with OpenWeatherMap API key
  // console.log(import.meta.env.VITE_WEATHER_API_KEY);
  // Fetch weather by city
  const fetchWeatherByCity = async (cityName) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();

      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // get the use location using local ip
  const getUserLocationUsingIp = async () => {
    try {
      return await (await fetch(`http://ip-api.com/json/`)).json();
    } catch (error) {
      setError("Unable to find user location using ip");
    }
  };

  // Get user's current location
  const getUserLocation = async () => {
    const location = await getUserLocationUsingIp();
    // fetchCityByLocation(location.lat, location.lon);
    await fetchWeatherByCity(location.city);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="text-white p-6 rounded-lg shadow-lg  w-full  mx-auto bg-background min-h-[250px] box-border">
      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {/* Weather Display */}
      {weather && (
        <div className=" space-y-3 min-h-[250px]">
          <div className=" space-y-2">
            <div className=" flex justify-between items-center">
              <h3 className=" font-semibold">Weather</h3>
              <div className="flex items-center justify-center  text-lightTextColor">
                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                <h3 className=" font-semibold">{weather.name}</h3>
              </div>
            </div>

            <div>
              <hr className=" border-lightTextColor" />
            </div>
          </div>
          <div className="space-y-4 ">
            <div className=" flex items-center justify-center ">
              <img
                className=" h-[5rem] w-[5rem] text-textColor text-center"
                src={cloudy}
                alt=""
              />
            </div>

            <div className=" text-center flex justify-between items-center">
              <p className="text-4xl font-semibold ">
                {Math.round(weather.main.temp)}°C
              </p>
              <p className=" text-lightTextColor font-semibold">
                {weather.weather[0].description}
              </p>
            </div>

            <div className=" flex justify-between">
              <p className="text-sm font-semibold">Feels like</p>
              <p className="text-lightTextColor">
                {Math.round(weather.main.feels_like)}°C
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm font-semibold">Humidity</p>
              <p className="text-lightTextColor"> {weather.main.humidity}% </p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm font-semibold">Wind</p>
              <p className="text-lightTextColor">{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
