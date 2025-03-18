import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mock the fetch function
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        city: 'Halifax',
        temperature: 15,
        feels_like: 14,
        temp_min: 10,
        temp_max: 20,
        humidity: 60,
        pressure: 1012,
        wind_speed: 5,
        wind_deg: 180,
        weather_description: 'Clear sky',
      }),
  })
);

describe('Home Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading state', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading weather.../i)).toBeInTheDocument();
  });

  test('renders weather data after fetch', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Wait for the weather data to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Halifax/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Temperature: 15°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Feels Like: 14°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Min Temp: 10°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Max Temp: 20°C/i)).toBeInTheDocument();
  });

  test('renders error message on fetch failure', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch failed')));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Unable to load weather information/i)).toBeInTheDocument();
    });
  });
});
