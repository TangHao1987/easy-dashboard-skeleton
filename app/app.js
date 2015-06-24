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
            templateUrl: 'app/home/home.view.html',
            controller: 'HomeCtrl'
        }).when('/login', {
            templateUrl: 'app/login/login.view.html',
            controller: 'LoginCtrl'
        }).otherwise({redirectTo: '/home'});
    }]).run(run);

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
})();
