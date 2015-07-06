(function() {
    'use strict';
    var controllers = angular.module('controllers');

    controllers.controller("LoginCtrl",  ["$scope", function($scope){
        $scope.showRegister = false;
        $scope.toggleShowRegister = function(){
            $scope.showRegister = !$scope.showRegister;
        }
    }]);
})();