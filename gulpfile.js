var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    mocha = require('gulp-mocha'),
    stylish = require('jshint-stylish');

var paths = {
  scripts: './src/javascripts/**/*.js',
  styles: './src/stylesheets/**/*',
  markup: './src/index.html',
  tests: './tests/**/*',
  dest: './dest/'
};

// lint javascript
gulp.task('lint', function() {
  gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// run tests
gulp.task('test', function() {
  gulp.src(paths.tests)
    .pipe(mocha());
});

// join javascript and output
gulp.task('concat', function() {
  gulp.src(paths.scripts)
    .pipe(gulp.dest(paths.dest + 'javascripts'));
  gulp.src(paths.markup)
    .pipe(gulp.dest(paths.dest));
});

// compile sass
gulp.task('sass', function() {
  gulp.src(paths.styles)
    .pipe(sass())
    .pipe(gulp.dest(paths.dest + 'stylesheets'));
});

// watches
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint']);
  gulp.watch([paths.scripts, paths.markup], ['concat']);
  gulp.watch(paths.styles, ['sass']);
});

// tasks
gulp.task('default', ['lint', 'concat', 'sass']);
