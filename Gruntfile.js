module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            // @todo remove drupal
            dist: {
                src: [
                    '[SCRIPTS_GO_HERE].js'
                ],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            options: {
              curly: true,
              eqeqeq: true,
              eqnull: true,
              browser: true,
              reporter: 'jslint',
              reporterOutput: 'reports/jshint.xml',
              globals: {
                  jQuery: true
              },
            },
            all: ['src/scripts/**/*.js']
        },
        sass: {
            dist: {
               options: {
                   style: 'expanded'
               },
               files: {
                   'src/styles/css/main.css': 'src/styles/scss/main.scss'
               }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/styles/<%= pkg.name %>.min.css': ['src/styles/css/main.css']
                }
            }
        },
        csslint: {
            options: {
                formatters: [
                    {id: 'junit-xml', dest: 'reports/csslint_junit.xml'},
                    {id: 'csslint-xml', dest: 'reports/csslint.xml'}
                ]
            },
            strict: {
                options: {
                  import: 2
                },
                src: ['src/styles/css/main.css'],
            }
        },
        watch: {
            scripts: {
                files: ['src/scripts/**/*.js'],
                tasks: ['build-js'],
                options: {
                    spawn: false,
                },
            },
            styles: {
                files: ['src/styles/**/*.scss'],
                tasks: ['build-css'],
                options: {
                    spawn: false,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('build-js', ['concat', 'uglify', 'jshint']);
    grunt.registerTask('build-css', ['sass', 'cssmin', 'csslint']);
    grunt.registerTask('build', ['build-css', 'build-js']);

};
