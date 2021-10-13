const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: 'dist',
      // baseDir: 'src',
    },
  });
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
  return (
    gulp
      .src('src/sass/**/*.+(scss|sass)') // /**/ означает- и все папки, что внутри с тамими же файлами
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(
        rename({
          prefix: '',
          suffix: '.min',
        })
      )
      .pipe(autoprefixer())
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist/css'))
      //.pipe(gulp.dest('src/css'))
      .pipe(browserSync.stream())
  );
});

/**
 * отслеживание изменений в соответсвующих файлах
 */
gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
  gulp.watch('src/*.html').on('change', gulp.parallel('html')); // когда происходят изменения в файле html то будет запускатся задача 'html'
});

/**
 * уменьшение файла html и перезапись его в dist
 */
gulp.task('html', function () {
  return (
    gulp
      .src('src/*.html')
      // получаем файлы по определенному пути
      .pipe(htmlmin({collapseWhitespace: true})) // убираем пробелы
      .pipe(gulp.dest('dist/'))
  ); // куда поместится файл после min
});

/**
 * перемещаем все файлы из js  в dist
 */
gulp.task('scripts', function () {
  return gulp
    .src('src/js/**/*.js') // берем любые файлы в папке js  с расширением js
    .pipe(gulp.dest('dist/js')); // куда поместится файл после min
});

/**
 * перемещаем все файлы из fonts  в dist
 */
gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts')); // куда поместится файл после min
});
/**
 * перемещаем все файлы из icons  в dist
 */
gulp.task('icons', function () {
  return gulp.src('src/icons/**/*').pipe(gulp.dest('dist/icons')); // куда поместится файл после min
});

/**
 * перемещаем все файлы из images  в dist
 */
gulp.task('images', function () {
  return gulp.src('src/img/**/*').pipe(gulp.dest('dist/img')); // куда поместится файл
});

gulp.task('normal', function () {
  return gulp
    .src('src/css/**/*.css') // берем любые файлы в папке js  с расширением js
    .pipe(gulp.dest('dist/css')); // куда поместится файл после min
});

gulp.task(
  'default',
  gulp.parallel(
    'watch',
    'server',
    'styles',
    'scripts',
    'fonts',
    'icons',
    'images',
    'html',
    'normal'
  )
);
