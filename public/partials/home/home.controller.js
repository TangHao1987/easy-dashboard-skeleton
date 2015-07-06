(function(){
    'use strict';
    var controllers = angular.module('controllers', []);
    controllers.controller('HomeCtrl', ['$scope', 'LocalConfig',function($scope, LocalConfig){
        $scope.images = LocalConfig.images;
    }]);
})();
