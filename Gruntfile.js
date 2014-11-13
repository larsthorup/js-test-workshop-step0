module.exports = function (grunt) {
    'use strict';

    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json')
    };

    // convenience
    grunt.registerTask('default', ['lint', 'test']);
    grunt.registerTask('all', ['clean', 'lint', 'test']);

    // continuous integration
    grunt.registerTask('ci', ['lint', 'cover']);


    // clean
    grunt.loadNpmTasks('grunt-contrib-clean');
    gruntConfig.clean = {
        output: ['output']
    };


    // lint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    gruntConfig.jshint = {
        options: { bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true,
            indent: 4, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, plusplus: true,
            quotmark: true, regexp: true, undef: true, unused: true, strict: true, trailing: true,
            maxparams: 3, maxdepth: 2, maxstatements: 50, globals: {
                afterEach: true,
                beforeEach: true,
                describe: true,
                expect: true,
                it: true,
                jasmine: true,
                jQuery: true,
                Math: true,
                module: true,
                spyOn: true,
                window: true,
                xit: true,
                '$': true
            }},
        all: [
            'Gruntfile.js',
            'src/js/**/*.js',
            'test/js/**/*.js'
        ]
    };
    grunt.registerTask('lint', 'jshint');


    // karma
    grunt.loadNpmTasks('grunt-karma');
    gruntConfig.karma = {
        options: {
            frameworks: ['jasmine'],
            files: ['src/lib/**/*.js', 'src/js/**/*.js', 'test/lib/**/*.js', 'test/js/**/*.test.js'],
            coverageReporter: {
                reporters: [
                    {type: 'lcov'},
                    {type: 'html'},
                    {type: 'cobertura'},
                    {type: 'text-summary'}
                ],
                dir: 'output/coverage'
            },
            junitReporter: {
                outputFile: 'output/test/test-results.xml'
            }
        },
        phantomjs: {
            browsers: ['PhantomJS'],
            preprocessors: {
                'src/js/**/*.js': ['coverage']
            },
            reporters: ['progress', 'coverage', 'junit'],
            singleRun: true
        },
        firefox: {
            browsers: ['Firefox'],
            reporters: ['progress'],
            autoWatch: true
        },
        chrome: {
            browsers: ['Chrome'],
            reporters: ['progress'],
            autoWatch: true
        }
    };
    grunt.registerTask('test', 'karma:phantomjs');

    // watch
    grunt.loadNpmTasks('grunt-contrib-watch');
    gruntConfig.watch = {
        scripts: {
            files: ['src/**/*.*', 'test/**/*.*'],
            tasks: ['lint', 'test']
        }
    };

    // grunt
    grunt.initConfig(gruntConfig);
};