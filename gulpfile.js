const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const merge = require('merge-stream');
const jasmine = require('gulp-jasmine');
const concat = require('gulp-concat');
const fs = require('fs');

gulp.task('prepare:clean-output', () => {
    return del(['artifacts']);
});

gulp.task('prepare', ['prepare:clean-output']);

gulp.task('compile:lib', () => {
    var tsProject = ts.createProject('src/tsconfig.json');
    var tsResult = tsProject.src().pipe(tsProject());
    return merge([
        tsResult.js.pipe(gulp.dest('.')),
        tsResult.dts.pipe(gulp.dest('.'))
    ]);
});

gulp.task('compile:tests', ['compile:lib'], () => {
    var tsProject = ts.createProject('test/tsconfig.json');
    var tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('artifacts/tests'));
});

gulp.task('compile', ['prepare', 'compile:tests']);

gulp.task('default', ['compile'], () => {
});

gulp.task('test', ['compile'], () => {
    fs.writeFileSync('artifacts/tests/strict.js', '\"use strict\";');

    return gulp
        .src(['artifacts/tests/strict.js',
            'artifacts/lib/SignalR.js',
            'artifacts/tests/Connection.spec.js',
            'artifacts/tests/UrlBuilder.spec.js'])
        .pipe(concat('tests.js'))
        .pipe(gulp.dest('artifacts/tests'))
        .pipe(jasmine());
});