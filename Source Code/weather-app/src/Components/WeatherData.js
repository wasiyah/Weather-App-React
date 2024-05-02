import React, { useState, useEffect } from 'react';
import { Card, Spin, Button } from 'antd';
import { SunOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import axios from 'axios';


const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch weather data based on latitude and longitude
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=33.7104&lon=73.1338&appid=e2988beec0b28048d0cab1ce266d13a4`);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      setLoading(false);
      setError('Error fetching weather data');
    }
  };

  // Function to get user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      }, (error) => {
        console.error('Error getting user location:', error);
        setError('Geolocation error');
        setLoading(false);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      setError('Geolocation not supported');
      setLoading(false);
    }
  };

  // Fetch weather data on component mount
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Current Weather</h1>
      
     

      {loading ? (
        <Spin />
      ) : error ? (
        <div>Error: {error}</div>
      ) : !weatherData ? (
        <div>No weather data available</div>
      ) : (
        <Card title="Weather Details">
          <div>
            <SunOutlined /> Current Temperature: {weatherData.main.temp}°C
          </div>
          <div>
            <ClockCircleOutlined /> Current Weather: {weatherData.weather[0].description}
          </div>
        </Card>
      )}
     
    </div>
  );
};

export default WeatherApp;
