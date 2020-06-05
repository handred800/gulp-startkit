const gulp = require('gulp'),
    babel = require('gulp-babel'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    gulpUglify = require('gulp-uglify'),
    sass = require('gulp-sass');

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('img', () => {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/common/images'));
})

gulp.task('sass', () => {
    return gulp.src('src/sass/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('dist/common/css'));
});

gulp.task("babel", () => {
  return gulp.src("src/js/main.js")
    .pipe(babel())
    .pipe(gulpUglify())
    .pipe(gulp.dest("dist/common/js/"));
});


gulp.task('default', gulp.parallel('html','img' ,'sass', 'babel'));