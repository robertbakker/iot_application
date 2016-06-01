
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

