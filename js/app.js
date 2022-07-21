'use strict';
$(document).ready(function() {
	app.init();
});
var app = {
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
  createElementForecastDate: function(date) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const newDate = new Date(date).toLocaleDateString("en-US", options);
    return $("<div/>").addClass("col-sm-12 col-md-12 col-lg-3 forecast-date").text(newDate);
  },
  createElementDayIcon: function(icon) {
    return $("<div/>").addClass("col-sm-12 col-md-12 col-lg-2 forecast-icon")
            .append( $("<img/>").attr("src", `../regal-test-assessment/assets/icons/${icon}.png`)
            .addClass("card-img")
    )
  },
  createElementPhrase: function(phrase) {
    return $("<div/>").addClass("col-sm-12 col-md-12 col-lg-4 phrase").text(phrase);
  },
  createElementTemperature: function(temperature) {
    const maxTemp = app.convertFahrenheitToCelsius(temperature.Maximum.Value);
    const minTemp = app.convertFahrenheitToCelsius(temperature.Minimum.Value);
    return $("<div/>").addClass("col-sm-12 col-md-12 col-lg-3 temp")
            .append( $("<span/>").addClass("max-temp").text(`${maxTemp}\xB0`) )
            .append( $("<span/>").addClass("min-temp").text(`/${minTemp}\xB0`) );
  },
  convertFahrenheitToCelsius: function(value) {
    return Math.floor((value - 32) * 5 / 9)
  }
};