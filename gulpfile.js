const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

// Tarea para compilar SCSS
gulp.task('styles', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'));
});

// Tarea para mover archivos HTML
gulp.task('html', () => {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
});

// Tarea para observar cambios
gulp.task('watch', () => {
  gulp.watch('./src/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('./src/**/*.html', gulp.series('html'));
});

// Tarea por defecto
gulp.task('default', gulp.series('styles', 'html', 'watch'));
