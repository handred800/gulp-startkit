const gulp = require('gulp'),
    babel = require('gulp-babel'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    gulpUglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    mergeStream = require('merge-stream');

const vendors = ['jquery/dist','@fortawesome/fontawesome-free'];

gulp.task('vendors', () => {
    return mergeStream(vendors.map(function (vendor) {
        return gulp.src('node_modules/' + vendor.path + '/**/*')
            .pipe(gulp.dest('dist/common/vendors/' + vendor.path.replace(/\/.*/, '')));
    }));
});

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('img', () => {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/common/images'));
})

gulp.task('sass', () => {
    return gulp.src('src/sass/**/*.scss')
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

gulp.task("watch", () => {
    gulp.watch("src/*.html", gulp.series('html'));
    gulp.watch("src/sass/**/*.scss", gulp.series('sass'));
    gulp.watch("src/js/**/*.js", gulp.series('babel'));
})


gulp.task('default', gulp.parallel('html', 'img', 'sass', 'vendors', 'babel'));
gulp.task('watch', gulp.parallel('html', 'img', 'sass', 'vendors', 'babel', 'watch'));