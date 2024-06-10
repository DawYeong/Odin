import { format } from "date-fns";

const BASEURL = "http://api.weatherapi.com/v1";
const DAYS = 3; // this is the limit for the free API tier

/**
 * weather
 * feels like
 * High/Low
 * POP
 * Humidity
 * Wind(km/h)
 * 24hr rain
 */
export class WeatherClient {
  #key;
  #currentData;
  #isFahrenheit;
  constructor(key, isFahrenheit) {
    this.#key = key;
    this.#isFahrenheit = isFahrenheit;
    this.#currentData = {};
  }

  async fetchForecast(location) {
    const url = `${BASEURL}/forecast.json?key=${
      this.#key
    }&q=${location}&days=${DAYS}&alerts=no`;

    const response = await fetch(url);
    const jsonData = await response.json();
    this.#processForecastJSONData(jsonData);
  }

  getForecastData() {
    const currentKeys = new Set(Object.keys(this.#currentData));
    if (
      new Set(["c", "current", "f", "forecast", "location"]).difference(
        currentKeys
      ).size != 0
    ) {
      throw new Error("Current data is not forecast data");
    }

    const tempType = this.#isFahrenheit ? "f" : "c";

    return {
      current: {
        ...this.#currentData["current"],
        ...this.#currentData[tempType]["current"],
      },
      forecast: this.#currentData["forecast"].map((day, i) => {
        return { ...day, ...this.#currentData[tempType]["forecast"][i] };
      }),
      location: this.#currentData["location"],
    };
  }

  #processForecastJSONData(data) {
    if (this.#checkError(data)) {
      throw new Error(data["error"]["message"]);
    }

    const processedData = {};

    //location
    this.#processLocationData(data["location"], processedData);

    //temperatures
    processedData["c"] = {};
    processedData["f"] = {};

    this.#processCurrentData(data["current"], processedData);

    this.#processForecastData(data["forecast"], processedData);

    this.#setCurrentData(processedData);
  }

  #processLocationData(locData, res) {
    res["location"] = `${locData["name"]}, ${locData["country"]}`;
  }

  #processCurrentData(currData, res) {
    res["current"] = {
      date: format(currData["last_updated"], "EEEE p"),
      icon: currData["condition"]["icon"],
      precip_mm: `${currData["precip_mm"]} mm`,
      wind: `${currData["wind_kph"]} km/h`,
      humidity: `${currData["humidity"]} %`,
    };
    res["c"]["current"] = {
      feelslike: `${currData["feelslike_c"]} °C`,
      temp: `${currData["temp_c"]} °C`,
    };
    res["f"]["current"] = {
      feelslike: `${currData["feelslike_f"]} °F`,
      temp: `${currData["temp_f"]} °F`,
    };
  }

  #processForecastData(fcData, res) {
    res["forecast"] = [];
    res["c"]["forecast"] = [];
    res["f"]["forecast"] = [];

    fcData["forecastday"].forEach((forecast) => {
      const day = forecast["day"];

      res["forecast"].push({
        date: format(forecast["date"], "EEEE MM/dd"),
        icon: day["condition"]["icon"],
        humidity: `${day["avghumidity"]} %`,
        precip: `${day["totalprecip_mm"]} mm`,
        wind: `${day["maxwind_kph"]} km/h`,
        pop: `${day["daily_chance_of_rain"]} %`,
      });

      res["c"]["forecast"].push({
        mintemp: `${day["mintemp_c"]} °C`,
        maxtemp: `${day["maxtemp_c"]} °C`,
        avgtemp: `${day["avgtemp_c"]} °C`,
      });

      res["f"]["forecast"].push({
        mintemp: `${day["mintemp_f"]} °F`,
        maxtemp: `${day["maxtemp_f"]} °F`,
        avgtemp: `${day["avgtemp_f"]} °F`,
      });
    });
  }

  #checkError(data) {
    return "error" in data;
  }

  #setCurrentData(data) {
    this.#currentData = data;
  }

  setIsFahrenheit(isFahrenheit) {
    this.#isFahrenheit = isFahrenheit;
  }
}
