(function () {
    'use strict';
    var dirModule = angular.module('app.directive', []);
    dirModule.directive('refClick', function ($location) {
        return function (scope, element, attrs) {
            var path;

            attrs.$observe('refClick', function (val) {
                path = val;
            });

            element.bind('click', function () {
                scope.$apply(function () {
                    $location.path(path);
                });
            });
        };
    });

    dirModule.directive('compareTo', function () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    });

    dirModule.directive('checkStrength', function (DirectiveService) {
        return {
            replace: false,
            restrict: 'EACM',
            require: 'ngModel',
            link: function (scope, iElement, iAttrs, password) {
                scope.$watch(iAttrs.for, function () {
                    var passwordValue = password.$viewValue;
                    var ul = iElement.children();
                    if (!passwordValue || passwordValue === '') {
                        ul.css({"display": "none"});
                    } else {
                        var c = DirectiveService.getColor(passwordValue);
                        ul.css({"display": "inline"});
                        ul.children('li')
                            .css({"background": "#DDD"})
                            .slice(0, c.idx)
                            .css({"background": c.col});
                    }
                });

            },
            templateUrl: 'public/partials/directives/directive.checkStrength.html'
        };

    });


})();
