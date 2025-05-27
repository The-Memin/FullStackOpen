# Data for Countries

A React application that displays detailed information about countries, including capital, area, languages, national flag, and current weather. This project was developed as part of the [FullStackOpen](https://fullstackopen.com/en/) course.

## 🌍 Features

- Search for countries by name
- View a list of matching countries
- Automatically shows detailed information when only one country matches
- Displays:
  - Capital city
  - Area (km²)
  - Languages spoken
  - National flag
  - **Current weather** (temperature, wind speed, weather icon) using OpenWeatherMap API

## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/data-for-countries.git
cd data-for-countries
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up the OpenWeatherMap API key
Create a .env file in the project root with the following content:
```bash
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```
You can obtain a free API key at [https://openweathermap.org/api](https://openweathermap.org/api)

### 4. Run the development server
```bash
npm run dev
```
Visit ```http://localhost:5173``` to use the application.

### 📦 Build for production
```bash
npm run build
```
The production build will be located in the ```dist``` folder.

## 🛠 Technologies Used
 - React
 - Vite
 - Axios
 - REST Countries API
 - _OpenWeatherMap API_
  
## 📄 License

This project is part of the exercises for the [FullStackOpen course](https://fullstackopen.com/es/).

---
Made with 🧠 and ☕ by Guillermo
---