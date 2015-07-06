(function() {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('app', [
        'ngRoute',
        'ngCookies',
        'app.directive',
        'app.config',
        'controllers',
        'ngRoute'
    ]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'public/partials/home/home.view.html',
            controller: 'HomeCtrl'
        }).when('/login', {
            templateUrl: 'public/partials/login/login.view.html',
            controller: 'LoginCtrl'
        }).when('/about', {
            templateUrl: 'public/about.html'
        }).when('/blog', {
            templateUrl: 'public/blog.html'
        }).when('/contact', {
            templateUrl: 'public/contact.html'
        }).otherwise(
            {redirectTo: '/home'}
        );
    }]).controller('defaultCtrl', ['$scope', '$location', function($scope, $location){
        $scope.location = $location;
    }]).run(run);

    run.$inject = ['$rootScope', '$location', '$cookies', '$http', 'LocalConfig'];
    function run($rootScope, $location, $cookies, $http, LocalConfig) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedPage = $.inArray($location.path(), LocalConfig.controlPages) !== -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });

    }
})();
