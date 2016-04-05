/*
Install:

- NodeJs
- npm
- gulp

*/

// include the required packages. 
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    csso = require('gulp-csso'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    gulpSequence = require('gulp-sequence'),
    stylint = require('gulp-stylint'),
    htmlmin = require('gulp-htmlmin');
 
// Minify HTML 
gulp.task('html-minify', function() {
  return gulp.src('../*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./../compressed-html/'))
});

//  CSS  
gulp.task('css-lint', function() {
    return gulp.src('../css/*.styl')
        .pipe(stylint())
        .pipe(stylint({config: '.stylintrc'}))
        .pipe(stylint.reporter());
});

// Get one .styl file and render 
gulp.task('build-css', function () {
  return gulp.src('../css/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('../css/common-bundles'));
});

// css sourcemap
gulp.task('css-sourcemap', function () {
    return gulp.src('../css/common-bundles/*.css')
        .pipe(sourcemaps.init())
        //.pipe(csso())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../css/common-bundles'));
});

// CSS INLINE
gulp.task('css-compress', function () {
    return gulp.src('../css/common-bundles/styles.css')
        .pipe(csso())
        .pipe(gulp.dest('../css/common-bundles'));    
});

// Set linenos 
gulp.task('linenos', function () {
  return gulp.src('../css/*.styl')
    .pipe(stylus({linenos: true}))
    .pipe(gulp.dest('../css/linenos'));
});

 
// CSS Watch
gulp.task('watch', function () {
    watch('../css/*.styl', batch(function (events, done) {
        gulp.start('css', done);
    }));
});
 //  CSS  

//  JS  
gulp.task('js-lint', function () {
    return gulp.src(['../js/*.js'])
        .pipe(eslint({
          rules:{
            "camelcase": 2,
            "no-mixed-spaces-and-tabs": 0,
            "default-case": 2,
            "eqeqeq": 2,
            "no-empty-function": 2,
            "no-multi-spaces": 2,
            "strict": 2,
            "block-spacing": 2,
            "comma-spacing": ["error", {"before": false, "after": true}],
            "indent": ["error", "tab", {"SwitchCase": 1}],
            "no-multiple-empty-lines": ["error", {"max": 1}],
            "no-inline-comments": "error",
            "one-var-declaration-per-line": ["error", "always"],
            "no-console": 2
          }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('js-compress', function() {
  return gulp.src('../js/*.js')
    .pipe(gulp.dest('../js/common-bundles'))
      .pipe(sourcemaps.init())
      .pipe(uglify({
        compress: {
          negate_iife: false
        }
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('../js/common-bundles'));
});
//  JS  

// Only CSS
gulp.task('css', gulpSequence(['css-lint'], ['build-css'], ['css-compress'], ['css-sourcemap']));

// Only JS
gulp.task('js', gulpSequence(['js-lint'], ['js-compress']));

// Default gulp task to run 
gulp.task('default', gulpSequence(['js-lint'], ['js-compress'], ['css-lint'], ['build-css'], ['css-compress'], ['css-sourcemap']));