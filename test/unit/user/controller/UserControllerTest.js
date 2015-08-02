describe('user module test', function () {
    'use strict';
    beforeEach(module('app.user'));
    describe('User Controller', function () {
        var scope, $httpBackend, createController, location, expectedMenu;

        beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, LocalConfig, $location) {
            $httpBackend = _$httpBackend_;
            location = $location;
            scope = $rootScope.$new();
            $httpBackend.expectGET(LocalConfig.json.menu).respond(expectedMenu);
            createController = function () {
                return $controller('LoginCtrl', {
                    '$scope': scope
                });
            };
        }));

    });


});
