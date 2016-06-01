!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.app=e():"undefined"!=typeof global?global.app=e():"undefined"!=typeof self&&(self.app=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

var websocket = require('./websocket');
var chart = require('./chart');
var daychart = require('./daychart');
var odometer = require('./odometer');

var app = angular.module('iotApp', [
    'angular-websocket',
    'chart.js',
    odometer.name,
    websocket.name,
    chart.name,
    daychart.name
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
},{"./chart":2,"./daychart":3,"./odometer":4,"./websocket":5}],2:[function(require,module,exports){

module.exports = angular.module('chart', [
        'chart.js'
    ]).controller("TemperatureChartController", function ($scope, $http, API_URL) {
        $scope.loaded = false;
        $scope.loadChart = function () {
            $http.get(API_URL + "/temperatures/per_hour")
                .then(function (response) {
                    var data = response.data;

                    var seriesData = [];
                    var seriesLabels = [];
                    for (var i = 0; i < data.length; i++) {
                        seriesLabels.push(data[i].hour);
                        seriesData.push(data[i].value);
                    }

                    $scope.labels = seriesLabels;
                    $scope.series = ['Temperature'];
                    $scope.data = [
                        seriesData
                    ];

                });
            $scope.loaded = true;
        };
    });


},{}],3:[function(require,module,exports){

module.exports = angular.module('daychart', [
        'chart.js'
    ]).controller("DailyTemperatureChartController", function ($scope, $http, API_URL) {
        $scope.loaded = false;
        $scope.loadChart = function () {
            $http.get(API_URL + "/temperatures/per_day")
                .then(function (response) {
                    var data = response.data;

                    var seriesData = [];
                    var seriesLabels = [];
                    for (var i = 0; i < data.length; i++) {
                        seriesLabels.push(data[i].day);
                        seriesData.push(data[i].value);
                    }

                    $scope.labels = seriesLabels;
                    $scope.series = ['Temperature'];
                    $scope.data = [
                        seriesData
                    ];

                });
            $scope.loaded = true;
        };
    });


},{}],4:[function(require,module,exports){
module.exports = angular.module('odometer', [])
  .directive('odometer', function() {
    return {
       scope: {
          odometer: '=',
       },
    link: function ($scope, $element, $attrs) {
      od = new Odometer({
        el: $element[0],
        value: 20,
        theme: 'default', duration: 3000, format: '(.ddd),dd'});
      $scope.$watch('odometer', function(value) {
        if(typeof value !="undefined") {
          od.update(value);
        }
      });
    },
    }

  });
},{}],5:[function(require,module,exports){
module.exports = angular.module('websocket', [
    'angular-websocket'
])
    .factory('WebSocketData', function ($websocket, WEBSOCKET_URL) {
        var dataStream = $websocket(WEBSOCKET_URL);

        var collection = [
        ];

        dataStream.onOpen = function(event) {
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
            collection: collection
        };

        return methods;
    })
    .controller('WebSocketController', function ($scope, WebSocketData) {
        $scope.WebSocketData = WebSocketData;
    });


},{}],6:[function(require,module,exports){
module.exports = require('./angular/app.js');
},{"./angular/app.js":1}]},{},[6])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3BpL0Rlc2t0b3AvaW90X2FwcGxpY2F0aW9uL3NlbnNvci9wcm9qZWN0L2Fzc2V0cy9qcy9hbmd1bGFyL2FwcC5qcyIsIi9ob21lL3BpL0Rlc2t0b3AvaW90X2FwcGxpY2F0aW9uL3NlbnNvci9wcm9qZWN0L2Fzc2V0cy9qcy9hbmd1bGFyL2NoYXJ0LmpzIiwiL2hvbWUvcGkvRGVza3RvcC9pb3RfYXBwbGljYXRpb24vc2Vuc29yL3Byb2plY3QvYXNzZXRzL2pzL2FuZ3VsYXIvZGF5Y2hhcnQuanMiLCIvaG9tZS9waS9EZXNrdG9wL2lvdF9hcHBsaWNhdGlvbi9zZW5zb3IvcHJvamVjdC9hc3NldHMvanMvYW5ndWxhci9vZG9tZXRlci5qcyIsIi9ob21lL3BpL0Rlc2t0b3AvaW90X2FwcGxpY2F0aW9uL3NlbnNvci9wcm9qZWN0L2Fzc2V0cy9qcy9hbmd1bGFyL3dlYnNvY2tldC5qcyIsIi9ob21lL3BpL0Rlc2t0b3AvaW90X2FwcGxpY2F0aW9uL3NlbnNvci9wcm9qZWN0L2Fzc2V0cy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBnbG9iYWw9dHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9O3ZhciBhbmd1bGFyID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2FuZ3VsYXInXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2FuZ3VsYXInXSA6IG51bGwpO1xyXG5cclxudmFyIHdlYnNvY2tldCA9IHJlcXVpcmUoJy4vd2Vic29ja2V0Jyk7XHJcbnZhciBjaGFydCA9IHJlcXVpcmUoJy4vY2hhcnQnKTtcclxudmFyIGRheWNoYXJ0ID0gcmVxdWlyZSgnLi9kYXljaGFydCcpO1xyXG52YXIgb2RvbWV0ZXIgPSByZXF1aXJlKCcuL29kb21ldGVyJyk7XHJcblxyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2lvdEFwcCcsIFtcclxuICAgICdhbmd1bGFyLXdlYnNvY2tldCcsXHJcbiAgICAnY2hhcnQuanMnLFxyXG4gICAgb2RvbWV0ZXIubmFtZSxcclxuICAgIHdlYnNvY2tldC5uYW1lLFxyXG4gICAgY2hhcnQubmFtZSxcclxuICAgIGRheWNoYXJ0Lm5hbWVcclxuXSk7XHJcblxyXG5hcHAuZmlsdGVyKCdyZXZlcnNlJywgZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKGl0ZW1zKSB7XHJcbiAgICByZXR1cm4gaXRlbXMuc2xpY2UoKS5yZXZlcnNlKCk7XHJcbiAgfTtcclxufSk7XHJcblxyXG5hcHAuZmlsdGVyKCdjb21tYXMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICByZXR1cm4gaW5wdXQudG9TdHJpbmcoKS5yZXBsYWNlKCcuJywgJywnKTtcclxuICB9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYXBwOyIsIlxyXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdjaGFydCcsIFtcclxuICAgICAgICAnY2hhcnQuanMnXHJcbiAgICBdKS5jb250cm9sbGVyKFwiVGVtcGVyYXR1cmVDaGFydENvbnRyb2xsZXJcIiwgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsIEFQSV9VUkwpIHtcclxuICAgICAgICAkc2NvcGUubG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgJHNjb3BlLmxvYWRDaGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJGh0dHAuZ2V0KEFQSV9VUkwgKyBcIi90ZW1wZXJhdHVyZXMvcGVyX2hvdXJcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlcmllc0RhdGEgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VyaWVzTGFiZWxzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllc0xhYmVscy5wdXNoKGRhdGFbaV0uaG91cik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllc0RhdGEucHVzaChkYXRhW2ldLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sYWJlbHMgPSBzZXJpZXNMYWJlbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlcmllcyA9IFsnVGVtcGVyYXR1cmUnXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YSA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRzY29wZS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnZGF5Y2hhcnQnLCBbXG4gICAgICAgICdjaGFydC5qcydcbiAgICBdKS5jb250cm9sbGVyKFwiRGFpbHlUZW1wZXJhdHVyZUNoYXJ0Q29udHJvbGxlclwiLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgQVBJX1VSTCkge1xuICAgICAgICAkc2NvcGUubG9hZGVkID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5sb2FkQ2hhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkaHR0cC5nZXQoQVBJX1VSTCArIFwiL3RlbXBlcmF0dXJlcy9wZXJfZGF5XCIpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VyaWVzRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2VyaWVzTGFiZWxzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzTGFiZWxzLnB1c2goZGF0YVtpXS5kYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzRGF0YS5wdXNoKGRhdGFbaV0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxhYmVscyA9IHNlcmllc0xhYmVscztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlcmllcyA9IFsnVGVtcGVyYXR1cmUnXTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXNEYXRhXG4gICAgICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRzY29wZS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdvZG9tZXRlcicsIFtdKVxuICAuZGlyZWN0aXZlKCdvZG9tZXRlcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgc2NvcGU6IHtcbiAgICAgICAgICBvZG9tZXRlcjogJz0nLFxuICAgICAgIH0sXG4gICAgbGluazogZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgb2QgPSBuZXcgT2RvbWV0ZXIoe1xuICAgICAgICBlbDogJGVsZW1lbnRbMF0sXG4gICAgICAgIHZhbHVlOiAyMCxcbiAgICAgICAgdGhlbWU6ICdkZWZhdWx0JywgZHVyYXRpb246IDMwMDAsIGZvcm1hdDogJyguZGRkKSxkZCd9KTtcbiAgICAgICRzY29wZS4kd2F0Y2goJ29kb21ldGVyJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYodHlwZW9mIHZhbHVlICE9XCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIG9kLnVwZGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgfVxuXG4gIH0pOyIsIm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ3dlYnNvY2tldCcsIFtcclxuICAgICdhbmd1bGFyLXdlYnNvY2tldCdcclxuXSlcclxuICAgIC5mYWN0b3J5KCdXZWJTb2NrZXREYXRhJywgZnVuY3Rpb24gKCR3ZWJzb2NrZXQsIFdFQlNPQ0tFVF9VUkwpIHtcclxuICAgICAgICB2YXIgZGF0YVN0cmVhbSA9ICR3ZWJzb2NrZXQoV0VCU09DS0VUX1VSTCk7XHJcblxyXG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gW1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGRhdGFTdHJlYW0ub25PcGVuID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGRhdGFTdHJlYW0ub25FcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZGF0YVN0cmVhbS5vbk1lc3NhZ2UoZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24ucHVzaChKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgbWV0aG9kcyA9IHtcclxuICAgICAgICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRob2RzO1xyXG4gICAgfSlcclxuICAgIC5jb250cm9sbGVyKCdXZWJTb2NrZXRDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgV2ViU29ja2V0RGF0YSkge1xyXG4gICAgICAgICRzY29wZS5XZWJTb2NrZXREYXRhID0gV2ViU29ja2V0RGF0YTtcclxuICAgIH0pO1xyXG5cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2FuZ3VsYXIvYXBwLmpzJyk7Il19
(6)
});
;