# 更新日志

## LCanvasImg 1.1.0 - 修改于2017年2月16日
* 为避免重复执行，将showImg方法提出，由自动运行改为开发者自由控制运行时机

```
...
        canvasImg.addImg({
            name: 'qr',
            x: 400,
            y: 800,
            width: 200,
            height: 200
        });
        canvasImg.showImg();
...
```
* 增加itype、iquality两个参数控制输出图片类型和压缩比
```
...
       var canvasImg = new LCanvasImg({
            itype:'image/jpeg',//output img type [image/png,image/jpeg,image/webp]
            iquality:0.52,////压缩比 默认0.1  范围0.1-1.0 越小压缩率越大
        });
...
```
