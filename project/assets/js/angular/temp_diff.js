


module.exports = angular.module('tempDiff', [])
  .directive('tempDiff', function($http, API_URL) {
    return {
       scope: {
          tempDiff: '=',
       },
    link: function ($scope, $element, $attrs) {

       $http.get(API_URL + "/weather/current")
          .then(function (response) {
              
              $scope.$watch('tempDiff', function(value) {
                if(typeof value !="undefined") {
                  $element.html((value - response.data.temperature).toFixed(1).replace(".", ","));
                }
              });
          });

      },
    }
  });