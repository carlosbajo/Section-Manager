var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

// Minifies JS
gulp.task('js', function () {
    return gulp.src(['js/sectionManager.js','js/controlls.js','js/burger.js'])
        .pipe(concat('sectionManager.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});

// Minify and concat CSS files
gulp.task('styles', function () {
    return gulp.src('css/*.css')
        .pipe(concat('sectionManager.min.css'))
        .pipe(minifyCSS())
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest('dist'))
});

gulp.task('default', function () {
    gulp.run('styles')
    gulp.run('js')
    gulp.watch('src/sass/**/*.sass', function () {
        gulp.run('styles')
    })
});