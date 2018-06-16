const gulp = require('gulp');
const sass = require('gulp-sass');
const prfx = require('gulp-autoprefixer');
const sync = require('browser-sync').create();
const lint = require('gulp-eslint');
const jasm = require('gulp-jasmine-phantom');

const PATHS = {
  js: 'js/**/*.js',
  sass: 'sass/**/*.scss'
}

gulp.task('styles', () =>{
  return gulp
    .src(PATHS.sass)
    .pipe(sass())
    .pipe(prfx())
    .pipe(gulp.dest('css/'));
})

gulp.task('lint', () => {
  return gulp
    .src(PATHS.js)
    .pipe(lint())
    .pipe(lint.format())
    .pipe(lint.failOnError);
})

gulp.task('tests', () => {
  return gulp.src('spec/**/*.spec.js')
  .pipe(jasm())
});

gulp.task('default', () => {
  gulp.watch(PATHS.sass, ['styles']);
  gulp.watch(PATHS.js, ['lint']);
  
  sync.init({
    server: './'
  })
  
  sync.stream();
});