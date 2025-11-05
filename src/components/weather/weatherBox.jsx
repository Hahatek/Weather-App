import {
  WiDaySunny,
  WiDayLightning,
  WiCloud,
  WiCloudy,
  WiCloudyWindy,
  WiDayRain,
  WiDaySnow,
  WiShowers,
  WiSnowWind,
} from "weather-icons-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button.jsx";

import "../../weatherBox.css";

function WeatherBox({ weather, city }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const ICON_BY_CODE = {
    0: WiDaySunny,
    1: WiCloud,
    2: WiCloud,
    3: WiCloudy,
    45: WiCloudy,
    48: WiCloudy,
    51: WiCloudyWindy,
    53: WiCloudyWindy,
    55: WiCloudyWindy,
    56: WiCloudyWindy,
    57: WiCloudyWindy,
    61: WiDayRain,
    63: WiDayRain,
    65: WiDayRain,
    66: WiDayRain,
    67: WiDayRain,
    71: WiDaySnow,
    73: WiDaySnow,
    75: WiDaySnow,
    77: WiDaySnow,
    80: WiShowers,
    81: WiShowers,
    82: WiShowers,
    85: WiSnowWind,
    86: WiSnowWind,
    95: WiDayLightning,
    96: WiDayLightning,
    99: WiDayLightning,
  };

  function getIconByCode(code) {
    return ICON_BY_CODE[code] || WiDaySunny;
  }

  const code = weather?.current?.weatherCode;
  const Icon = getIconByCode(code);

  return (
    <>
      <div className="box-border flex flex-col disp 2xl:w-full 2xl:justify-center 2xl:place-items-center">
        <div
          className="shadow-xl mt-5 w-78 h-95 rounded-2xl flex flex-col
          place-items-center justify-center 
          "
        >
          <Icon size={128} color="#f59e0b" />
          <p className="mt-6">{city}</p>
          <p className="mt-3">
            Temperature: {Math.round(weather.current.temperature)}°C
          </p>
          <p>Wind speed: {Math.round(weather.current.windSpeed)} km/h</p>
        </div>
        <div className="relative shadow-xl mt-5 w-78 h-60 rounded-2xl ">
          <div
            className={
              !isLoggedIn
                ? "blur-2xl mt-5 w-78 h-60 rounded-2xl pointer-events-none"
                : "shadow-xl mt-5 w-78 h-60 rounded-2xl"
            }
          >
            <iframe
              sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
              src="https://widgets.meteox.com/en-GB/widgets/radar/continent/eu/satellite"
              style={{
                width: "100%",
                maxWidth: "320px",
                maxHeight: "240px",
                height: "100%",
                padding: "0px",
                border: "none",
                borderRadius: "16px",
                boxSizing: "border-box",
              }}
              scrolling="no"
              frameBorder="0"
            ></iframe>
          </div>
          {!isLoggedIn && (
            <div className="relative -top-40">
              <p className="text-[#eeeeee] pointer-events-none">
                You must log in to see this.
              </p>
              <Button text="Login" onClick={() => navigate("/logins")} />
            </div>
          )}
        </div>
        <div className="relative shadow-xl mt-5 w-78 h-60 rounded-2xl ">
          <div
            className={
              !isLoggedIn
                ? "blur-2xl mt-5 w-78 h-60 rounded-2xl pointer-events-none"
                : ""
            }
          ></div>
          {!isLoggedIn && (
            <div className="relative -top-40">
              <p className="text-font pointer-events-none">
                You must log in to see this.
              </p>
              <Button text="Login" onClick={() => navigate("/logins")} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherBox;
