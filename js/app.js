/**
 * @author      John James Libron <johnjames.libron@gmail.com>
 * @version     1.0
 * @date        22 Jul 2022
 * @description The app.js implements the functions for user interface in index.html file. 
 *              I used jQuery <https://jquery.com/> to handle the input event 
 *              handler functions and creating new elements/html content.
 */
'use strict';
$(document).ready(function() {
	app.init();
});
var app = {
  /**
   * Instantiate all call event handlers in the application.
   * For location search input, list group will be empty if 
   *    input is also empty, otherwise it will populate the cities 
   *    on the list group based on the autocomplete of the search text.
   * For the list group, it will display the daily forecast of the selected city location.
   */
  init: function() {
    $("#location-search").keyup(function(e) {
      if (e.target.value === '') {
        $(".list-group").empty();
      }
      forecast.getLocationSearch(e.target.value);
    });
    $(".list-group").on("click", ".list-group-item", function(e) {
      forecast.getDailyForecast(e.target.id);
      $("#location-search").val(e.target.innerText);
    });
  },
  /**
   * Only top 5 cities based on the autocomplete of the search text will populate in the list group.
   * @param data  Response of forecast.getLocationSearch function
   */
  populateListGroup: function(data) {
    let newData = data.slice(0,5); // remove items if index > 5
    $.each(newData, function(key, value) {
      $(".list-group").append(
        $("<li/>")
          .attr("id", value.Key)
          .addClass("list-group-item list-group-item-action")
          .text(value.LocalizedName)
      );
    });
  },
  /**
   * Only the next 3 days of daily forecasts for a specific location will populate in the card list.
   * @param data  Response of forecast.getDailyForecast function
   */
  show3DailyForecasts: function(data) {
    let newData = data.slice(0,3); // remove items if index > 3
    $.each(newData, function(key, value) {
      $(".daily-forecasts").append(
        $("<div/>").addClass("card").append(
          $("<div/>").addClass("container").append(
            $("<div/>").addClass("row")
              .append(app.createElementForecastDate(value.Date))
              .append(app.createElementDayIcon(value.Day.Icon))
              .append(app.createElementTemperature(value.Temperature))
              .append(app.createElementPhrase(value.Day.IconPhrase))
          )
        )
      );
    });
  },
  /**
   * Create new element for Daily Forecast date
   * @param date  DailyForecasts.Date
   */
  createElementForecastDate: function(date) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const newDate = new Date(date).toLocaleDateString("en-US", options);
    return $("<div/>").addClass("col-sm-12 col-md-12 col-lg-3 forecast-date").text(newDate);
  },
  /**
   * Create new element for Daily Forecast day icon
   * @param icon  DailyForecasts.Day.Icon
   */
  createElementDayIcon: function(icon) {
    return $("<div/>").addClass("col-sm-12 col-md-12 col-lg-2 forecast-icon")
            .append( $("<img/>").attr("src", `../regal-test-assessment/assets/icons/${icon}.png`)
            .addClass("card-img")
    )
  },
  /**
   * Create new element for Daily Forecast phrase
   * @param phrase  DailyForecasts.Day.IconPhrase
   */
  createElementPhrase: function(phrase) {
    return $("<div/>").addClass("col-sm-12 col-md-12 col-lg-4 phrase").text(phrase);
  },
  /**
   * Create new element for Daily Forecast temperature
   * @param temperature  DailyForecasts.Temperature
   */
  createElementTemperature: function(temperature) {
    const maxTemp = app.convertFahrenheitToCelsius(temperature.Maximum.Value);
    const minTemp = app.convertFahrenheitToCelsius(temperature.Minimum.Value);
    return $("<div/>").addClass("col-sm-12 col-md-12 col-lg-3 temp")
            .append( $("<span/>").addClass("max-temp").text(`${maxTemp}\xB0`) )
            .append( $("<span/>").addClass("min-temp").text(`/${minTemp}\xB0`) );
  },
  /**
   * Convert Fahrenheit value to Celsius
   * @param value  temperature
   */
  convertFahrenheitToCelsius: function(value) {
    return Math.floor((value - 32) * 5 / 9);
  }
};