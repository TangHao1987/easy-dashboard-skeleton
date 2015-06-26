(function(){
    'use strict';

    angular.
        module('app', ['app.config']).
        factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', 'LocalConfig', 'UserService'];
    function AuthenticationService($http, $cookieStore, $rootScope, LocalConfig, UserService){
        var service = {};
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {
            if (!LocalConfig.debugMode) {
                $http.post(LocalConfig.backend + '/api/authenticate', {username: username, password: password})
                    .success(function (response) {
                        callback(response);
                    });
            } else {
                dummyLogin(username, password, callback)
            }
        }

        function dummyLogin(username, password, callback){
            $timeout(function () {
                var response;
                UserService.GetByUsername(username)
                    .then(function (user) {
                        if (user !== null && user.password === password) {
                            response = {success: true};
                        } else {
                            response = {success: false, message: 'Username or password is incorrect'};
                        }
                        callback(response);
                    });
            }, 1000);
        }

        function SetCredentials(username, password) {
            var authdata =  username + ':' + password;

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
