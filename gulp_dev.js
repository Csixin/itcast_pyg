console.log('这是开发环境');
// 1. 先删除旧的文件 del
// 2. 要编译less文件  gulp-less
// 3. 要给css添加对应的浏览器前缀  gulp-autoprefixer
// 4. 要生成样式文件的同时也顺便生成map文件，js文件也是有map文件  gulp-sourcemaps
// 5. 将es6的语法编译成 es5语法 gulp-babel
// 7. 要实现标签文件的组件化功能 gulp-file-include
// 8. 要实现自动打开浏览器和自动根据文件的改变去刷新浏览器 browser-sync
// 10. 复制第三方的插件资源到 dist目录下   gulp.src  gulp.dest
const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync');

//删除任务
gulp.task("del", () => {
    return del(["./dist"]);
});

//处理css任务
gulp.task('css', () => {
    return (
        gulp
        .src("./src/css/*.less")
        //生成文件前先记下less的样子
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        //和css文件同层级顺带生成一个map文件
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./dist/css/"))
    );
});

//处理js任务
gulp.task('js', () => {
    return (
        gulp
        .src("./src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./dist/js/"))
    );
});

//处理html任务
gulp.task('html', () => {
    return (
        gulp
        .src("src/*.html")
        .pipe(
            fileInclude({
                prefix: "@@",
                basepath: "src/components/",
            })
        )
        .pipe(gulp.dest("dist/"))
    );
});

//处理lib第三方插件任务
gulp.task('lib', () => {
    return gulp.src("./src/lib/**")
        .pipe(gulp.dest("./dist/lib/"));
});

//自动打开浏览器和监听文件改变 刷新浏览器
gulp.task('autoPage', () => {
    browserSync({
        server: {
            baseDir: "./dist/"
        },
        port: 9999,
        notify: false
    });
    // 监听html文件的改变 从而重新执行 html 任务   刷新浏览器
    gulp.watch(["src/*.html", "src/components/*.html"], gulp.series(["html", "reload"]));
    // 监听 less文件， 重新执行 css 任务  刷新浏览器
    gulp.watch(["src/css/*.less"], gulp.series(["css", "reload"]));
    // 监听 js文件， 重新执行 js 任务  刷新浏览器
    gulp.watch(["src/js/*.js"], gulp.series(["js", "reload"]));
});

gulp.task("reload",(done)=>{
    browserSync.reload();
    done();
  });

  //定义默认任务
  gulp.task('default',gulp.series(["del","css","js","html","lib","autoPage"]));