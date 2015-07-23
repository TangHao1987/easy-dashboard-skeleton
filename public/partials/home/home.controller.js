(function(){
    'use strict';
    var controllers = angular.module('app.home', ['ngAnimate', 'app.config']);
    controllers.controller('HomeCtrl', ['$scope', '$http', '$location', 'LocalConfig',function($scope, $http, $location, LocalConfig){
        $http.get(LocalConfig.json.menu).then(function(resp){
            $scope.menuItems = resp.data;
        });

        $scope.clickMenuItem = function(menuItem){
            if(menuItem.url){
                $location.path(menuItem.url)
            }else{
                menuItem.showSub = !menuItem.showSub;
                if($scope.lastItem && $scope.lastItem !== menuItem){
                    $scope.lastItem.showSub = false;
                    if($scope.lastSubItem){
                        $scope.lastSubItem.showSub = false;
                        $scope.lastSubItem = null;
                    }
                }
                $scope.lastItem = menuItem;
            }
        };

        $scope.clickSubItem = function(subItem){
            if(subItem.url){
                $location.path(subItem.url)
            }else{
                subItem.showSub = !subItem.showSub;
                if($scope.lastSubItem && $scope.lastSubItem !== subItem){
                    $scope.lastSubItem.showSub = false;
                }
                $scope.lastSubItem = subItem;
            }
        };
    }]);
})();
