/**
 * Created by tang.hao on 25/6/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.user')
        .factory('UserService', UserService);

    UserService.$inject = ['LocalConfig', '$http'];
    function UserService(LocalConfig, $http) {

        var service = {};

        service.GetAll = GetAll;
        service.GetByEmail = GetByEmail;
        service.CreateOrUpdate = CreateOrUpdate;
        service.Delete = Delete;

        return service;

        function GetByEmail(email) {
            var resp = null;
            $http.post(LocalConfig.backend + LocalConfig.URL.user + '/getUserByEmail', {email:email}).success(
                function(response){
                    resp = response;
                }
            );
            return resp;
        }

        function CreateOrUpdate(user) {
            var resp = null;
            $http.post(LocalConfig.backend + LocalConfig.URL.user + '/createOrUpdateUser', user).success(
                function(response){
                    resp = response;
                }
            );
            return resp;
        }

        function Delete(email) {
            var resp = null;
            $http.delete(LocalConfig.backend + LocalConfig.URL.user + '/deleteUser', {email: email}).success(
                function(response){
                    resp = response;
                }
            );
            return resp;
        }

        function GetAll(){
            var allUsers = null;
            $http.get(LocalConfig.backend + LocalConfig.URL.user + '/getAllUsers').success(
                function(response){
                    allUsers = response;
                }
            );
            return allUsers;
        }
    }
})();
