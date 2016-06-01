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