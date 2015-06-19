(function() {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('app', [
        'ngRoute',
        'app.home',
        'app.login'
    ]).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix();
        $routeProvider.when('/home', {
                templateUrl: 'home/home.view.html',
                controller: 'HomeCtrl'
            }).when('/login', {
                templateUrl: 'login/login.view.html',
                controller: 'loginCtrl'
            }).otherwise({redirectTo: '/home'});
        }]);

})();
