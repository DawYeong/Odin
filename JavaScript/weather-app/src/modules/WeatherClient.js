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
  #isC;
  constructor(key) {
    this.#key = key;
    this.#isC = true;
    this.#currentData = {};
  }

  async getLocationForecast(location, isCelsius) {
    const url = `${BASEURL}/forecast.json?key=${
      this.#key
    }&q=${location}&days=${DAYS}&alerts=no`;

    const response = await fetch(url);
    const jsonData = await response.json();
    this.#processForecastJSONData(jsonData);
    return this.getForecastData(isCelsius);
  }

  getForecastData(isCelsius) {
    const currentKeys = new Set(Object.keys(this.#currentData));

    if (
      currentKeys.difference(
        new Set(["c", "current", "f", "forecast", "location"])
      ).size != 0
    )
      throw new Error("Current data is not forecast data");

    const tempType = isCelsius ? "c" : "f";

    return {
      current: {
        ...this.#currentData["current"],
        ...this.#currentData[tempType]["current"],
      },
      forecast: this.#currentData["forecast"].map((day, i) => {
        return { ...day, ...this.#currentData[tempType]["forecast"][i] };
      }),
    };
  }

  #processForecastJSONData(data) {
    if (this.#checkError(data)) {
      console.log(data["error"]);
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
    console.log("processed Data:");
    console.log(processedData);

    this.#setCurrentData(processedData);
  }

  #processLocationData(locData, res) {
    console.log(locData);
    res["location"] = `${locData["name"]}, ${locData["country"]}`;
  }

  #processCurrentData(currData, res) {
    res["current"] = {
      date: format(currData["last_updated"], "EEEE, MMMM d"),
      icon: currData["condition"]["icon"],
      precip_mm: currData["precip_mm"],
      wind: currData["wind_kph"],
      humidity: currData["humidity"],
    };
    res["c"]["current"] = {
      feelslike: currData["feelslike_c"],
      temp: currData["temp_c"],
    };
    res["f"]["current"] = {
      feelslike: currData["feelslike_f"],
      temp: currData["temp_f"],
    };
  }

  #processForecastData(fcData, res) {
    res["forecast"] = [];
    res["c"]["forecast"] = [];
    res["f"]["forecast"] = [];

    console.log(fcData["forecastday"]);
    fcData["forecastday"].forEach((forecast) => {
      const day = forecast["day"];

      res["forecast"].push({
        date: format(forecast["date"], "EEEE, MMMM d"),
        icon: day["condition"]["icon"],
        humidity: day["avghumidity"],
        precip: day["totalprecip_mm"],
        wind: day["maxwind_kph"],
        pop: day["daily_chance_of_rain"],
      });

      res["c"]["forecast"].push({
        mintemp: day["mintemp_c"],
        maxtemp: day["maxtemp_c"],
        avgtemp: day["avgtemp_c"],
      });

      res["f"]["forecast"].push({
        mintemp: day["mintemp_f"],
        maxtemp: day["maxtemp_f"],
        avgtemp: day["avgtemp_f"],
      });
    });
  }

  #checkError(data) {
    return "error" in data;
  }

  #setCurrentData(data) {
    this.#currentData = data;
  }
}
