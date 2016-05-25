var angular = require('angular');

var websocket = require('./websocket');
var chart = require('./chart');

var app = angular.module('iotApp', [
    'angular-websocket',
    'chart.js',
    'ui.odometer',
    websocket.name,
    chart.name
]);

app.constant('WEBSOCKET_URL', 'ws://192.168.0.105:1880/ws/temp+humidity');
app.constant('API_URL', 'http://192.168.0.105:8000/api/v0');