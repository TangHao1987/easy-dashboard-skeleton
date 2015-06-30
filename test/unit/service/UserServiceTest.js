describe('user service test', function(){
    'use strict';

    beforeEach(module('app.Service'));
    describe('user service', function(){
        var $httpBackend,service, scope;

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
        beforeEach(inject(function(_$httpBackend_,UserService, $rootScope){  //parameter name = service name
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/data/user.json').
                respond(expectedUsers);

            service = UserService;
            scope = $rootScope;
        }));

        it('should return all the defined users when query all user', function(){
            var fetchedUsers = null;

            service.GetAll().then(function(users){
                    fetchedUsers = users;
            });

            scope.$apply();
            $httpBackend.flush();

            expect(angular.equals(fetchedUsers,expectedUsers)).toBe(true);
        });

        it('should get the expected user by Id', function(){
            var fetchedUsers = null;

            service.GetByParam(1, 'id').then(function(users){
                fetchedUsers = users;
            });
            scope.$apply();
            $httpBackend.flush();
            expect(angular.equals(fetchedUsers,{
                "id" : 1,
                "email": "test1@123.com",
                "password" : "root1"
            })).toBe(true);
        });

        it('should be rejected as user not found', function(){
            var errorMsg = null;

            service.GetByParam(3, 'id').then(function(users){},function(message){
                errorMsg = message;
            });
            scope.$apply();
            $httpBackend.flush();
            expect(errorMsg).toBe('user not found');
        });

        it('should get the expected user by Email', function(){
            var fetchedUsers = null;
            service.GetByParam("test1@123.com", 'email').then(function(users){
                fetchedUsers = users;
            });
            scope.$apply();
            $httpBackend.flush();
            expect(angular.equals(fetchedUsers,{
                "id" : 1,
                "email": "test1@123.com",
                "password" : "root1"
            })).toBe(true);
        });

        it('should be rejected as user not found', function(){
            var errorMsg = null;

            service.GetByParam("test3@123.com", 'email').then(function(users){},function(message){
                errorMsg = message;
            });
            scope.$apply();
            $httpBackend.flush();
            expect(errorMsg).toBe('user not found');
        });

        it('should modify the email of user id is 1', function(){
            var user1 =  {
                "id" : 1,
                "email": "test1@123.com",
                "password" : "root1"
            };
            $httpBackend.expectPOST('/data/user.json?id=1', {
                "id" : 1,
                "email": "test1@123.com",
                "password" : "root12"
            }).respond(200);
            var updatedUser = null;
            user1.password = 'root12';
            service.CreateOrUpdate(user1).then(function(user){
                updatedUser = user;
            });
            scope.$digest();
            $httpBackend.flush();
            expect(angular.equals(updatedUser,{
                "id" : 1,
                "email": "test1@123.com",
                "password" : "root12"
            })).toBe(true);
        });

        it('should create new user of user id is 3', function(){
            var user =  {
                "email": "test3@123.com",
                "password" : "root3"
            };
            $httpBackend.expectPOST('/data/user.json?id=3').respond(200);
            var updatedUser = null;
            service.CreateOrUpdate(user).then(function(user){
                updatedUser = user;
            });
            scope.$digest();
            $httpBackend.flush();
            expect(angular.equals(updatedUser,{
                "id" : 3,
                "email": "test3@123.com",
                "password" : "root3"
            })).toBe(true);
        });

        it('should delete the user whose user id = 1', function(){
            $httpBackend.expectDELETE('/data/user.json?id=1').respond(200);
            var resp = null;
            service.Delete(1).then(function(response){
                resp = response;
            });
            scope.$digest();
            $httpBackend.flush();
            expect(resp).toBe('success');
        });

        it('should be rejected the delete the user whose user id = 3', function(){
            var msg = null;
            service.Delete(3).then(function(response){

            }, function(message){
                msg = message;
            });
            scope.$digest();
            $httpBackend.flush();
            expect(msg).toBe('user not found');
        });
    });
});