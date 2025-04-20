> **JN Weather App** 🌧️
# Project Description

This app provides real-time weather updates for different locations.<br><br>The application is built using [Astro](https://astro.build/) framework, [HTML5](https://en.wikipedia.org/wiki/HTML5), [CSS3](https://en.wikipedia.org/wiki/CSS#CSS_3) and [Bootstrap](https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework)) to deliver fully responsive layouts with a user-friendly interface and [JavaScript](https://en.wikipedia.org/wiki/JavaScript) for user interactions as well as to fetch [JSON data](https://en.wikipedia.org/wiki/JSON) from the [OpenWeatherMap API](https://en.wikipedia.org/wiki/OpenWeatherMap).

# Main Features
- **Live Weather Data:** Display up-to-date weather information for selected location.

# Mockup
- **Figma:** [Weather App Design](https://www.figma.com/design/QujA0dmRAAuODCTIpaBzfr/JN-Weather-App?node-id=0-1&t=tP7Fnszvbc3itRnU-1).

# Technologies Used
![FE-Technologies](https://github.com/user-attachments/assets/b457d49d-bca6-4660-a509-439a17ca00ba)


### Front-End
> **Framework**: `Astro`<br>
 **Programming Language**: `JavaScript`<br>
 **Code Structure** and **Style**: `HTML5` (*Markup Language*), `CSS3` (*StyleSheet Language*)<br>
 **ToolKit**: `Bootstrap` <br>
 **API** (*Application Programming Interface*): [OpenWeatherMap](https://openweathermap.org/)

### Web Design
> **App UI** and **Logo**: `Photoshop`<br>
**Responsive Mockup**: `Figma`

### API Endpoint
```sh
"https://api.openweathermap.org/data/2.5/weather?units=metric&q="
```
# 🚀 How to Run
> Installation Guide: To get a local copy up and running, follow steps below.

#### 1. Clone this repository:
```sh
 git clone https://github.com/jnfrontend/jn-weather-app.git
```

#### 2. Create `.env` file in cloned repository and add API credentials:
```sh
  PUBLIC_OPEN_WEATHER_API_URL = "API Endpoint"
  PUBLIC_OPEN_WEATHER_API_KEY = "Your OpenWeather API key"
```

> [!NOTE]
> To generate an API key, you will need to create an account on [OpenWeatherMap](https://openweathermap.org/)

#### 3. Open terminal and navigate to the project directory:
```sh 
  cd jn-weather-app
```

#### 4. Install dependencies and start local server:
| Command                             | Action                                           |
|:------------------------------------|:-------------------------------------------------|
| `npm install`                       | Installs dependencies                            |
| `npm run dev`                       | Starts local dev server at `localhost:4321`      |

#### 5. Now grab the server URL and open in your browser to view the project 😊
```sh 
  http://localhost:4321/jn-weather-app/
```

## Usage
To use the JN Weather App, go to `jn-weather-app/live-data/` page, select location and enter the name of the city in the search bar. 
The app should display the current weather conditions.

<br>

<sub>Copyright © [@jnfrontend](https://github.com/jnfrontend/) 2025 and licensed MIT.</sub>
