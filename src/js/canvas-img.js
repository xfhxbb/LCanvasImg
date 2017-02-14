/*
 * LCanvasImg图像文字合成插件
 * 
 * 作者：黄磊
 * 
 * 报告漏洞，意见或建议, 请联系邮箱：xfhxbb@yeah.net
 * 
 * 创建于：2017年2月13日
 * 
 * Copyright 2017
 *
 * 获得使用本类库的许可, 您必须保留著作权声明信息。
 *
 */
(function() {
    window.LCanvasImg = function(params) {
        var _self = this;
        _self.params = {
            cw: window.innerWidth,
            ch: window.innerHeight,
            iw: '100%',
            ih: 'auto',
            display: 'none'
        }
        for (var param in params) {
            _self.params[param] = params[param];
        }
        _self.init();
    }
    LCanvasImg.prototype = {
        init: function() {
            var LCanvasImg_canvas = document.querySelector('#LCanvasImg_canvas');
            if (LCanvasImg_canvas) {
                LCanvasImg_canvas.width = this.params.cw;
                LCanvasImg_canvas.height = this.params.ch;
                LCanvasImg_canvas.style.display = this.params.display;
                this.canvas = LCanvasImg_canvas;
            } else {
                var canvas = document.createElement('canvas');
                canvas.id = 'LCanvasImg_canvas';
                canvas.width = this.params.cw;
                canvas.height = this.params.ch;
                canvas.style.display = this.params.display;
                document.body.appendChild(canvas);
                this.canvas = canvas;
            }
            this.clear();
        },
        clear: function() {
            var _self = this;
            var canvas = _self.canvas;
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
        load: function(arr, callback) {
            var _self = this;
            var body = document.querySelector('body');
            body.addEventListener('complete', function() {
                callback();
                console.log('complete');
            });
            //var increment = Math.floor(100 / arr.length);//将进度分成几份
            var i = 1;
            arr.forEach(function(obj, index, array) {
                function onLoad() {
                    _self[obj.name] = img;
                    if (i < array.length) {
                        ++i;
                    } else {
                        var evt;
                        try {
                            evt = new CustomEvent('complete');
                        } catch (e) {
                            //兼容旧浏览器(注意：该方法已从最新的web标准中删除)
                            evt = document.createEvent('Event');
                            evt.initEvent('complete', true, true);
                        }
                        body.dispatchEvent(evt);
                    };
                }
                var img = new Image();
                img.onload = onLoad;
                img.onerror = onLoad;
                img.src = obj.src;
            });
        },
        addFont: function(obj) {
            var _self = this;
            var canvas = _self.canvas;
            var ctx = canvas.getContext("2d");
            ctx.font = obj.fontsize + "px " + obj.fontfamily; //文字的字体大小和字体系列
            var ftop = obj.ftop; //文字top
            var fleft = obj.fleft; //文字left
            ctx.textBaseline = "top"; //设置绘制文本时的文本基线。
            ctx.fillText(obj.txt, fleft, ftop);
            ctx.lineWidth = 1;
            ctx.fillStyle = "#000";
            ctx.strokeStyle = "rgba(255,255,255,0.4)";
            ctx.strokeText(obj.txt, fleft, ftop);
        },
        addImg: function(obj, callback) {
            var _self = this;
            var canvas = _self.canvas;
            var ctx = canvas.getContext("2d");
            if (obj.hasOwnProperty('sx') && obj.hasOwnProperty('sy') && obj.hasOwnProperty('sw') && obj.hasOwnProperty('sh') && obj.hasOwnProperty('x') && obj.hasOwnProperty('y') && obj.hasOwnProperty('width') && obj.hasOwnProperty('height')) {
                ctx.drawImage(_self[obj.name], obj.sx, obj.sy, obj.sw, obj.sh, obj.x, obj.y, obj.width, obj.height);
            } else if (obj.hasOwnProperty('x') && obj.hasOwnProperty('y') && obj.hasOwnProperty('width') && obj.hasOwnProperty('height')) {
                ctx.drawImage(_self[obj.name], obj.x, obj.y, obj.width, obj.height);
            } else if (obj.hasOwnProperty('x') && obj.hasOwnProperty('y')) {
                ctx.drawImage(_self[obj.name], obj.x, obj.y);
            } else {
                ctx.drawImage(_self[obj.name], 0, 0);
            }
            _self.showImg();
        },
        showImg: function() {
            var _self = this;
            var canvas = _self.canvas;
            var LCanvasImg_img = document.querySelector('#LCanvasImg_img');
            if (LCanvasImg_img) {
                LCanvasImg_img.style.width = _self.params.iw;
                LCanvasImg_img.style.height = _self.params.ih;
                LCanvasImg_img.src = canvas.toDataURL();
            } else {
                var img = new Image();
                img.id = 'LCanvasImg_img';
                img.style.width = _self.params.iw;
                img.style.height = _self.params.ih;
                img.src = canvas.toDataURL();
                document.body.appendChild(img);
            }
        }
    }
})();
