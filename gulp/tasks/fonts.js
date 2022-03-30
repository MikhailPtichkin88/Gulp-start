import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  //Ищем файлы otf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "FONTS",
      message: "Error: <%= error.message %>"
    }))
  )
//Конвертируем в ttf
  .pipe(fonter({
    formats: ['ttf']
  }))
  //Выгружаем в ту же папку
  .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
  //Ищем файлы ttf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "FONTS",
      message: "Error: <%= error.message %>"
    }))
  )
//Конвертируем в woff
  .pipe(fonter({
    formats: ['woff']
  }))
  //Выгружаем в  dist
  .pipe(app.gulp.dest(`${app.path.build.fonts}`))
   //Ищем файлы ttf
  .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
  //Конвертируем в woff2
  .pipe(ttf2woff2())
   //Выгружаем в  dist
  .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}


