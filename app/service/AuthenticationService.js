/**
 * Created by tang.hao on 24/6/2015.
 */
(function(){
    'use strict';

    angular.
        module('app', ['app.config']).
        factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', 'LocalConfig'];
    function AuthenticationService($http, $cookieStore, $rootScope, LocalConfig){
        var service = {};
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback){
            $http.post(LocalConfig.backend + '/api/authenticate', { username: username, password: password })
                .success(function (response) {
                    callback(response);
                });
        }

        function SetCredentials(username, password) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }

    }
})();
