(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

var websocket = require('./websocket');
var chart = require('./chart');

var app = angular.module('iotApp', ['angular-websocket', 'chart.js', 'ui.odometer', websocket.name, chart.name]);

app.constant('WEBSOCKET_URL', 'ws://192.168.0.105:1880/ws/temp+humidity');
app.constant('API_URL', 'http://192.168.0.105:8000/api/v0');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./chart":2,"./websocket":3}],2:[function(require,module,exports){
'use strict';

module.exports = angular.module('chart', ['chart.js']).controller("TemperatureChartController", function ($scope, $http, API_URL) {
    $scope.loaded = false;
    $scope.loadChart = function () {
        $http.get(API_URL + "/temperatures/getAveragePerHour").then(function (response) {
            var data = response.data;

            var seriesData = [];
            var seriesLabels = [];
            for (var i = 0; i < data.length; i++) {
                seriesLabels.push(data[i].hour);
                seriesData.push(data[i].value);
            }

            $scope.labels = seriesLabels;
            $scope.series = ['Temperature'];
            $scope.data = [seriesData];
        });
        $scope.loaded = true;
    };
});

},{}],3:[function(require,module,exports){
'use strict';

module.exports = angular.module('websocket', ['angular-websocket']).factory('WebSocketData', function ($websocket, WEBSOCKET_URL) {
    // Open a WebSocket connection
    var dataStream = $websocket(WEBSOCKET_URL);

    var collection = [{ temperature: 4.81 }];

    dataStream.onOpen = function (event) {
        console.log(event);
    };

    dataStream.onError = function (event) {
        console.log(event);
    };

    dataStream.onMessage(function (message) {
        console.log(message);
        collection.push(JSON.parse(message.data));
    });

    var methods = {
        collection: collection,
        last: collection[collection.length - 1]
    };

    return methods;
}).controller('WebSocketController', function ($scope, WebSocketData) {
    $scope.WebSocketData = WebSocketData;
});

},{}],4:[function(require,module,exports){
'use strict';

require('./angular/app.js');

},{"./angular/app.js":1}]},{},[4]);

//# sourceMappingURL=app.js.map
