import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { readFile } from 'fs/promises';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const projects = JSON.parse(await readFile(new URL('./data/projects.json', import.meta.url), 'utf-8'));

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/weather', async (req, res) => {
  try {
    console.log("ahshs")
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Halifax&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );
    
    console.log(response.data)

    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      temp_min: response.data.main.temp_min,
      temp_max: response.data.main.temp_max,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      wind_speed: response.data.wind.speed,
      wind_deg: response.data.wind.deg,
      weather_description: response.data.weather[0].description
    };

    res.json(weatherData);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
