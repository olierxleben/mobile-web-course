const gulp = require('gulp');
const sass = require('gulp-sass');
const auto = require('gulp-autoprefixer');
const sync = require('browser-sync').create();

gulp.task('styles', () =>{
  gulp
    .src('sass/**/*.scss')
    .pipe(sass())
    .pipe(auto())
    .pipe(gulp.dest('css/'));
})

gulp.task('default', () => {
  gulp.watch('sass/**/*.scss', ['styles']);
  sync.init({
    server: './'
  })
  
  sync.stream();
});