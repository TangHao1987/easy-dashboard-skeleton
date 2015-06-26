/**
 * Created by tang.hao on 25/6/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.Service', ['ngResource'])
        .factory('UserService', UserService);

    UserService.$inject = ['$timeout', '$filter', '$q', '$resource'];
    function UserService($timeout, $filter, $q, $resource) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByEmail = GetByEmail;
        service.CreateOrUpdate = CreateOrUpdate;
        service.Delete = Delete;

        return service;

        function execute(callBack){
            var deferred = $q.defer();
            var users = getUsers();
            callBack(deferred, users);
            return deferred.promise;
        }

        function GetAll() {
            return execute(function (deferred, users) {
                users.query(function(response){
                    deferred.resolve(response);
                });
            });
        }

        function GetById(id) {
            return execute(function (deferred, users) {
                users.query(function(response){
                    angular.forEach(response, function(item){
                        if(item.id === id){
                            deferred.resolve(item)
                        }
                    });
                    if(!deferred.isResolved){
                        deferred.reject();
                    }
                });
            });
        }

        function GetByEmail(email) {
            return execute(function (deferred, users) {
                var filtered = $filter('filter')(users, { email: email});
                if(filtered.length){
                    deferred.resolve(filtered[0]);
                }else{
                    deferred.rejected('user not found');
                }
            });
        }

        function CreateOrUpdate(user) {
            return execute(function (deferred, users) {
                $timeout(function () {
                    GetByEmail(user.email)
                        .then(function (userToUpdate) {
                            userToUpdate.password = user.password;
                            userToUpdate.$save();
                        }, function(){
                            var lastUser = _.last(users);
                            user.id = lastUser.id + 1;
                            users.push(user);
                            users.$save();
                            deferred.resolve();
                        });
                }, 1000);
            });
        }

        function Delete(id) {
            return execute(function (deferred, users) {
                var filtered = $filter('filter')(users, { id: id});
                if(filtered == null){
                    deferred.reject('user not found')
                }else{
                    users = _.without(users, filtered[0]);
                    users.$save();
                    deferred.resolve();
                }
            });
        }

        // private functions

        function getUsers(){
            return $resource('/data/user.json', {id: '@id'}, {
                query: {method:'GET', isArray:true
                }});
        }
    }
})();