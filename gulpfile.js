const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

/* -------- Webpack  -------- */
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const gutil = require('gulp-util');
const notifier = require('node-notifier');
const path = require('path');

/* -------- beautiful logs in console  -------- */
let statsLog = {
    colors: true,
    reasons: true
};


/* -------- Server  -------- */
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 4000,
            baseDir: "build"
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload);
});


/* ------------ Styles compile ------------- */

gulp.task('styles:compile', function() {
    return gulp.src('source/styles/main.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(rename('main.css'))

    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))

    .pipe(gulp.dest('build/css'));
});


/* ------------ JS ------------- */

gulp.task('js', function() {
    return gulp.src([
            './source/js/main.js'
        ])
        .pipe(webpackStream(webpackConfig), webpack)
        //.pipe(babel())
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))

});

/* ------------ Pug compile ------------- */

gulp.task('templates:compile', function buildHTML() {
    return gulp.src('source/template/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
});



/* ------------ Copy fonts ------------- */

gulp.task('copy:fonts', function() {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});


/* ------------ Copy images ------------- */

gulp.task('copy:images', function() {
    return gulp.src('./source/images/**/*.*')
        .pipe(gulp.dest('build/images'))
});

/* ------------ Copy libs ------------- */

gulp.task('copy:libs', function() {
    return gulp.src('./source/libs/**/*.*')
        .pipe(gulp.dest('build/libs'))
});


/* ------------ Copy ------------- */

gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images', 'copy:libs'));


/* ------------ Delete ------------- */

gulp.task('clean', function del(cb) {
    return rimraf('build', cb)
});


/* ------------ Watchers ------------- */
gulp.task('watch', function() {
    gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
    gulp.watch('source/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series('clean',
    gulp.parallel('templates:compile', 'styles:compile', 'js', 'copy'),
    gulp.parallel('watch', 'server')
));