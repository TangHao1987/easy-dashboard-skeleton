describe('user module test', function () {
    'use strict';
    beforeEach(module('app.user'));
    describe('User Controller', function () {
        var scope, $httpBackend, createController, location, authService, q;
        var expectedUser = [{
            "id": 1,
            "email": "test1@123.com",
            "password": "root1"
        },
            {
                "id": 2,
                "email": "test2@123.com",
                "password": "root2"
            }];
        beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, LocalConfig, $location, $q) {

            $httpBackend = _$httpBackend_;
            location = $location;
            scope = $rootScope.$new();
            $httpBackend.expectGET('messages.html').
                respond('');
           // $httpBackend.expectGET(LocalConfig.json.user).respond(expectedUser);
            authService=  jasmine.createSpyObj('AuthenticationService', ['Login']);
            createController = function () {
                return $controller('LoginCtrl', {
                    '$scope': scope,
                    'AuthenticationService' : authService
                });
            };
        }));


    });


});
