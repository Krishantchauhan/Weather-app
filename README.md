# Weather App

# Link [Weather](https://climate-snap.netlify.app/)

https://climate-snap.netlify.app/

A simple weather app that fetches and displays weather information based on the user's input city using the OpenWeatherMap API.

## Features

- Fetches real-time weather data using OpenWeatherMap API.
- Displays current temperature, max and min temperatures, wind speed, humidity, and an icon representing the weather.
- City search functionality with error handling for invalid city names.
- Responsive design with Tailwind CSS.

## Technologies Used

- **React.js**: For building the user interface.
- **Axios**: For making HTTP requests.
- **OpenWeatherMap API**: To fetch weather data.
- **Tailwind CSS**: For styling.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/krishantchauhan/weather-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weather-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and add your OpenWeatherMap API key:

   ```bash
   VITE_WEATHER_API_KEY=your_api_key
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the app in your browser at `http://localhost:3000`.

## Usage

1. Enter a city name in the search box.
2. Click on the "Search" button or press `Enter` to fetch weather data.
3. If the city is found, the app will display the current weather data, including temperature, max/min temperatures, wind speed, and humidity.
4. If the city is not found, an error message will be displayed.
