import axios from 'axios';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { Input,Space } from 'antd';
import { Card, Spin } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SunOutlined,CaretDownOutlined,CloudOutlined,CompressOutlined,InfoCircleOutlined,PlusCircleOutlined,MinusCircleOutlined } from '@ant-design/icons';
import pic1 from '../Assets/01d.png';
import pic2 from '../Assets/01n.png';
import pic3 from '../Assets/02d.png';
import pic4 from '../Assets/02n.png';
import pic5 from '../Assets/03d.png';
import pic6 from '../Assets/03n.png';
import pic7 from '../Assets/04d.png';
import pic8 from '../Assets/04n.png';
import pic9 from '../Assets/09d.png';
import pic10 from '../Assets/09n.png';
import pic11 from '../Assets/10d.png';
import pic12 from '../Assets/10n.png';
import pic13 from '../Assets/11d.png';
import pic14 from '../Assets/11n.png';
import pic15 from '../Assets/13d.png';
import pic16 from '../Assets/13n.png';
import pic17 from '../Assets/50d.png';
import pic18 from '../Assets/50n.png';


const { Search } = Input;
const gridStyle = {
  width: '25%',
  textAlign: 'center',
  display: 'inline-block',

};
// Define the dictionary mapping file names to imported images
const imageDictionary = {
  '01d': pic1,
  '01n': pic2,
  '02d': pic3,
  '02n': pic4,
  '03d': pic5,
  '03n': pic6,
  '04d': pic7,
  '04n': pic8,
  '09d': pic9,
  '09n': pic10,
  '10d': pic11,
  '10n': pic12,
  '11d': pic13,
  '11n': pic14,
  '13d': pic15,
  '13n': pic16,
  '50d': pic17,
  '50n': pic18
};

// Define a function to retrieve the image based on the file name
function getImage(fileName) {
  return imageDictionary[fileName];
}

const ManualSearch = (param_onSearch) => {
  const [city, setCity] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [Latitude, setLatitude] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch weather data based on latitude and longitude
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${longitude}&appid=e2988beec0b28048d0cab1ce266d13a4`);
      setWeatherData(response.data);

    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      setError('Error fetching weather data');
    }
  };

  const fetchForecastData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${Latitude}&lon=${longitude}&appid=e2988beec0b28048d0cab1ce266d13a4`);
      setForecastData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      setError('Error fetching weather data');
    }
  };

  function removeTimeFromDate(dateTimeString) {
    // Split the string by space
    let parts = dateTimeString.split(' ');

    // Take only the date part (the first part)
    let datePart = parts[0];

    return datePart;
}

  // Function to get user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeatherData(longitude, Latitude);
        fetchForecastData();

      }, (error) => {
        console.error('Error getting user location:', error);
        setError('Geolocation error');
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      setError('Geolocation not supported');
    }
  };

  async function getCoords(cityName) {
    const apiKey = '2dafc8695cb27d200d2a802b46187513';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
  }
  
  const handleSearch = () => {
    onSearch(city);
  };
  const onSearch = async (value, _e, info) => {
    setLoading(true); // Set loading state to true when initiating the search
  
    try {
      const weather = await getCoords(value);
      if (weather) {
        setLongitude(weather.coord.lon);
        setLatitude(weather.coord.lat);
        // Delay setting loading state to false for 3 seconds (3000 milliseconds)
        setTimeout(() => setLoading(false), 3000);
      } else {
        console.log('Weather data not found.');
        setLoading(false); // Set loading state to false when weather data is not found
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
      setLoading(false); // Set loading state to false when there's an error fetching data
    }
  };
  
    // Fetch weather data on component mount
    useEffect(() => {
      getLocation(); // Call getLocation on component mount
      AOS.init({
        offset:300,
      });
      console.log(longitude + " " + Latitude);
    }, [longitude, Latitude]);
  return (
    <div>
      <h2 style={{marginLeft:"17px"}}>Enter any City or Country</h2>
     <Space direction="vertical">
  <Search
    placeholder="Type here.."
    onSearch={onSearch}
    enterButton='Get Forecast'
    
    style={{ paddingLeft:"15px",color:'black'}}
  />
</Space>
      <br/>
      <br/>
      {loading ? (
        <Spin />
      ) : error ? (
        <div>Error: {error}</div>
      ) : !weatherData ? (
        <div>No weather data available</div>
      ) : (
        <>
        <div data-aos="fade-up">
        <Card title="Weather Details">
          
            <div>
            <CaretDownOutlined /> Location: {weatherData.name}
          </div>
          <div>
            <SunOutlined /> Current Temperature: {Math.round(weatherData.main.temp - 273.15)}°C
          </div>
          <div>
            <MinusCircleOutlined /> Minimum Temperature: {Math.round(weatherData.main.temp_min - 273.15)}°C
          </div>
          <div>
            <PlusCircleOutlined /> Maximum Temperature: {Math.round(weatherData.main.temp_max - 273.15)}°C
          </div>
          <div>
            <CloudOutlined /> humidity: {weatherData.main.humidity} g/kg
          </div>
          <div>
            <CompressOutlined /> Pressure: {weatherData.main.pressure} mmHg
          </div>
          <div>
            <InfoCircleOutlined /> Weather Description: {weatherData.weather[0].description}
          </div>
        </Card>
        </div>
        
          <Card title="Hourly Forecast" style={{ marginTop: '10px' }}>
          < div data-aos="fade-up">
            <Card.Grid style={gridStyle}>

              <div className='hourly-weather-item'>
                <img className='item-image' style={{width: '40px', height: '40px', background: '#000000', borderRadius: '50%'}} src={getImage(forecastData.list[0].weather[0].icon)} />
                <br></br>
                <span className='item-time'>{forecastData.list[0].dt_txt}</span>
                <br></br>
                <span className='item-desc'>{forecastData.list[0].weather[0].description}</span>
                <br></br>
                <span className='item-temp'>{Math.round(forecastData.list[0].main.feels_like - 273.15)}°C</span>
              </div>
            </Card.Grid>
            <Card.Grid style={gridStyle}>  <div>
              <img style={{width: '40px', height: '40px', background: '#000000', borderRadius: '50%'}}  src={getImage(forecastData.list[1].weather[0].icon)} /><br/>
              <span>{forecastData.list[1].dt_txt}</span>
              <br></br>
              <span>{forecastData.list[1].weather[0].description}</span>
              <br></br>
              <span>{Math.round(forecastData.list[1].main.feels_like - 273.15)}°C</span>
            </div></Card.Grid>
            <Card.Grid style={gridStyle}>  <div>
              <img style={{width: '40px', height: '40px', background: '#000000', borderRadius: '50%'}}  src={getImage(forecastData.list[2].weather[0].icon)} /><br/>
              <span>{forecastData.list[2].dt_txt}</span>
              <br></br>
              <span>{forecastData.list[2].weather[0].description}</span>
              <br></br>
              <span>{Math.round(forecastData.list[2].main.feels_like - 273.15)}°C</span>
            </div></Card.Grid>
            <Card.Grid style={gridStyle}>  <div>
              <img style={{width: '40px', height: '40px', background: '#000000', borderRadius: '50%'}}  src={getImage(forecastData.list[3].weather[0].icon)} /><br/>
              <span>{forecastData.list[3].dt_txt}</span>
              <br></br>
              <span>{forecastData.list[3].weather[0].description}</span>
              <br></br>
              <span>{Math.round(forecastData.list[3].main.feels_like - 273.15)}°C</span>
            </div></Card.Grid>
           
            <Card.Grid style={gridStyle}>
              <div>
                <img style={{width: '40px', height: '40px', background: '#000000', borderRadius: '50%'}}  src={getImage(forecastData.list[4].weather[0].icon)} /><br/>
                <span>{forecastData.list[4].dt_txt}</span>
                <br></br>
                <span>{forecastData.list[4].weather[0].description}</span>
                <br></br>
                <span>{Math.round(forecastData.list[4].main.feels_like - 273.15)}°C</span>
              </div></Card.Grid>
            <Card.Grid style={gridStyle}>  <div>
              <img style={{width: '40px', height: '40px', background: '#000000', borderRadius: '50%'}}  src={getImage(forecastData.list[5].weather[0].icon)} /><br/>
              <span>{forecastData.list[5].dt_txt}</span>
              <br></br>
              <span>{forecastData.list[5].weather[0].description}</span>
              <br></br>
              <span>{Math.round(forecastData.list[5].main.feels_like - 273.15)}°C</span>
            </div></Card.Grid>
            <Card.Grid style={gridStyle}>  <div>
              <img style={{width: '40px', height: '40px', background: '#000000', borderRadius: '50%'}}  src={getImage(forecastData.list[6].weather[0].icon)} /><br/>
              <span>{forecastData.list[6].dt_txt}</span>
              <br></br>
              <span>{forecastData.list[6].weather[0].description}</span>
              <br></br>
              <span>{Math.round(forecastData.list[6].main.feels_like - 273.15)}°C</span>
            </div></Card.Grid>
            <Card.Grid style={gridStyle}>  <div>
              <img style={{width: '40px', height: '40px', background: '#000000', borderRadius: '50%'}}  src={getImage(forecastData.list[7].weather[0].icon)} /><br/>
              <span>{forecastData.list[7].dt_txt}</span>
              <br></br>
              <span>{forecastData.list[7].weather[0].description}</span>
              <br></br>
              <span>{Math.round(forecastData.list[7].main.feels_like - 273.15)}°C</span>
            </div></Card.Grid>
            </div> 
          </Card>
          
          
          <Card title="Daily Forecast (5 Days)" style={{ marginTop: '10px' }}>
          <div div data-aos="fade-up">
            <Card.Grid style={gridStyle}>

              <div className='hourly-weather-item'>
                <img className='item-image' style={{width: '40px', height: '40px', background: '#000000', borderRadius: '50%'}} src={getImage(forecastData.list[0].weather[0].icon)} />
                <br></br>
                <span className='item-time'>{removeTimeFromDate(forecastData.list[0].dt_txt)}</span>
                <br></br>
                <span className='item-desc'>{forecastData.list[0].weather[0].description}</span>
                <br></br>
                <span className='item-temp'>{Math.round(forecastData.list[0].main.feels_like - 273.15)}°C</span>
              </div>
            </Card.Grid>
            <Card.Grid style={gridStyle}>  <div>
              <img style={{width: '40px', height: '40px', background: '#000000', borderRadius: '50%'}}  src={getImage(forecastData.list[8].weather[0].icon)} /><br/>
              <span>{removeTimeFromDate(forecastData.list[8].dt_txt)}</span>
              <br></br>
              <span>{forecastData.list[8].weather[0].description}</span>
              <br></br>
              <span>{Math.round(forecastData.list[8].main.feels_like - 273.15)}°C</span>
            </div></Card.Grid>
            <Card.Grid style={gridStyle}>  <div>
              <img style={{width: '40px', height: '40px', background: '#000000', borderRadius: '50%'}}  src={getImage(forecastData.list[16].weather[0].icon)} /><br/>
              <span>{removeTimeFromDate(forecastData.list[16].dt_txt)}</span>
              <br></br>
              <span>{forecastData.list[16].weather[0].description}</span>
              <br></br>
              <span>{Math.round(forecastData.list[16].main.feels_like - 273.15)}°C</span>
            </div></Card.Grid>
            <Card.Grid style={gridStyle}>  <div>
              <img style={{width: '40px', height: '40px', background: '#000000', borderRadius: '50%'}}  src={getImage(forecastData.list[24].weather[0].icon)} /><br/>
              <span>{removeTimeFromDate(forecastData.list[24].dt_txt)}</span>
              <br></br>
              <span>{forecastData.list[24].weather[0].description}</span>
              <br></br>
              <span>{Math.round(forecastData.list[24].main.feels_like - 273.15)}°C</span>
            </div></Card.Grid>
            <Card.Grid style={gridStyle}>
              <div>
                <img style={{width: '40px', height: '40px', background: '#000000', borderRadius: '50%'}}  src={getImage(forecastData.list[32].weather[0].icon)} /><br/>
                <span>{removeTimeFromDate(forecastData.list[32].dt_txt)}</span>
                <br></br>
                <span>{forecastData.list[32].weather[0].description}</span>
                <br></br>
                <span>{Math.round(forecastData.list[32].main.feels_like - 273.15)}°C</span>
              </div></Card.Grid>
              </div>
          </Card>

        </>

      )}
      
    </div>

  );
};

export default ManualSearch;

