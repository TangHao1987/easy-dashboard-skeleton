(function(){
    'use strict';
    var controllers = angular.module('app.home', ['app.config']);
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

    controllers.filter('menuFilter', function($filter){
        var standardFilter = $filter('filter');
        return function(menuItems , searchText){
            var out = standardFilter(menuItems, searchText);
            if(searchText && searchText.length > 0) {
                _.each(out, function (menuItem) {
                    if (menuItem.subItems != undefined) {
                        var subItem = _.find(menuItem.subItems, function (subItem) {
                            return subItem.name.match(new RegExp(searchText,"i"));
                        });

                        var findSub = false;
                        _.each(menuItem.subItems, function (subItem) {
                            if(subItem.subItems){
                                var subSubItem = _.find(subItem.subItems, function (subSubItem) {
                                    return subSubItem.name.match(new RegExp(searchText,"i"));
                                });
                                if(subSubItem !== undefined){
                                    subItem.showSub = true;
                                    findSub = true;
                                }else{
                                    subItem.showSub = false;
                                }
                            }
                        });

                        menuItem.showSub = !!(subItem !== undefined || findSub);
                    }

                });
            }
            return out;
        }
    })
})();
