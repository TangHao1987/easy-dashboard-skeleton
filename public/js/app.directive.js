(function () {
    'use strict';
    angular.module('app.directive', []).directive( 'refClick', function ( $location ) {
        return function ( scope, element, attrs ) {
            var path;

            attrs.$observe( 'refClick', function (val) {
                path = val;
            });

            element.bind( 'click', function () {
                var currentPath = $location.path();
                scope.$apply( function () {
                    $location.path(path);
                });
            });
        };
    });
})();
