describe('home module test', function () {
    'use strict';
    beforeEach(module('app.home'));


    describe('Navbar Controller', function () {
        var scope, $httpBackend, createController, location, expectedMenu;

        beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, LocalConfig, $location) {
            $httpBackend = _$httpBackend_;
            location = $location;
            scope = $rootScope.$new();
            expectedMenu = [{
                "name": "SingleItem",
                "class": "fa-dashboard",
                "url": "index.html"
            },
                {
                    "name": "TwoLevelItem",
                    "class": "fa-bar-chart-o",
                    "subItems": [
                        {
                            "name": "Flot Charts",
                            "url": "public/pages/flot.html"
                        },
                        {
                            "name": "Morris.js Charts",
                            "url": "public/pages/morris.html"
                        }
                    ]
                },
                {
                    "name": "Multi-Level Dropdown",
                    "class": "fa-sitemap",
                    "subItems": [
                        {
                            "name": "Second Level Item",
                            "url": "public/pages/secondLevel.html"
                        },
                        {
                            "name": "Second Level Item",
                            "subItems": [
                                {
                                    "name": "third Level Item",
                                    "url": "public/pages/thirdLevel.html"
                                },
                                {
                                    "name": "third Level Item",
                                    "url": "public/pages/thirdLevel.html"
                                }
                            ]
                        },
                        {
                            "name": "Second Level Item",
                            "subItems": [
                                {
                                    "name": "third Level Item",
                                    "url": "public/pages/thirdLevel.html"
                                },
                                {
                                    "name": "third Level Item",
                                    "url": "public/pages/thirdLevel.html"
                                }
                            ]
                        }]
                }];
            $httpBackend.expectGET('messages.html').respond('');
            $httpBackend.expectGET(LocalConfig.json.menu).respond(expectedMenu);
            $controller('NavbarCtrl', {
                '$scope': scope
            });
            scope.$apply();
            $httpBackend.flush();

        }));

        it('should get menu after controller created', function(){
            expect(angular.equals(scope.menuItems, expectedMenu)).toBe(true);
        });

        it('menu should direct to the menu url if menu has url', function(){
            scope.clickMenuItem(expectedMenu[0]);
            expect(location.path()).toBe('/index.html');
        });

        it('menu should expended if menu has subItem', function(){
            scope.clickMenuItem(expectedMenu[1]);
            expect(expectedMenu[1].showSub == true);
            expect(angular.equals(scope.lastItem, expectedMenu[1])).toBe(true);
        });

        it('menu should collapse back if another menu item clicked', function(){
            scope.clickMenuItem(expectedMenu[2]);
            expect(expectedMenu[2].showSub == true);
            expect(angular.equals(scope.lastItem, expectedMenu[2])).toBe(true);
            scope.clickMenuItem(expectedMenu[1]);
            expect(expectedMenu[2].showSub == false);
            expect(angular.equals(scope.lastItem, expectedMenu[2])).toBe(false);
        });

        it('menu should go to second level item url if subItem has url', function(){
            scope.clickMenuItem(expectedMenu[1]);
            scope.clickSubItem(expectedMenu[1].subItems[1]);
            expect(expectedMenu[1].showSub == true);
            expect(angular.equals(scope.lastItem, expectedMenu[1])).toBe(true);
            expect(location.path()).toBe('/public/pages/morris.html');
        });

        it('third menu should collapse back all if another menu item clicked', function(){
            scope.clickMenuItem(expectedMenu[2]);
            scope.clickSubItem(expectedMenu[2].subItems[1]);
            expect(expectedMenu[2].showSub).toBe(true);
            expect(expectedMenu[2].subItems[1].showSub).toBe(true);
            scope.clickMenuItem(expectedMenu[1]);
            expect(expectedMenu[2].showSub == false);
            expect(expectedMenu[2].subItems[1].showSub).toBe(false);
        });

        it('third menu should collapse back all if another sub menu item clicked', function(){
            scope.clickMenuItem(expectedMenu[2]);
            scope.clickSubItem(expectedMenu[2].subItems[1]);
            expect(expectedMenu[2].subItems[1].showSub).toBe(true);
            scope.clickSubItem(expectedMenu[2].subItems[2]);
            expect(expectedMenu[2].showSub == true);
            expect(expectedMenu[2].subItems[1].showSub).toBe(false);
            expect(expectedMenu[2].subItems[2].showSub).toBe(true);
        });

        it('menu should go to third level item if subItem has subItems', function(){
            scope.clickMenuItem(expectedMenu[2]);
            scope.clickSubItem(expectedMenu[2].subItems[1]);
            expect(expectedMenu[2].showSub).toBe(true);
            expect(expectedMenu[2].subItems[1].showSub).toBe(true);
            expect(angular.equals(scope.lastItem, expectedMenu[2])).toBe(true);
            expect(angular.equals(scope.lastSubItem, expectedMenu[2].subItems[1])).toBe(true);

        });

        it('should redirect to login page when log out', function(){
            scope.logout();
            expect(location.path()).toBe('/login');
        });

        describe('menu filter', function(){
            var filter;
            beforeEach(function(){
                inject(function(_$filter_){
                    filter = _$filter_('menuFilter');
                });
            });

            it('should expend subItem when searched filtering words, and collapse back when search something else', function(){
                filter(expectedMenu, 'Second Level Item');
                expect(expectedMenu[2].showSub).toBe(true);
                filter(expectedMenu, 'Multi-Level Dropdown');
                expect(expectedMenu[2].showSub).toBe(false);
            });

            it('should expend subItem when searched third level items', function(){
                filter(expectedMenu, 'third Level Item');
                expect(expectedMenu[2].showSub).toBe(true);
                expect(expectedMenu[2].subItems[1].showSub).toBe(true);
            });
        });

    });
});
