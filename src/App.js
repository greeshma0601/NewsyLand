import './App.css';
import React, { useEffect,useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import WeatherCard from './components/WeatherCard';
import getFormattedWeatherData from "./services/weatherService";
import StockMarketCard from './components/StockMarketCard';

function App() {
  const pageSize = 12;
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('*');
  const [weather, setWeather] = useState({ details:'No Detail', icon:'01d', temp:273, temp_min:273, temp_max:273, sunrise:0, sunset:0, speed:0, humidity:0, feels_like:0, timezone:1000, dt:1669793656, name:'- ', country:'-' });

  useEffect(() => {

    if (navigator.geolocation) {
      console.log("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        fetchWeather(lat,lon);
      });
    }

    const fetchWeather = async (lat,lon) => {
      await getFormattedWeatherData({lat,lon}).then((data) => {
        console.log(
          `App.js - Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        setWeather(data);
      });
    };

  }, []);
  

  return (
    <div className="App">
      <Router>
      <NavBar setSearchQuery={setSearchQuery}/>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
      />
        <Routes>
          <Route  path="/" element={<><div className="container"><div className="card-group" style={{ margin: '35px 0px -60px', marginTop: '90px', padding: '10px' }}><WeatherCard weather={weather}></WeatherCard><StockMarketCard/></div></div><News setProgress={setProgress} key="general" pageSize={pageSize} country="IN" language="en" query={searchQuery} category="news" /></>}/> 
          <Route  path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageSize} country="IN" language="en" query={searchQuery}  category="business"/>} /> 
          <Route  path="/economics" element={<News setProgress={setProgress} key="economics" pageSize={pageSize} country="IN" language="en" query={searchQuery}  category="economics"/>} />
          <Route  path="/politics" element={<News setProgress={setProgress} key="politics" pageSize={pageSize} country="IN" language="en" query={searchQuery}  category="politics"/>} />
          <Route  path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country="IN" language="en" query={searchQuery}  category="entertainment"/>} /> 
          <Route  path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageSize} country="IN" language="en" query={searchQuery}  category="science"/>} />
          <Route  path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country="IN" language="en" query={searchQuery}  category="tech"/>} />
          <Route  path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country="IN" language="en" query={searchQuery}  category="sport"/>} />
          <Route  path="/travel" element={<News setProgress={setProgress} key="travel" pageSize={pageSize} country="IN" language="en" query={searchQuery}  category="travel"/>} />
          <Route  path="/music" element={<News setProgress={setProgress} key="music" pageSize={pageSize} country="IN" language="en" query={searchQuery}  category="music"/>} />
          <Route  path="/food" element={<News setProgress={setProgress} key="food" pageSize={pageSize} country="IN" language="en" query={searchQuery}  category="food"/>} />
          <Route  path="/gaming" element={<News setProgress={setProgress} key="gaming" pageSize={pageSize} country="IN" language="en" query={searchQuery}  category="gaming"/>} />
          <Route  path="/search" element={<News setProgress={setProgress} key="search" pageSize={pageSize} country="IN" language="en" query={searchQuery} category="Search Results"/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
