/**
 * Created by tang.hao on 24/6/2015.
 */
(function () {
    'use strict';
    angular.module('app.config', [])
        .constant('LocalConfig', {
            'debugMode': true,
            'backend': 'http://localhost:3000/api',
            'version': 0.1,
            'controlPages': [
            ]
        });
})();
