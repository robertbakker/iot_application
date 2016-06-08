var angular = require('angular');

var websocket = require('./websocket');
var chart = require('./chart');
var daychart = require('./daychart');
var odometer = require('./odometer');
var tempDiff = require('./temp_diff');

var app = angular.module('iotApp', [
    'angular-websocket',
    'chart.js',
    odometer.name,
    websocket.name,
    tempDiff.name,
    chart.name,
    daychart.name,
]);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.filter('commas', function () {
  return function (input) {
      return input.toString().replace('.', ',');
  };
});

module.exports = app;