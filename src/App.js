import React, { useState, useEffect } from 'react';
import './App.css';
import {
  FaSistrix
} from 'react-icons/fa'

function App() {
  const [state,setState]=useState(false)
  const [data,setData]= useState({});
  const [weather,setWeather]=useState('')
  const [image, setImage] = useState('https://images.unsplash.com/photo-1510987836583-e3fb9586c7b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')
  const [locationText,setLocationText]= useState('')
  // const [location,setLocation]=useState('')
  const getImage = async (weather) => {
    const responseImg = await fetch(`https://api.unsplash.com/search/photos?page=1&query="
    ${weather}&client_id=xxMjtXxO4TBpEKFS6Gy6PZbXMl8TcGGcFfbFOClx9Ks`);

    const imgData = await responseImg.json();

    setImage(imgData.results[Math.floor(Math.random() * 10)].urls.regular);
  }
  const bgImgStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
  }  
  const getData = async (locationText) => {
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationText}&appid=${process.env.REACT_APP_API_KEY}`);
    setData(await response.json());
    // setWeather(data.weather[0].main)
    setState(true)
    }
    catch(err){
      // alert(err)
    }
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    // setLocation(locationText)
    getData(locationText);
    getImage(weather);
  }
  // console.log(data)
  // useEffect(()=>{
  // },[location])
  useEffect(()=>{
    if(state){
    setWeather(data.weather[0].main)}
  },[data])

  useEffect(()=>{
    if(state){
    getImage(weather)}
  },[weather])
  // useEffect(()=>{
  // },[data])
  const handleChange =(e)=>{
    setLocationText(e.target.value)
  }
  let x;
  const dispTime=(time)=>{
    x=new Date(time * 1000);
    console.log(x)
    let hours =x.getHours();
    // return hours;
    let minutes= x.getMinutes();
    if (hours>12){
      hours=hours-12;
    }
    if(hours===0){
      hours=12
    }
    return (`${hours}: ${minutes}`)
  }
  const dispDate=()=>{
    x=String(new Date());
    return (x.slice(0,24));
  }
  return (
    <main className='main' >
      <div className="main-bg" style={bgImgStyle}></div>
      <div className="ux">
        <div className="info" style={bgImgStyle}>
          <div className="info-text">
            <h1 className="temp">{Object.keys(data).length === 0 ? 0 : (data.main.temp - 273).toFixed(1)}°</h1>
            <div className="location-time">
              <h2>{Object.keys(data).length === 0 ? 'Damak' : data.name}</h2>
              <p className="date">{dispDate()}</p>
            </div>
            <div className="weather">
              <img src={Object.keys(data).length === 0?'':`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="" />
              {weather}
            </div>
          </div>
        </div>
        <div className="ui">
          <form action=''  onSubmit={handleSubmit}>
            <input type="text" placeholder='location' value={locationText} onChange={handleChange}/>
            <button type="submit"><FaSistrix className='icon' /></button>
          </form>

          <div className="weather-details">
            <h2>Weather Details</h2>
            <div className="details">
              <div className="clouds details-el">
                <p>Clouds</p> <h4>{Object.keys(data).length === 0?'0':data.clouds.all}%</h4>
              </div>
              <div className="humidity details-el">
                <p>Humidity</p> <h4>{Object.keys(data).length === 0 ? '0' : data.main.humidity}%</h4>
              </div>
              <div className="wind details-el">
                <p>Wind</p> <h4>{Object.keys(data).length === 0 ? 0 : ((data.wind.speed)*3.6).toFixed(1)}km/h</h4>
              </div>
              <div className="sunset details-el">
                <p>Sunset</p><h4>{Object.keys(data).length === 0 ? 0 : dispTime(data.sys.sunset)} PM</h4>
              </div>
              <div className="sunrise details-el">
                <p>Sunrise</p> <h4>{Object.keys(data).length === 0 ? 0 : dispTime(data.sys.sunrise)} AM</h4>
              </div>
              <div className="latitude details-el">
                <p>Latitude</p><h4>{Object.keys(data).length === 0 ? '0.00' : data.coord.lat}1</h4>
              </div>
              <div className="longitude details-el">
                <p>Longitude</p><h4>{Object.keys(data).length === 0 ? '0.00' : data.coord.lon}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
