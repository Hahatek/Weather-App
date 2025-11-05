import { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";

import SearchBar from "../../components/weather/searchbar.jsx";
import WeatherBox from "../../components/weather/weatherBox.jsx";
import Navbar from "../../components/layout/Navbar.jsx";

// default fallback location if nothing is saved
const default_location = {
  lat: 53.0138,
  lon: 18.5984,
  city: "Toruń",
};
//
function HomePage() {
  // weather state (null until data is fetched)
  const [weather, setWeather] = useState(null);

  //coordinates state; load from localStorage or fallback to default
  const [cords, setCords] = useState(() => {
    // try to load coords from localStorage; if nothing is saved, use default location
    const saved = localStorage.getItem("cords");
    return saved ? JSON.parse(saved) : default_location;
  });

  // city name; load from localStorage or fallback to default
  const [city, setCity] = useState(() => {
    return localStorage.getItem("city") || default_location.city;
  });

  // flag if geolocation was already resolved
  const [hasLocation, setHasLocation] = useState(false);

  //flag if app was initialized from stored coords
  const [initFromStorage] = useState(() => !!localStorage.getItem("cords"));

  // try to get geolocation on first run (if not already from storage)
  useEffect(() => {
    if (!hasLocation) {
      if (!navigator.geolocation) {
        console.warn("Geolokalizacja nie jest wspierana.");
        setCords({ lat: 53.0138, lon: 18.5984 });
        setCity("Toruń");
        setHasLocation(true);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCords({ lat, lon });
          localStorage.setItem("cords", JSON.stringify({ lat, lon }));
          setHasLocation(true);

          try {
            const response = await fetch(
              `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&count=1`
            );
            const data = await response.json();

            if (data.results && data.results.length > 0) {
              setCity(data.results[0].name);
              localStorage.setItem("city", data.results[0].name);
            } else {
              setCity("Your location");
              localStorage.setItem("city", "Your location");
            }
          } catch (error) {
            console.error("Reverse geocoding nie powiódł się:", error);
            setCity("Nieznane");
          }
        },
        (error) => {
          console.warn(
            "Użytkownik nie zezwolił na lokalizację lub wystąpił błąd:",
            error
          );
          setCords({ lat: 53.0138, lon: 18.5984 });
          localStorage.setItem(
            "cords",
            JSON.stringify({ lat: 53.0138, lon: 18.5984 })
          );
          setCity("Toruń");
          localStorage.setItem("city", "Toruń");
          setHasLocation(true);
        },
        { timeout: 10000 }
      );
    }
  }, [hasLocation, initFromStorage]);

  // load cached weather and fetch new data when cords or city changes
  useEffect(() => {
    const cachedWeather = localStorage.getItem("weatherData");
    if (cachedWeather) {
      setWeather(JSON.parse(cachedWeather));
    }

    async function getWeather() {
      if (!cords) return;
      const params = {
        latitude: [cords.lat],
        longitude: [cords.lon],
        current:
          "temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,is_day,rain,cloud_cover",
        hourly: "temperature_2m,precipitation",
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
      };

      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];

      const utcOffsetSeconds = response.utcOffsetSeconds();
      const current = response.current();
      const hourly = response.hourly();
      const daily = response.daily();

      const range = (start, stop, step) =>
        Array.from(
          { length: (stop - start) / step },
          (_, i) => start + i * step
        );

      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature: current.variables(0).value(),
          weatherCode: current.variables(1).value(),
          windSpeed: current.variables(2).value(),
          isDay: current.variables(3).value(),
          rain: current.variables(4).value(),
          cloudClover: current.variables(5).value(),
        },
        hourly: {
          time: range(
            Number(hourly.time()),
            Number(hourly.timeEnd()),
            hourly.interval()
          ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
          temperature: hourly.variables(0).valuesArray(),
          precipitation: hourly.variables(1).valuesArray(),
        },
        daily: {
          time: range(
            Number(daily.time()),
            Number(daily.timeEnd()),
            daily.interval()
          ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
          weatherCode: daily.variables(0).valuesArray(),
          temperatureMax: daily.variables(1).valuesArray(),
          temperatureMin: daily.variables(2).valuesArray(),
        },
      };

      localStorage.setItem("weatherData", JSON.stringify(weatherData));
      setWeather({ ...weatherData, city });
    }

    getWeather();
  }, [cords, city]);

  if (!weather) return <div>Ładowanie pogody...</div>;

  return (
    <>
      <Navbar />
      <SearchBar
        setCity={(name) => {
          setCity(name);
          localStorage.setItem("city", name);
        }}
        setCords={(c) => {
          setCords(c);
          localStorage.setItem("cords", JSON.stringify(c));
        }}
      />
      <WeatherBox weather={weather} city={city} />
    </>
  );
}

export default HomePage;
