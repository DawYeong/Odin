import { clearElement, createElement } from "../utils";
import { WeatherClient } from "./WeatherClient";

export class DisplayHandler {
  static #weatherContent = document.getElementById("weather-content");
  static #locationForm = document.getElementById("location-form");
  static #tempToggle = document.getElementById("temp-type");

  static #client = new WeatherClient(
    process.env.WEATHER_API_KEY || "WEATHER API KEY",
    DisplayHandler.#tempToggle.checked
  );

  static init() {
    this.#initEventListeners();
  }

  static #initEventListeners() {
    DisplayHandler.#tempToggle.addEventListener("change", (e) => {
      DisplayHandler.#handleTempUnitToggle(e);
    });

    DisplayHandler.#locationForm.addEventListener("submit", async (e) => {
      await DisplayHandler.#handleLocationFormSubmit(e);
    });
  }

  static #handleTempUnitToggle(event) {
    DisplayHandler.#client.setIsFahrenheit(event.target.checked);
    DisplayHandler.#displayWeatherForecast();
  }

  static async #handleLocationFormSubmit(event) {
    event.preventDefault();
    try {
      if (event.target[0].value.length == 0) return;
      await DisplayHandler.#client.fetchForecast(event.target[0].value);
      DisplayHandler.#displayWeatherForecast();
    } catch (e) {
      alert(e);
    }
  }

  static #createCurrentItem(currentData) {
    const currentItem = createElement("div", "current-item", "", "");
    const currentHeaderWrapper = createElement(
      "div",
      "weather-header-wrapper",
      "",
      ""
    );
    currentHeaderWrapper.appendChild(
      createElement("img", "weather-icon", "", "", { src: currentData["icon"] })
    );
    currentHeaderWrapper.appendChild(
      createElement("h3", "date", "", currentData["date"].replace(" ", "\n"))
    );

    currentItem.appendChild(currentHeaderWrapper);
    currentItem.appendChild(
      createElement("p", "weather-temp", "", currentData["temp"])
    );
    currentItem.appendChild(
      createElement(
        "p",
        "weather-info",
        "",
        `Feels like: ${currentData["feelslike"]}`
      )
    );
    currentItem.appendChild(
      createElement("p", "weather-info", "", `Wind: ${currentData["wind"]}`)
    );
    currentItem.appendChild(
      createElement(
        "p",
        "weather-info",
        "",
        `Humidity: ${currentData["humidity"]}`
      )
    );
    currentItem.appendChild(
      createElement(
        "p",
        "weather-info",
        "",
        `Precipitation: ${currentData["precip_mm"]}`
      )
    );

    return currentItem;
  }

  static #createForecastItem(forecastItemData) {
    const forecastItem = createElement("div", "forecast-item", "", "");
    const forecastHeaderWrapper = createElement(
      "div",
      "weather-header-wrapper",
      "",
      ""
    );
    forecastHeaderWrapper.appendChild(
      createElement("img", "weather-icon", "", "", {
        src: forecastItemData["icon"],
      })
    );
    forecastHeaderWrapper.appendChild(
      createElement(
        "h3",
        "date",
        "",
        forecastItemData["date"].replace(" ", "\n")
      )
    );

    forecastItem.appendChild(forecastHeaderWrapper);

    forecastItem.appendChild(
      createElement("p", "weather-temp", "", forecastItemData["avgtemp"])
    );
    forecastItem.appendChild(
      createElement(
        "p",
        "weather-info",
        "",
        `High: ${forecastItemData["maxtemp"]}`
      )
    );
    forecastItem.appendChild(
      createElement(
        "p",
        "weather-info",
        "",
        `Low: ${forecastItemData["mintemp"]}`
      )
    );
    forecastItem.appendChild(
      createElement(
        "p",
        "weather-info",
        "",
        `Wind: ${forecastItemData["wind"]}`
      )
    );
    forecastItem.appendChild(
      createElement(
        "p",
        "weather-info",
        "",
        `Precipitation: ${forecastItemData["precip"]}`
      )
    );
    forecastItem.appendChild(
      createElement("p", "weather-info", "", `PoP: ${forecastItemData["pop"]}`)
    );

    return forecastItem;
  }

  static #displayWeatherForecast() {
    clearElement(DisplayHandler.#weatherContent);
    try {
      const forecastData = DisplayHandler.#client.getForecastData();
      const weatherContentWrapper = createElement(
        "div",
        "weather-content-wrapper",
        "",
        ""
      );

      weatherContentWrapper.appendChild(
        createElement("h2", "location-header", "", forecastData["location"])
      );

      weatherContentWrapper.appendChild(
        DisplayHandler.#createCurrentItem(forecastData["current"])
      );

      const forecastWrapper = createElement("div", "forecast-wrapper", "", "");
      forecastWrapper.appendChild(createElement("h2", "", "", "Forecast"));

      const forecastItems = createElement("div", "forecast-items", "", "");
      forecastData["forecast"].forEach((forecastItem) => {
        forecastItems.appendChild(
          DisplayHandler.#createForecastItem(forecastItem)
        );
      });
      forecastWrapper.appendChild(forecastItems);

      weatherContentWrapper.appendChild(forecastWrapper);

      DisplayHandler.#weatherContent.appendChild(weatherContentWrapper);
    } catch (e) {
      console.log(e);
    }
  }
}
