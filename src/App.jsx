import './App.css'

function App() {

  const weatherData = {
    location: 'Kathua, Jammu & Kashmir',
    temperature: 28,
    feelsLike: 30,
    condition: 'Partly Cloudy',
    humidity: 54,
    wind: 14,
    uvIndex: 5,
    visibility: 10,
  }

  const hourlyForecast = [
    { time: '12 PM', icon: '☀️', temperature: 28 },
    { time: '1 PM', icon: '☀️', temperature: 29 },
    { time: '2 PM', icon: '⛅', temperature: 30 },
    { time: '3 PM', icon: '🌧️', temperature: 29 },
    { time: '4 PM', icon: '🌧️', temperature: 27 },
    { time: '5 PM', icon: '☁️', temperature: 26 },
  ]

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
            <p className="location">{weatherData.location}</p>

            <h2>{weatherData.temperature}°</h2>

            <p className="condition">
              {weatherData.condition}
            </p>

            <p>
              Feels like {weatherData.feelsLike}°
            </p>
          </div>

          <div className="weather-icon">
            ☁️
          </div>
        </section>

        {/* Weather Details */}
        <section className="weather-details">

          <div className="weather-card">
            <span>💧</span>
            <p>Humidity</p>
            <h3>{weatherData.humidity}%</h3>
          </div>

          <div className="weather-card">
            <span>💨</span>
            <p>Wind</p>
            <h3>{weatherData.wind} km/h</h3>
          </div>

          <div className="weather-card">
            <span>☀️</span>
            <p>UV Index</p>
            <h3>{weatherData.uvIndex}</h3>
          </div>

          <div className="weather-card">
            <span>👁️</span>
            <p>Visibility</p>
            <h3>{weatherData.visibility} km</h3>
          </div>

        </section>

        {/* Hourly Forecast */}
        <section className="forecast-section">
          <h2>Hourly Forecast</h2>

          <div className="hourly">

            {hourlyForecast.map((hour) => (
              <div className="hour" key={hour.time}>

                <p>{hour.time}</p>

                <span>{hour.icon}</span>

                <h3>{hour.temperature}°</h3>

              </div>
            ))}

          </div>
        </section>

      </main>
    </div>
  )
}

export default App