module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        wiredep: {
            task: {
                src: [
                    'src/index.html'
                ]
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'src/bower_components',
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },
        watch: {
            sass: {
                files: ['src/sass/**/*.{scss,sass}','src/sass/_partials/**/*.{scss,sass}'],
                tasks: ['sass:dist', 'autoprefixer:dist']
            },
            livereload: {
                files: ['src/*.html', 'src/js/**/*.{js,json}', 'src/css/*.css','src/img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
                options: {
                    livereload: true
                }
            }
        },
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compact'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/sass',
                    src: ['*.scss'],
                    dest: 'src/css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version'],
                map: true
            },
            dist: {
                src: 'src/css/main.scss', // ¯\_(ツ)_/¯
                dest: 'src/css/main.prefixed.css'
            }
        },
        express: {
            dev: {
                options: {
                    script: 'main.js'
                }
            },
        }
    });

    grunt.registerTask('default', ['express:dev', 'watch']);
    grunt.registerTask('deps', ['bower:install', 'wiredep']);
    grunt.registerTask('sass', ['sass:dist', 'autoprefixer:dist']);

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-express-server');
};
