var gulp = require('gulp'),
    
    inlineCss = require('gulp-inline-css'),
    connect = require('gulp-connect');

//-------------- Trasformazione dgli stili in inline

gulp.task('buildInline', function() {
    return gulp.src('./src/*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('build/'));
});

//-------------- gestione server ----------------

gulp.task('webserver', function() {
  connect.server({
    root: 'build',
    port: 8000,
    livereload: true
  });
});

gulp.task('reload', function () {
  gulp.src('./build/*.html')
    .pipe(connect.reload());
});

//-------------------------------------------------


gulp.task('watch', function () {
    gulp.watch('./build/*.html', ['reload']);
    gulp.watch('./src/*.html', ['buildInline']);

});


gulp.task('server', ['webserver', 'watch']);
gulp.task('default', ['buildInline', 'webserver', 'watch']);