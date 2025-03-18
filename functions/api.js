const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { readFile } = require('fs').promises;
const serverless = require('serverless-http');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

// Reading JSON data from the file
// const projects = require('./projects');

// async function loadProjects() {
//   try {
//     const data = await readFile('./data/projects.json', 'utf-8');
//     projects = JSON.parse(data);
//   } catch (error) {
//     console.error('Error loading projects:', error);
//   }
// }

// loadProjects();

router.get('/projects', (req, res) => {
  const projects = [
    {
      title: "Threads Clone WebApp",
      description: "Developed a mirror version of Meta's Threads app using Next.js, MongoDB, TypeScript, and TailwindCSS.",
      liveDemo: "https://threads-eight-theta.vercel.app",
      repo: "https://github.com/TobiOnibudo/threads"
    },
    {
      title: "E-commerce Website",
      description: "Created a full-featured e-commerce site using React, TypeScript, MongoDB, Express.js, and Node.js.",
      repo: "https://github.com/TobiOnibudo/Ecommerce"
    }
  ];

  res.json(projects);
});

router.get('/weather', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Halifax&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const weatherData = {
      city: data.name,
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      weather_description: data.weather[0].description,
    };

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.use('/api/', router);

module.exports.handler = serverless(app);
