(function() {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('app', [
        'ngRoute',
        'app.home',
        'ngCookies',
        'app.login',
        'app.config'
    ]).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'public/partials/home/home.view.html',
            controller: 'HomeCtrl'
        }).when('/login', {
            templateUrl: 'public/partials/login/login.view.html',
            controller: 'LoginCtrl'
        }).otherwise({redirectTo: '/home'});
    }]).run(run);

    run.$inject = ['$rootScope', '$location', '$cookies', '$http', 'LocalConfig'];
    function run($rootScope, $location, $cookies, $http, LocalConfig) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            console.log($location.path());
            var restrictedPage = $.inArray($location.path(), LocalConfig.controlPages) !== -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
})();