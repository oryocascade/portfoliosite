"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs local dev server
var open = require('gulp-open'); // Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // Concatinates files
var lint = require('gulp-eslint'); // Lint JS files including JSX

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html', //go into the source directory and find anything with .html
        js: './src/**/*.js',
        jsWow: 'node_modules/wowjs/dist/wow.min.js',
        images: './src/images/*',
        css: [ 'node_modules/bootstrap/dist/css/bootstrap.min.css',
               'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
               './src/css/*'
        ],
        cssAnimate: 'node_modules/animate.css/animate.min.css',
        cssFontAwesome: 'node_modules/font-awesome/css/font-awesome.min.css',
        cssIcomoon: 'external_packages/IcoMoon-Free-master/Font/demo-files/demo.css',
        fonts: ['external_packages/IcoMoon-Free-master/Font/IcoMoon-Free.ttf'],
        dist: './dist',
        mainJs: './src/main.js'
    }
};

// Start a local development server
gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function() {
  gulp.src('dist/index.html')
      .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
}); //this means when you run the task open run the task connect first

gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());

    gulp.src(config.paths.jsWow)
        .pipe(gulp.dest(config.paths.dist + '/scripts'));
});

gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));

    gulp.src(config.paths.cssAnimate)
        .pipe(gulp.dest(config.paths.dist + '/css'));

    gulp.src(config.paths.cssFontAwesome)
        .pipe(gulp.dest(config.paths.dist + '/css'));
        
    gulp.src(config.paths.cssFontAwesome)
        .pipe(gulp.dest(config.paths.dist + '/css'));

    gulp.src(config.paths.cssIcomoon)
        .pipe(concat('icomoon.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

// Migrates images to dist folder
// Note: could optimize images through gulp
gulp.task('images', function() {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'));

    //publish favicon
    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function() {
    return gulp.src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

gulp.task('fonts', function() {
    gulp.src(config.paths.fonts)
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
    gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'js', 'css', 'fonts', 'images', 'lint', 'open', 'watch']);