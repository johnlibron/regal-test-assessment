'use strict';
var forecast = {
  url: "https://dataservice.accuweather.com",
  key: "iF9XO7x4yIqfEpNxKkig0qBf21ZEAoDA",
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