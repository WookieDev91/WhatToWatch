const gulp = require("gulp");
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');

const showErrors = function (err) {
    console.log(gutil.colors.red(err.toString()));
    this.emit('end');
};

gulp.task("browseSync", function () {
    browserSync.init({
        server: ".",
        notify: true,
        open: true //czy otwierac strone
    });
});


gulp.task('sass', function () {
    return gulp.src('scss/main.scss')//Weź
        .pipe(plumber({
            errorHandler: showErrors
        }))//trzeba dodoac klamerki do ustawiania parametrów
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))//skompiluj
        .pipe(autoprefixer({ //dodajemy po kompilacji!
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))//zapisz w folderze
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('scss/main.scss', ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', function () {
    console.log('-------start pracy -----------');
    gulp.start(["sass", "browseSync", "watch"]);
});