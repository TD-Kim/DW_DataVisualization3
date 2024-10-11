import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Weather.module.scss';
import WeatherItem from './WeatherItem';
import {
  setTodayWeatherData,
  setWeatherData,
} from '../../store/weatherSlice/weatherSlice';

const initializeData = {
  city: { name: ' ' },
  list: [
    { main: { humidity: 0, temp: 0, temp_max: 0, temp_min: 0 } },
    { wind: { speed: 0, deg: 0, gust: 0 } },
    { dt_txt: ' ' },
    { weather: [{ description: ' ', main: 'Clear', icon: '01d' }] },
  ],
};

function Weather() {
  // const [weatherData, setWeatherData] = useState(initializeData);
  const dispatch = useDispatch();
  const APIkey1 = '6e3669d9ce0d4e84eddd41c90c38ab37';
  const APIkey2 = '7318e8d03f33842f882be1c11ec76a8b';
  const { weatherData } = useSelector((state) => state.weatherSlice);
  const success = () => {
    //   대전 선화동 위도 경도
    const latitude = 36.328799;
    const longitude = 127.4230707;
    const weatherResult = getWeather(latitude, longitude);
    const todayWeatherData = getTodayWeather(latitude, longitude);
  };

  // open the weather

  // 당일 날씨
  const getTodayWeather = async (lat, lon) => {
    try {
      await fetch(
        `/weather/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey2}&units=metric&lang=kr`
      )
        .then(async (response) => {
          return await response.json();
        })
        .then((json) => {
          dispatch(setTodayWeatherData(json));
        });
    } catch (error) {
      console.log(`weather error: ${error}`);
    }
  };

  // 5일 후까지의 날씨
  const getWeather = async (lat, lon) => {
    try {
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`
      // `https://api.openweathermap.org/data/2.5/weather?q=Daejeon&exclude=hourly&appid=${APIkey}&units=metric&lang=kr`
      // `https://api.openweathermap.org//data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr&mode=json`
      // `/api4/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`

      await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey1}&units=metric&lang=kr`
      )
        .then(async (response) => {
          return await response.json();
        })
        .then((json) => {
          console.log(json);
          dispatch(setWeatherData(json));
        });
    } catch (error) {
      console.log(`weather error: ${error}`);
    }
  };

  const weatherCity = weatherData?.city?.name;

  useEffect(() => {
    success();
  }, []);

  return (
    <div className={styles.Weather}>
      <h1>{weatherCity}의 날씨</h1>
      <WeatherItem />
    </div>
  );
}

export default Weather;
