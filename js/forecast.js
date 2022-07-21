/**
 * @author      John James Libron <johnjames.libron@gmail.com>
 * @version     1.0
 * @date        22 Jul 2022
 * @description The forecast.js requests to AccuWeather Dataservice to get data 
 *              from Locations API and Forecast API. 
 *              I used jQuery AJAX <https://api.jquery.com/jquery.ajax/> to perform 
 *              async http requests to the AccuWeather API <https://developer.accuweather.com/>.
 *              Need to replace the forecast.key to a new API key because 
 *              AccuWeather puts a limit on queries on a free account.
 */
'use strict';
var forecast = {
  url: "https://dataservice.accuweather.com",
  key: "iF9XO7x4yIqfEpNxKkig0qBf21ZEAoDA",
  /**
   * Returns basic information about locations matching an autocomplete of the search text.
   * If the request is success, it will populate the cities in the list group,
   *    otherwise it will print the error message in the console log.
   * @param value  Input value of location-search
   */
  getLocationSearch: function(value) {
    $.ajax({
      url: `${forecast.url}/locations/v1/cities/autocomplete`,
      type: "get",
      data: {
        apikey: forecast.key,
        q: value
      },
      success: function (data) {
        $(".list-group").empty(); // empty previous list-group
        app.populateListGroup(data);
      },
      error: function (err) {
        console.log(err.message);
      }
    });
  },
  /**
   * Returns an array of daily forecasts for the next 5 days for a specific location. 
   * If the request is success, it will show the next 3 days of the daily forecast in the card list,
   *    otherwise it will print the error message in the console log.
   * @param locationKey  getLocationSearch.data.Key
   */
  getDailyForecast: function(locationKey) {
    $.ajax({
      url: `${forecast.url}/forecasts/v1/daily/5day/${locationKey}`,
      type: "get",
      data: {
        apikey: forecast.key
      },
      success: function (data) {
        $(".list-group").empty(); // empty previous list-group
        app.show3DailyForecasts(data["DailyForecasts"]);
      },
      error: function (err) {
        console.log(err.message);
      }
    });
  }
};