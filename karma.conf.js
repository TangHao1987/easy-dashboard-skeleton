module.exports = function (config) {
    config.set({
        basePath: './',
        files: [
            'public/lib/bower_components/angular/angular.js',
            'public/lib/bower_components/angular-route/angular-route.js',
            'public/lib/bower_components/angular-mocks/angular-mocks.js',
            'public/lib/bower_components/angular-resource/angular-resource.js',
            'public/lib/bower_components/angular-cookies/angular-cookies.js',
            'public/lib/bower_components/underscore/underscore.js',
            'public/js/*.js',
            'public/js/service/**/*.js',
            'test/unit/**/*.js'
        ],
        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'app/service/**/*.js': ['coverage']
        },

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
