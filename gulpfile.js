const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
var merge = require('merge-stream');

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
});