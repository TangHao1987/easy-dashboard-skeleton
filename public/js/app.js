(function() {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('app', [
        'app.directive',
        'app.config',
        'app.user',
        'app.home',
        'ui.router'
    ]).config(['$stateProvider', '$stateProvider', '$http', 'LocalConfig', function ($stateProvider, $urlRouterProvider, $http, LocalConfig) {
        var pathConfig;
        $http.get(LocalConfig.json.path).then(function(resp){
            pathConfig = resp.data;
        });

        $urlRouterProvider.otherwise('/home');

        _.each(pathConfig, function(path){
            $stateProvider.state(path);
        });

    }]).controller('defaultCtrl', [ function(){
    }]).run(run);

    run.$inject = ['$rootScope', '$state', '$cookies', '$http', 'LocalConfig'];
    function run($rootScope, $$state, $cookies, $http, LocalConfig) {
        // keep user logged in after page refresh
        var globals = $cookies.get('globals');
        if(globals){
            $rootScope.globals = JSON.parse(globals)
        }else{
            $rootScope.globals = {};
        }
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            //TODO: change $location path to state, and change noControlPages to noControl states
            var restrictedPage = $.inArray($location.path(), LocalConfig.noControlPages) === -1;
            //console.log('restrictedPage: ' + restrictedPage);
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                //TODO: change this path to transitionTo
                $location.path('/login');
            }
        });

    }
})();
