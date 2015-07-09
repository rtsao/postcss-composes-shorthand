var gulp = require('gulp');
var shell = require('gulp-shell');

var files = ['index.js', 'test/*.js', 'gulpfile.js'];

gulp.task('lint', function (done) {
  var eslint = require('gulp-eslint');
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()).on('error', done);
});

gulp.task('test', shell.task([
  'tape test/* | faucet',
]));

gulp.task('default', ['lint', 'test']);

gulp.task('watch', function () {
  gulp.watch(files, ['lint', 'test']);
});
