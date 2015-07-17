(function(){
    'use strict';
    var controllers = angular.module('app.home', []);
    controllers.controller('HomeCtrl', ['$scope', 'LocalConfig',function($scope, LocalConfig){
        $scope.images = LocalConfig.images;
    }]);
})();
