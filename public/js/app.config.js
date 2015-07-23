/**
 * Created by tang.hao on 24/6/2015.
 */
(function () {
    'use strict';
    var imageBaseDir = 'img/';
    var dataBaseDir = 'data/';
    angular.module('app.config', [])
        .constant('LocalConfig', {
            'debugMode': true,
            'backend': 'http://localhost:3000/api',
            'version': 0.1,
            "noControlPages": [
                '/registration'
            ],
            'images':{
                bg: imageBaseDir + 'bg.jpg',
                intro_pic: imageBaseDir + 'intro-pic.jpg',
                slide1: imageBaseDir + 'slide-1.jpg',
                slide2: imageBaseDir + 'slide-2.jpg',
                slide3: imageBaseDir + 'slide-3.jpg'
            },
            'json':{
                menu: dataBaseDir + 'menu.json',
                user: dataBaseDir + 'user.json'
            }
        });
})();
