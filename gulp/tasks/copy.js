export const copy = () => {
  return app.gulp.src(app.path.src.files)   //галп получает доступ к файлам и папкам по указанному пути
  .pipe(app.gulp.dest(app.path.build.files))
}