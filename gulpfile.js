// todo: replace less with stylus
// todo: update autoprefixer to use non-less one

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer')
var cleancss = require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var rename = require('gulp-rename');
var print = require('gulp-print');

var autoprefix = autoprefixer({ browsers: ['last 3 versions'] });

gulp.task('watch', function() {
  gulp.watch('./**/*.styl', ['build']);
});

gulp.task('build', function() {
  gulp.src('./*.styl')
    .pipe(print())
    .pipe(stylus())
    .pipe(autoprefix)
    .pipe(csscomb())
    .pipe(gulp.dest('./dist'))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('tools', function() {
  gulp.src('tools/**/*.stylus')
    .pipe(autoprefix)
    .pipe(csscomb())
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }))
});

gulp.task('default', ['build']);
