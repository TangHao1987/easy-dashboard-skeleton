(function () {
    'use strict';
    var user = angular.module('app.user');

    user.controller("LoginCtrl", ["$scope","$location", "AuthenticationService", function ($scope, $location, AuthenticationService) {
        $scope.hasError = false;
        $scope.login = function () {
            AuthenticationService.Login($scope.email, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.email, $scope.password);
                    $location.path('/home');
                    $scope.hasError = false;
                } else {
                    $scope.hasError = true;
                }
            })
        }

    }]);


    user.controller("RegistrationCtrl", ["$scope", "$location", function ($scope, AuthenticationService, $location) {
        }]);

    user.run(function ($templateCache, $http) {
        $http.get('messages.html')
            .then(function (response) {
                $templateCache.put('error-messages', response.data);
            })
    })



})();