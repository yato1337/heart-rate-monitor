const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));       /* компилятор sass */
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

gulp.task('server', function() {          /* команда с задачей для запуска сервера   */

    browserSync({                
        server: {
            baseDir: "src"        /*  путь до папки с html файлом для запуска сервера (index.html обязательное назвавние ) */
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload); /* отслеживает изменения в html файле */
});

gulp.task('styles', function() {            
    return gulp.src("src/sass/**/*.+(scss|sass)")    /* обращение к sass или scss файлам */
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) /* запустили компилятор sass и сказали , что он будет сжатый и подсказку ошибки */ 
        .pipe(rename({suffix: '.min', prefix: ''})) /* добавляем суфикс мин в названии файла */
        .pipe(autoprefixer())  /* добавляет префикс там где нужно  */
        .pipe(cleanCSS({compatibility: 'ie8'})) /* не знаю пока что это  */
        .pipe(gulp.dest("src/css"))   /* после компиляции отправляет код сюда */
        .pipe(browserSync.stream());  /* обновляет страницу после внесения изменений */
});

gulp.task('watch', function() {                 /* для отслеживания изменений */
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles')); /* при изменениях сохранит и запустит styles */
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));  /* запуск всех команд параллельно при введение gulp  в терминал */