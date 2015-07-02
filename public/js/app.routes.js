/**
 * Created by tang.hao on 2/7/2015.
 */
angular.module('app.routes', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
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
    }).otherwise({redirectTo: '/home'});
}]);