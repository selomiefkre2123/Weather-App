import axios from "axios";
import React, { useEffect, useState } from "react";
import search from "../assets/images/search.png";
import Clouds from "../assets/images/Clouds.png";
import clear from "../assets/images/Clear.png";
import rain from "../assets/images/Rain.png";
import Drizzle from "../assets/images/drizzle.png";
import mist from "../assets/images/mist.png";
import humidity from "../assets/images/humidity.png";
import wind from "../assets/images/wind.png";
import "./style.css";


function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image:Clouds
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=d2cea01e767a7d309fd738a3812f1e03&&units=metric`;
      axios
        .get(apiurl)
        .then((res) => {
          let imagepath = "";

          if (res.data.weather[0].main === "Clouds") {
            imagepath = Clouds;
          } else if (res.data.weather[0].main === "Clear") {
            imagepath = clear;
          } else if (res.data.weather[0].main === "Rain") {
            imagepath = rain;
          } else if (res.data.weather[0].main === "Drizzle") {
            imagepath = Drizzle;
          } else if (res.data.weather[0].main === "Mist") {
            imagepath = mist;
          } else {
            imagepath = Clouds;
          }

          console.log(res.data);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagepath,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status == 404) {
            setError("Invalid City Name");
          } else {
            setError("");
          }
         console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            {" "}
            <img src={search} onClick={handleClick} alt="" />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="winfo">
          <img src={data.image} alt="" className="icon" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src={humidity} alt="" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
