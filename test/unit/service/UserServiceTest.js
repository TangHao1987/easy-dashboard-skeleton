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
            var fetchedUsers;

            service.GetAll().then(function(users){
                    fetchedUsers = users;
            });

            scope.$apply();
            $httpBackend.flush();

            expect(angular.equals(fetchedUsers,expectedUsers)).toBe(true);
        });

        it('should get the expected user by Id', function(){
            var fetchedUsers;

            service.GetById(1).then(function(users){
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

        it('should get the expected user by Email', function(){
            var fetchedUsers;
            service.GetByEmail("test1@123.com").then(function(users){
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
            var updatedUser;
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
    });
});