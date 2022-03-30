import gulp from 'gulp';
//Импорт путей
import { path } from './gulp/config/path.js';
//Импорт общих плагинов
import { plugins } from './gulp/config/plugins.js';

//передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins
}

//Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprive.js';



//Наблюдение за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}



const fonts = gulp.series(otfToTtf, ttfToWoff);


const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));
//Сценарии выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks);

export { svgSprive }
export { fonts }
export { dev }
export { build }

//Выполнение сценария по умолчанию
gulp.task('default', dev);
// npm run sprite  (создаст svg sprite d dist/icons)
//npm run fonts (конвертирует шрифты в woff woff2)
//npm run dev == gulp default -режим разработчика
//npm run build - режим продакшн

