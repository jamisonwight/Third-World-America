var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require("gulp-util"),
    webpack = require('webpack'),
    webpack_config = require('./webpack.config.js'),
    nested = require('postcss-nested');
    rename = require('gulp-rename');

gulp.task('default', ['watch:js', 'watch:vue', 'watch:sss']);
 
gulp.task('sugarss', function () {
    var assets = require('postcss-assets');
    var sugarss = require('sugarss');

    var plugins = [
        require("postcss-import"),
        require('postcss-cssnext'),
        require('postcss-nested'),
        require('lost'),
        require('postcss-import-url'),
        require('postcss-assets'),
        
    ];
    return gulp.src('src/css/style.sss')
        .pipe(postcss(plugins, { parser: sugarss }))
        .pipe(postcss([assets({
            loadPaths: ['./assets/']
        })]))
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('concat', function() {
    var concat = require('gulp-concat'),
        beautify = require('gulp-beautify'),
        babel = require('gulp-babel');

    return gulp.src('src/js/app.js')
    .pipe(concat('main.js'))
    .pipe(beautify({indent_size: 4}))
    .pipe(babel({
			presets: ['es2015']
		}))
    .pipe(gulp.dest('src/js/'))
});

gulp.task('watch:sss', function() {
    gulp.watch('src/css/*.sss', ['sugarss']);
    gulp.watch('src/css/**/*.sss', ['sugarss']);
});

gulp.task('watch:js', function() {
    gulp.watch('src/js/app.js', ['concat'])
});

gulp.task('watch:vue', function() {
    gulp.watch('src/js/modules/*.vue', ['concat'])
});
