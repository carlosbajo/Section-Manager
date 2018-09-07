var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

// Minifies JS
gulp.task('js', function () {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
});

// Minify and concat CSS files
gulp.task('styles', function () {
    return gulp.src('css/*.css')
        .pipe(concat('site.css'))
        .pipe(minifyCSS())
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest('public/css'))
});

gulp.task('default', function () {
    gulp.run('styles')
    gulp.run('js')
    gulp.watch('src/sass/**/*.sass', function () {
        gulp.run('styles')
    })
});