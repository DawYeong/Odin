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
 * wind gust (km/h)
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

  async getLocationForecast(location) {
    const url = `${BASEURL}/forecast.json?key=${
      this.#key
    }&q=${location}&days=${DAYS}&alerts=no`;
    const response = await fetch(url);
    const jsonData = await response.json();
    this.#processForecastJSONData(jsonData);
  }

  #processForecastJSONData(data) {
    if (this.#checkError(data)) {
      console.log(data["error"]);
      return;
    }
    console.log(data["location"]);
    console.log(data["current"]);
    console.log(data["forecast"]);

    const processedData = {};

    //location
    this.#processLocationData(data["location"], processedData);

    //temperatures
    processedData["c"] = {};
    processedData["f"] = {};

    this.#processCurrentData(data["current"], processedData);

    console.log("processed Data:");
    console.log(processedData);
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
      gust: currData["gust_kph"],
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

  #checkError(data) {
    return "error" in data;
  }
}
