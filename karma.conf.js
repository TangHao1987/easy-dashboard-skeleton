module.exports = function (config) {
    config.set({
        basePath: './',
        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-messages/angular-messages.js',
            'bower_components/underscore/underscore.js',
            'public/partials/user/user.module.js',
            'public/partials/**/*.js',
            'public/js/app.config.js',
            'public/js/app.js',
            'test/unit/**/*.js'
        ],
        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'public/partials/user/service/*.js': ['coverage'],
            'public/partials/home/**/*.js': ['coverage']
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
