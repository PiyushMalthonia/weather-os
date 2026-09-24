import { useEffect, useState } from 'react'
import {
  getWeather,
  searchLocation
} from './services/weatherApi'
import './App.css'

function App() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState({
    name: 'Kathua',
    state: 'Jammu & Kashmir',
    latitude: 32.3866,
    longitude: 75.5176,
  })

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function loadWeather(latitude, longitude) {
    try {
      setLoading(true)
      setError(null)

      const data = await getWeather(latitude, longitude)

      setWeather(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWeather(location.latitude, location.longitude)
  }, [])

  async function handleSearch(event) {
    event.preventDefault()

    if (!search.trim()) return

    try {
      setError(null)

      const results = await searchLocation(search)

      if (results.length === 0) {
        setError('Location not found')
        return
      }

      const result = results[0]

      const newLocation = {
        name: result.name,
        state: result.admin1 || result.country,
        latitude: result.latitude,
        longitude: result.longitude,
      }

      setLocation(newLocation)

      await loadWeather(
        result.latitude,
        result.longitude
      )

      setSearch('')
    } catch (error) {
      setError(error.message)
    }
  }

  function getWeatherIcon(code) {
    if (code === 0) return '☀️'
    if (code <= 3) return '⛅'
    if (code <= 48) return '🌫️'
    if (code <= 67) return '🌧️'
    if (code <= 77) return '❄️'
    if (code <= 82) return '🌧️'
    if (code <= 99) return '⛈️'

    return '☁️'
  }

  function getWeatherCondition(code) {
    if (code === 0) return 'Clear Sky'
    if (code <= 3) return 'Partly Cloudy'
    if (code <= 48) return 'Foggy'
    if (code <= 67) return 'Rainy'
    if (code <= 77) return 'Snowy'
    if (code <= 82) return 'Rain Showers'
    if (code <= 99) return 'Thunderstorm'

    return 'Cloudy'
  }

  if (loading) {
    return (
      <div className="loading">
        Loading weather...
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="loading">
        No weather data available
      </div>
    )
  }

  const current = weather.current

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <h2 className="logo">
          WeatherOS
        </h2>

        <nav>
          <a href="#">Dashboard</a>
          <a href="#">Forecast</a>
          <a href="#">Radar</a>
          <a href="#">Air Quality</a>
          <a href="#">Maps</a>
          <a href="#">Alerts</a>
        </nav>

        <div className="saved">
          <p>Saved Locations</p>
          <a href="#">Kathua</a>
          <a href="#">Delhi</a>
          <a href="#">Mumbai</a>
        </div>

      </aside>

      {/* Main */}
      <main className="main">

        {/* Header */}
        <header className="header">

          <div>
            <p className="greeting">
              Good afternoon
            </p>

            <h1>
              Weather Dashboard
            </h1>
          </div>

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search location..."
              className="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </form>

        </header>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {/* Current Weather */}
        <section className="current-weather">

          <div>

            <p className="location">
              {location.name}, {location.state}
            </p>

            <h2>
              {Math.round(current.temperature_2m)}°
            </h2>

            <p className="condition">
              {getWeatherCondition(
                current.weather_code
              )}
            </p>

            <p>
              Feels like{' '}
              {Math.round(
                current.apparent_temperature
              )}°
            </p>

          </div>

          <div className="weather-icon">
            {getWeatherIcon(
              current.weather_code
            )}
          </div>

        </section>

        {/* Weather Details */}
        <section className="weather-details">

          <div className="weather-card">
            <span>💧</span>
            <p>Humidity</p>
            <h3>
              {current.relative_humidity_2m}%
            </h3>
          </div>

          <div className="weather-card">
            <span>💨</span>
            <p>Wind</p>
            <h3>
              {Math.round(
                current.wind_speed_10m
              )} km/h
            </h3>
          </div>

          <div className="weather-card">
            <span>🌡️</span>
            <p>Temperature</p>
            <h3>
              {Math.round(
                current.temperature_2m
              )}°C
            </h3>
          </div>

          <div className="weather-card">
            <span>🌧️</span>
            <p>Rain Probability</p>
            <h3>
              {weather.hourly
                .precipitation_probability[0]}%
            </h3>
          </div>

        </section>

        {/* Hourly Forecast */}
        <section className="forecast-section">

          <h2>
            Hourly Forecast
          </h2>

          <div className="hourly">

            {weather.hourly.time
              .slice(0, 6)
              .map((time, index) => {

                const hour =
                  new Date(time).toLocaleTimeString(
                    [],
                    {
                      hour: 'numeric',
                      hour12: true,
                    }
                  )

                return (
                  <div
                    className="hour"
                    key={time}
                  >

                    <p>{hour}</p>

                    <span>
                      {getWeatherIcon(
                        weather.hourly
                          .weather_code[index]
                      )}
                    </span>

                    <h3>
                      {Math.round(
                        weather.hourly
                          .temperature_2m[index]
                      )}°
                    </h3>

                  </div>
                )
              })}

          </div>

        </section>

      </main>

    </div>
  )
}

export default App