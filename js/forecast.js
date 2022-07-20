'use strict';
$(document).ready(function() {
	forecast.init();
});
var forecast = {
  url: "https://dataservice.accuweather.com",
  key: "iF9XO7x4yIqfEpNxKkig0qBf21ZEAoDA",
  inputLocation: null,
  init: function() {
    $("#location-search").keyup(function() {
      forecast.getLocationSearch(this.value);
    });
  },
  getLocationSearch: function(value) {
    $.ajax({
      url: `${forecast.url}/locations/v1/cities/autocomplete`,
      type: "get",
      data: {
        apikey: forecast.key,
        q: value
      },
      success: function (data) {
        $(".list-group").empty();
        forecast.populateListGroup(data);
      },
      error: function (err) {
        console.log(err.message);
      }
    });
  },
  populateListGroup: function(data) {
    $.each(data, function(key, value) {
      $(".list-group").append(
        $("<a/>")
          .attr("href", "#")
          .attr("list-group-item-id", value.Key)
          .addClass("list-group-item list-group-item-action")
          .text(value.LocalizedName)
      );
    });
  }
};