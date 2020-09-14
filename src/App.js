import React, { useState } from "react";
import { Spring } from "react-spring/renderprops";
const api = {
  key: "93913df5bf36d8f93d5977685127d948",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [cod, setCod] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setCod(result.cod);
          setQuery("");
          console.log(result);
        });
    }
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16 && weather.main.temp < 24
            ? "app"
            : weather.main.temp >= 24
            ? "app hot"
            : "app cold"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" && cod !== "404" ? (
          <div>
            <Spring
              from={{ opacity: 0, marginLeft: -500 }}
              to={{ opacity: 1, marginLeft: 0 }}
              config={{ delay: 700, duration: 700 }}
            >
              {(props) => (
                <div className="location-box" style={props}>
                  <div className="location">
                    {weather.name}, {weather.sys.country}
                  </div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
              )}
            </Spring>
            <Spring
              from={{ opacity: 0, marginRight: -500 }}
              to={{ opacity: 1, marginRight: 0 }}
              config={{ delay: 800, duration: 800 }}
            >
              {(props) => (
                <div className="weather-box" style={props}>
                  <div className="temp">{Math.round(weather.main.temp)}°</div>
                  <div className="weather">{weather.weather[0].main}</div>
                  <div className="options animate__animated animate__backInDown">
                    Feels like {Math.round(weather.main.feels_like)}° | Humidity
                    : {weather.main.humidity}% | Min Temp :{" "}
                    {Math.round(weather.main.temp_min)}° | Max Temp :{" "}
                    {Math.round(weather.main.temp_max)}°
                  </div>
                </div>
              )}
            </Spring>
          </div>
        ) : cod === "404" ? (
          <div className="loc-unknown">City not found</div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
