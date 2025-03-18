import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        console.log(response)
        if (!response.ok) throw new Error('response');
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError('Unable to load weather information');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const renderWeather = () => {
    if (loading) return <p className="text-muted">Loading weather...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (weather) {
      return (
        <div className="card bg-light mb-4 p-2 shadow-lg border-0 mx-auto" style={{ maxWidth: '400px' }}>
          <div className="d-flex align-items-center">
            <div className="weather-icon me-3" style={{ fontSize: '2rem' }}>
              🌡️
            </div>
            <div>
              <h5 className="mb-3 text-primary">{weather.city}</h5>
              <div className="mb-2">
                <span className="badge bg-info text-dark">Temperature: {Math.round(weather.temperature)}°C</span>
                <span className="badge bg-warning text-dark ms-2">Feels Like: {Math.round(weather.feels_like)}°C</span>
              </div>
              <div className="mb-2">
                <span className="badge bg-success">Min Temp: {Math.round(weather.temp_min)}°C</span>
                <span className="badge bg-danger ms-2">Max Temp: {Math.round(weather.temp_max)}°C</span>
              </div>
              <p className="mb-1">Humidity: <strong>{weather.humidity}%</strong></p>
              <p className="mb-1">Pressure: <strong>{weather.pressure} hPa</strong></p>
              <p className="mb-1">Wind Speed: <strong>{weather.wind_speed} m/s</strong></p>
              <p className="mb-1">Wind Direction: <strong>{weather.wind_deg}°</strong></p>
              <p className="mb-1">Description: <em>{weather.weather_description}</em></p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{ height: "70vh" }}>
      <div className="text-center">
        <h1 className="display-3 fw-bold text-primary">Hey, I'm Tobi! 👋</h1>
        {renderWeather()}
        <p className="lead text-secondary mt-3">
          I'm a software engineer passionate about building scalable and efficient solutions.  
        </p>
        <p className="text-muted">Check out my work below and feel free to reach out if you'd like to connect!</p>
        <Link className="btn btn-primary mt-3 px-4 py-2" to="/projects">
          View My Work
        </Link>
      </div>
    </div>
  );
}

export default Home;
