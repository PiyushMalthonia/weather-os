const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

export async function getWeather(latitude, longitude) {
  const url = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch weather data')
  }

  return response.json()
}