(function(){
    'use strict';
    angular.module('app').controller('HomeCtrl', ['$scope', 'LocalConfig',function($scope, LocalConfig){
        $scope.images = LocalConfig.images;
    }]);
})();
