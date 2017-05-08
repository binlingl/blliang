define(['app','services/common','services/setting'],function (myapp) {
    myapp.directive('showimg', ['common', 'setting', function (common, config) {
        return {
            scope: {showimg: '=', foralt: '='},
            template: '<div class="imgp_ my-center vertical-center" ><img alt="{{foralt}}"/></div>',
            link: function (s, ele, attrs) {
                var default_img = attrs.default || "/image/default.png";
                console.log("ffg*******************");
                console.log(default_img);
                var ele1 = $(ele);
                ele1.css("visibility", "hidden");
                var function_ele = function (ele1, cc) {
                    var ph = ele1.height();
                    var pw = ele1.width();
                    var blp = ph / pw;
                    var blc = cc.height / cc.width;
                    if (ph != 0 && pw != 0) {
                        ele1.find('.imgp_').css("height", ph + "px");
                        ele1.find('.imgp_').css("width", pw + 'px');
                        if (blc > blp) {
                            ele1.find('.imgp_ img').css("height", "100%");
                        } else {
                            ele1.find('.imgp_ img').css("width", "100%");
                        }
                    }
                }

                s.$watch('showimg', function (newv) {
                    var cc = new Image();
                    cc.onerror = function () {
                        ele1.find('.imgp_ img').attr('src', default_img);
                        var dimg = new Image();
                        dimg.onload = function () {
                            function_ele(ele1, dimg);
                            ele1.css("visibility", "visible");
                        }
                        dimg.src = default_img;

                    }

                    cc.onload = function () {
                        var imgdom = ele1.find('.imgp_ img')[0];
                        if (imgdom) {
                            imgdom.onload = function () {
                                function_ele(ele1, cc);
                                ele1.css("visibility", "visible");
                            };
                            imgdom.src = config.api_url + '/api/file/download_img/' + newv;
                        }else{
                            console.log();
                        }
                        //先获取父容器的宽高
                    }

                    cc.src = config.api_url + '/api/file/download_img/' + newv;
                });
            }
        }
    }]);

//该指令只对img标签生效
    myapp.directive('showimgp', ['common', 'setting', function (common, config) {
        var function_ele = function (ele1, cc) {
            var ele = $(ele1);
            //先获取父容器的宽高
            var ph = ele.parent().height();
            var pw = ele.parent().width();
            var blp = ph / pw;
            var blc = cc.height / cc.width;
            if (ph < 10) {
                ph = 200;
            }
            if (pw < 10) {
                pw = 200
            }
            if (blc > blp) {
                //ele.css("height", "100%");
                ele.css("height", ph);
                ele.css("width", ph / blc);
            } else {
                //ele.css("width", "100%");
                ele.css('width', pw);
                ele.css("height", pw * blc);
            }
            ele.css("visibility", "visible");

        };

        var get_file_id_func = function (value) {
            try {
                if (angular.isUndefined(value) || value == "" || value == "undefined" || value == null) return "";
                if (value.indexOf('[') >= 0 && value.indexOf(']') > 1) return JSON.parse(value)[0];
                else return value;
            } catch (e) {
                console.log("图片异常");
                return "";
            }
        };

        return {
            scope: {showimgp: '='},
            link: function (s, ele, attrs) {
                s.$watch('showimgp', function (newv) {
                    var file_id = get_file_id_func(newv);
                    var default_img = attrs.default || "/image/default.png";
                    var default_head_img = "/image/default-head.png";
                    var cc = new Image();
                    ele.css("visibility", "hidden");
                    if (attrs.imgtype && attrs.imgtype == "head")
                        default_img = default_head_img;
                    console.log(default_img);
                    cc.onerror = function () {
                        var bb = new Image();
                        //此处注释了config.api_url 取数据 ，使用虚拟路径，
                        //config.api_url 问题：在本地调试的时候例如使用http//:localhost:8080无法获取图片
                        //ele.attr('src', config.api_url + '/image/default.png');

                        ele.attr('src', default_img);
                        bb.onload = function () {
                            function_ele(ele, bb);
                        }
                        //
                        //修改时间2016-09-23
                        //若修改不合理或者有疑问请联系panda
                        //此处注释了config.api_url 取数据 ，使用虚拟路径，
                        //config.api_url 问题：在本地调试的时候例如使用http//:localhost:8080无法获取图片
                        //
                        //bb.src = config.api_url + '/image/default.png';
                        bb.src = default_img;
                    }
                    cc.onload = function () {
                        var elej = $(ele)[0];
                        elej.onload = function () {
                            function_ele(ele, cc);
                        }
                        //
                        //修改时间2016-09-23
                        //若修改不合理或者有疑问请联系panda
                        //此处注释了没有判断的代码，加入了newv不存在的情况判断 ，修改时间2016-09-23,如有疑问请联系panda
                        //
                        //ele.attr('src', config.api_url + '/api/file/download_img/' + newv);
                        if (file_id == "")  ele.attr('src', default_img);
                        else ele.attr('src', config.api_url + '/api/file/download_img/' + file_id);

                    }

                    cc.src = config.api_url + '/api/file/download_img/' + file_id;
                    //此处加入了newv不存在的情况判断 ，修改时间2016-09-23 ,如有疑问请联系panda
                    //这个处理的非常好 张威
                    if (file_id == "")cc.src = default_img;
                })

            }
        }
    }]);

//用来解决圆形图片的问题，通过背景图片进行展示
    myapp.directive("showimgcircle", ['common', 'setting', function (common, config) {

        var is_null_empty = true;
        //var default_img = "/images/default.png";
        var default_img = "/images/default-head.png";
        var default_head_img = "/images/default-head.png";
        var arrayToStr = function (value) {
            var path = default_img;
            try {
                //console.log("value===="+value);
                if (value != null && value != "") {
                    //console.log(value.indexOf('['));
                    is_null_empty = false;
                    if (value.indexOf('[') != -1) {
                        path = '/api/file/download_img/' + JSON.parse(value)[0];
                    } else {
                        path = '/api/file/download_img/' + value;
                    }

                    return path;
                } else {
                    return path;
                }

            } catch (e) {
                console.log("图片异常");
                is_null_empty = true;
                return path;
            }
        };

        return {
            scope: {
                showimgcircle: '='
            },
            link: function (s, ele, attrs) {

                if (attrs.imgtype && attrs.imgtype == "head")
                    default_img = default_head_img;

                var nv = arrayToStr(s.showimgcircle);

                s.$watch('showimgcircle', function (newValue, oldValue) {
                    //console.log(arrayToStr(newValue)+"====="+arrayToStr(newValue));
                    var nv = arrayToStr(newValue);

                    if (is_null_empty) ele.css("background-image", "url(" + default_img + ")");
                    else ele.css("background-image", "url(" + config.api_url + nv + ")");
                    //console.log(config.api_url + nv);
                });
                console.log(s.showimgcircle);

                if (is_null_empty) ele.css("background-image", "url(" + default_img + ")");
                else ele.css("background-image", "url(" + config.api_url + nv + ")");
                ele.css("border-radius", "50%");
                ele.css("background-position", "center");
                ele.css("background-size", "cover");
            }
        }
    }]);

});