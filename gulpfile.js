(function() {
    'use strict';
    //导入工具包 require('node_modules里对应模块')
    var gulp = require('gulp');

    /*======= 监视文件改动并重新载入 ======*/
    var browserSync = require('browser-sync');
    var reload = browserSync.reload;

    /*======= 压缩重命名 ======*/
    var rename = require('gulp-rename');
    var uglify = require('gulp-uglify');

    /*======= 合并文件 ======*/
    var concat = require('gulp-concat');

    /*======= 增加文件头尾 ======*/
    var header = require('gulp-header');
    var pkg = require('./package.json');
    var date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

    var banner = [
        '/**',
        ' * <%= pkg.name %><%= pkg.description %>',
        ' * ',
        ' * version:<%= pkg.version %>',
        ' * ',
        ' * author:<%= pkg.author %>',
        ' * ',
        ' * <%= pkg.repository.type %>:<%= pkg.repository.url %>',
        ' * ',
        ' * 报告漏洞，意见或建议, 请联系邮箱：xfhxbb@yeah.net',
        ' * ',
        ' * Copyright 2016',
        ' * ',
        ' * Licensed under <%= pkg.license %>',
        ' * ',
        ' * 获得使用本类库的许可, 您必须保留著作权声明信息',
        ' * ',
        ' * 最近修改于： <%= date %>',
        ' */',
        ''
    ].join('\n')

    /*======= html ======*/
    gulp.task('html', function() {
        return gulp.src(['./src/html/**/*'])
            .pipe(gulp.dest('./dist/html'))
    });
    /*======= img ======*/
    gulp.task('img', function() {
        return gulp.src(['./src/img/**/*'])
            .pipe(gulp.dest('./dist/img'))
    });
    /*======= fonts ======*/
    gulp.task('fonts', function() {
        return gulp.src(['./src/fonts/**/*'])
            .pipe(gulp.dest('./dist/fonts'))
    });
    /*======= html ======*/
    gulp.task('lib', function() {
        return gulp.src(['./src/lib/**/*'])
            .pipe(gulp.dest('./dist/lib'))
    });
    /*======= 合并压缩js文件 ======*/
    gulp.task('js', function() {
        return gulp.src('./src/js/*.js')
            //.pipe(concat('canvas-img.js'))
            .pipe(gulp.dest('./dist/js'))
            .pipe(uglify())
            .pipe(header(banner, {
                pkg: pkg,
                date: date
            }))
            .pipe(rename({
                extname: '.min.js'
            }))
            .pipe(gulp.dest('./dist/js'));
    });
    /*======= 监视文件改动并重新载入 ======*/
    gulp.task('serve', ['html','img','fonts','lib','js'], function() {
        browserSync({
            server: {
                baseDir: 'dist'
            }
        });

        gulp.watch(['./src/html/*.html', './src/js/*.js'], {
            cwd: 'dist'
        }, reload);
        gulp.watch(['./src/html/**/*'], ['html']);
        gulp.watch(['./src/img/**/*'], ['img']);
        gulp.watch(['./src/fonts/**/*'], ['fonts']);
        gulp.watch(['./src/lib/**/*'], ['lib']);
        gulp.watch(['./src/js/*.js'], ['js']);
    });

    gulp.task('default', ['serve']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

})();
