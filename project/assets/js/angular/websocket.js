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


 