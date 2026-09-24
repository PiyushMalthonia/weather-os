import { useEffect, useState } from 'react'
import { getWeather } from './services/weatherApi'
import './App.css'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchWeather() {
      try {
        const data = await getWeather(32.3866, 75.5176)
        setWeather(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

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

  if (error) {
    return (
      <div className="loading">
        Error: {error}
      </div>
    )
  }

  const current = weather.current

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">WeatherOS</h2>

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

      {/* Main Content */}
      <main className="main">

        {/* Header */}
        <header className="header">
          <div>
            <p className="greeting">Good afternoon</p>
            <h1>Weather Dashboard</h1>
          </div>

          <input
            type="text"
            placeholder="Search location..."
            className="search"
          />
        </header>

        {/* Current Weather */}
        <section className="current-weather">
          <div>
            <p className="location">
              Kathua, Jammu & Kashmir
            </p>

            <h2>
              {Math.round(current.temperature_2m)}°
            </h2>

            <p className="condition">
              {getWeatherCondition(current.weather_code)}
            </p>

            <p>
              Feels like {Math.round(current.apparent_temperature)}°
            </p>
          </div>

          <div className="weather-icon">
            {getWeatherIcon(current.weather_code)}
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
              {Math.round(current.wind_speed_10m)} km/h
            </h3>
          </div>

          <div className="weather-card">
            <span>🌡️</span>
            <p>Temperature</p>
            <h3>
              {Math.round(current.temperature_2m)}°C
            </h3>
          </div>

          <div className="weather-card">
            <span>🌧️</span>
            <p>Rain Probability</p>
            <h3>
              {weather.hourly.precipitation_probability[0]}%
            </h3>
          </div>

        </section>

        {/* Hourly Forecast */}
        <section className="forecast-section">

          <h2>Hourly Forecast</h2>

          <div className="hourly">

            {weather.hourly.time.slice(0, 6).map((time, index) => {

              const hour = new Date(time).toLocaleTimeString([], {
                hour: 'numeric',
                hour12: true
              })

              return (
                <div className="hour" key={time}>

                  <p>{hour}</p>

                  <span>
                    {getWeatherIcon(
                      weather.hourly.weather_code[index]
                    )}
                  </span>

                  <h3>
                    {Math.round(
                      weather.hourly.temperature_2m[index]
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