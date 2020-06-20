const gulp = require('gulp'),
  babel = require('gulp-babel'),
  autoprefixer = require('autoprefixer'),
  postcss = require('gulp-postcss'),
  gulpUglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  mergeStream = require('merge-stream'),
  fileinclude = require('gulp-file-include');

const vendors = [
  {
    name: 'jquery/dist',
    children: [],
  }, {
    name: '@fortawesome/fontawesome-free',
    children: ['/css', '/webfonts'],
  }
];

gulp.task('vendors', () => {
  let stream = mergeStream();
  let taskArray = vendors.map((vendor) => {
    if (vendor.children.length === 0) {
      // 無 children，去掉 "/" 後的路徑名稱 (e.g. jquery/dist => jquery)
      return gulp.src('node_modules/' + vendor.name + '/**/*')
        .pipe(gulp.dest('dist/common/vendors/' + vendor.name.replace(/\/.*/, '')));
    } else {
      // 有 children，用 child 取代 "/" 後的路徑名稱 (e.g. @fortawesome/fontawesome-free => @fortawesome/css )
      return vendor.children.map((child) => {
        return gulp.src('node_modules/' + vendor.name + child + '/*')
          .pipe(gulp.dest('dist/common/vendors/' + vendor.name.replace(/\/.*/, child)));
      })
    }
  })
  // 陣列展平
  taskArray = [].concat.apply([], taskArray);
  // 把 task merge在一起
  taskArray.forEach((task) => { stream.add(task) });
  return stream;
})

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('dist'));
});

gulp.task('img', () => {
  return gulp.src('src/images/*')
    .pipe(gulp.dest('dist/common/images'));
})

gulp.task('sass', () => {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/common/css'));
});

gulp.task("babel", () => {
  return gulp.src("src/js/main.js")
    .pipe(babel())
    .pipe(gulpUglify())
    .pipe(gulp.dest("dist/common/js/"));
});

gulp.task("watch", () => {
  gulp.watch("src/*.html", gulp.series('html'));
  gulp.watch("src/sass/**/*.scss", gulp.series('sass'));
  gulp.watch("src/js/**/*.js", gulp.series('babel'));
})


gulp.task('default', gulp.parallel('html', 'img', 'sass', 'vendors', 'babel'));
gulp.task('watch', gulp.parallel('default', 'watch'));