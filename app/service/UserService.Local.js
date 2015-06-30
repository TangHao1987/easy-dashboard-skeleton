/**
 * Created by tang.hao on 25/6/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.Service', ['ngResource'])
        .factory('UserService', UserService);

    UserService.$inject = ['$q', '$resource'];
    function UserService($q, $resource) {

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
                    var user = findUserByParam(response, id, 'id');
                    if(user){
                        deferred.resolve(user);
                    }else{
                        deferred.reject();
                    }
                });
            });
        }

        function findUserByParam(response, param, term){
            if(term === 'id'){
                return _.find(response, function(item){
                    return item.id = param;
                });
            }else if(term === 'email'){
                return _.find(response, function(item){
                    return item.email = param;
                });
            }
        }

        function GetByEmail(email) {
            return execute(function (deferred, users) {
                users.query(function(response){
                    var user = findUserByParam(response, email, 'email');
                    if(user){
                        deferred.resolve(user);
                    }else{
                        deferred.reject();
                    }
                });
            });
        }

        function CreateOrUpdate(user) {
            return execute(function (deferred, users) {
                    users.query(function(response){
                        var findUser = findUserByParam(response, user.email, 'email');
                        if(user){
                            findUser.password = user.password;
                            findUser.$save();
                            deferred.resolve(findUser);
                        }else{
                            var lastUser = _.last(response);
                            user.id = lastUser.id + 1;
                            response.push(user);
                            response.$save();
                            deferred.resolve(user);
                        }
                    });
            });
        }

        function Delete(id) {
            return execute(function (deferred, users) {
                users.query(function (response) {
                    var user = findUserByParam(response, id, 'id');
                    if (user == null) {
                        deferred.reject('user not found')
                    } else {
                        user.$delete();
                        deferred.resolve('success');
                    }
                });
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