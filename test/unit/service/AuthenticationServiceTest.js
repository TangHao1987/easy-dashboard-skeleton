describe('authentication service test', function() {
    'use strict';
    beforeEach(module('app.user'));
    describe('authentication service', function(){
        var $httpBackend,service, scope, timeout;
        var expectedUsers = [
            {
                "id" : 1,
                "email": "test1@123.com",
                "password" : "root1"
            },
            {
                "id" : 2,
                "email": "test2@123.com",
                "password" : "root2"
            }
        ];
        beforeEach(inject(function(_$httpBackend_,AuthenticationService, $rootScope, $timeout){  //parameter name = service name
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('messages.html').
                respond('');
            $httpBackend.expectGET('data/user.json').
                respond(expectedUsers);

            service = AuthenticationService;
            scope = $rootScope;
            timeout = $timeout;
        }));

        describe('Login method', function(){
            it('should login correctly with right username and password', function(){
                var success = null;
                service.Login('test1@123.com', 'root1', function(response){
                    success = response.success;
                });

                timeout.flush();
                scope.$apply();
                $httpBackend.flush();

                expect(success).toBe(true);
            });

            it('should fail login with wrong username and password', function(){
                var success = null;
                service.Login('test1@123.com', 'root2', function(response){
                    success = response.success;
                });

                timeout.flush();
                scope.$apply();
                $httpBackend.flush();


                expect(success).toBe(false);
            });
        });

        describe('SetCredentials', function(){
            var cookie;
            beforeEach(inject(function($cookies){
                cookie = $cookies
            }));

            it('should set SetCredentials to global object and cookies', function(){
                var user = expectedUsers[0];
                service.SetCredentials(user.email, user.password);
                var currentUser = scope.globals.currentUser;
                var authData = user.email + ':' + user.password;
                expect(angular.equals(currentUser, {
                    username: user.email,
                    authdata:authData
                })).toBe(true);
                var cached = JSON.parse(cookie.get('globals'));
                expect(angular.equals(cached, scope.globals)).toBe(true);

            });

            it('should clean set credentials after run clean', function(){
                scope.globals = {test:'test'};
                cookie.putObject('globals', scope.globals);
                service.ClearCredentials();
                expect(angular.equals( scope.globals, {})).toBe(true);
                expect(cookie.get('globals')).toBe(undefined);
            });
        });
    });


});
