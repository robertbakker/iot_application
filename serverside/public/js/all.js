(function (angular) {
    'use strict';

    angular.module('websocket', [
        'angular-websocket'
    ])
        .factory('WebSocketData', function ($websocket) {
            // Open a WebSocket connection
            var dataStream = $websocket('ws://192.168.137.66:1880/ws/temp+humidity');

            var collection = [
                {temperature: 4.81}
            ];

            dataStream.onError = function (event) {
                console.log(event);
            };

            dataStream.onMessage(function (message) {
                collection.push(JSON.parse(message.data));
            });

            var methods = {
                collection: collection,
                get: function () {
                    dataStream.send(JSON.stringify({action: 'get'}));
                }
            };

            return methods;
        })
        .controller('WebSocketController', function ($scope, WebSocketData) {
            $scope.WebSocketData = WebSocketData;
        });

})(window.angular);
(function (angular) {
    'use strict';

    angular.module('chart', [
        'chart.js'
    ]).controller("TemperatureChartController", function ($scope, $http) {
        $scope.loaded = false;
        $scope.loadChart = function () {
            $http.get("/api/v0/sensors/temperatures/getAveragePerHour")
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


})(window.angular);
(function (angular) {
    'use strict';

    angular.module('iotApp', [
        'chart.js',
        'ui.odometer',
        'angular-websocket',
        'websocket',
        'chart'
    ]);   
})(window.angular);

//# sourceMappingURL=all.js.map
