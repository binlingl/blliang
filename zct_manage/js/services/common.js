define(['app','services/setting'], function (myapp) {
    myapp.factory('common', ['setting','$q', function (setting,$q) {


        var common = {};
        
        common.promise = function (myfunc) {
            var promise;
            promise = $q(myfunc);
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn) {
                return promise["catch"](fn);
            };
            return promise;
        };
        
        common.scrollToEle = function (css) {
            var first = $(css);
            var firstTop = first.offset().top;
            var bd = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            bd.animate({scrollTop: firstTop}, 500);
        };

        common.log = function (message, environments) {
            if (_.contains(environments, environment.name)) {
                console.log(message);
            }
        };

        common.GetRandomNum = function (Min, Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
        };

        common.dateToNormalText = function (date) {
            var normalFormat = "yyyy-MM-dd hh:mm:ss";
            return common.dateFormat(normalFormat, date);
        };

        common.dateFormat = function (fmt, date) {
            if (!_.isDate(date)) {
                return date
            } else {
                //author: meizz
                var o = {
                    "M+": date.getMonth() + 1,                 //月份
                    "d+": date.getDate(),                    //日
                    "h+": date.getHours(),                   //小时
                    "m+": date.getMinutes(),                 //分
                    "s+": date.getSeconds(),                 //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds()             //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        };
        common.str2Date = function (str) {
            return new Date(str);
        };

        common.is_exist = function (arg) {
            if (typeof(arg) == "undefined" || typeof(arg) == "null" || arg == null || arg == undefined) {
                return false;
            } else {
                return true;
            }
        };

        common.setCookie = function (name, value) {
           
            document.cookie = name + "=" + value + ";path=/"+";domain="+document.domain;
            //document.cookie = name + "=" + value;
        };

        common.setCookieWithParams = function (name, value, expires) {
            var date = new Date();
            date.setTime(date.getTime() + expires);
            document.cookie = name + "=" + value + ";path=/; expires=" + date.toGMTString();
        };

        common.getCookie = function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        };

        common.delCookie = function (name) {//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
            var date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = name + "=a;path=/;domain="+document.domain+";expires=" + date.toGMTString();
        };

        common.jsonIntoUrlParam = function (url, json) {
            var params = [];
            _.each(json, function (value, key) {
                params.push(key + "=" + value);
            });
            console.log(url.indexOf('?') !== -1);

            if (params.length == 0) {
                return url;
            } else if (url.indexOf('?') !== -1) {
                return url + "&" + params.join("&");
            } else {
                return url + "?" + params.join("&");
            }
        };

        common.setJsonToSessionStorage = function (key, value) {
            sessionStorage.setItem(key, JSON.stringify(value));
        };

        common.getJsonFromSessionStorage = function (key) {
            return JSON.parse(sessionStorage.getItem(key))
        };

        common.setSessionStorage = function (key, value) {

        };

        common.getSessionStorage = function (key) {

        };

        common.str2Json = function (str) {
            try {
                return JSON.parse(str);
            } catch (e) {

            }

        };

        common.json2Str = function (json) {
            return JSON.stringify(json);
        };

        common.new_activity = function () {
            window.open("/full_platform/#/about/news");
        };

        common.logo_str2array = function (str) {
            try {
                if (str != null && str != undefined) {
                    return JSON.parse(str)[0];
                } else {
                    return str;
                }
            } catch (e) {
                return str;
            }
        };
        //显示图片
        common.arrayToStr = function (value) {
            try {
                if (value != null && value != "") {
                    return JSON.parse(value)[0];
                } else {
                    return value;
                }
            } catch (e) {
                return value;
            }
        }

        common.CheckMail = function (mail) {
            //var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var filter =/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;

            if (/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(mail)) {
                return true;
            }
            else {
                return false;
            }
        };

        common.isLogin = function () {
            if (common.getCookie(setting.client_session_cookie)) {
                return true;
            } else {
                return false;
            }
        };

        common.isBackendUser = function () {
            console.log(config.user_type_cookie);
            if (common.getCookie(config.user_type_cookie) == config.user_type.backenduser) {
                return true;
            } else {
                return false;
            }
        };

        common.removeLoginInfo = function () {
            common.delCookie(setting.client_session_cookie);
            common.delCookie(setting.username_cookie);
            common.delCookie(setting.user_type_cookie);
        };

        common.is_p_service_data_ok = function (s) {
            if (s.service_type && s.service_type.length > 20) {
                return true;
            } else {
                return false;
            }
        };

        common.get_service_name_by_no = function (service_type, no) {
            var tempa = _.filter(service_type, function (object) {
                return object.l_no == no;
            });
            if (tempa.length > 0) {
                return tempa[0].l_name;
            } else {
                return "";
            }
        };

        common.getParentServiceNameByNo = function (no) {
            switch (no) {
                case config.pservice.service_type.patent:
                    return "专利服务";
                case config.pservice.service_type.trademark:
                    return "商标服务";
                default :
                    return "服务";
            }
        };

        common.get_service_type_by_name = function (service_type, service_name) {
            for (index in service_type) {
                if (service_type[index].l_name == service_name) {
                    return service_type[index];
                }
            }
        };

        common.is_patent_service = function (service_type, no) {
            var evens = _.filter(service_type, function (object) {
                return object.l_no == no
            });
            return (evens.length > 0 && evens[0].l_pno == 1);
        };

        common.is_trademark_service = function (service_type, no) {
            var evens = _.filter(service_type, function (object) {
                return object.l_no == no
            });
            return (evens.length > 0 && evens[0].l_pno == 2);
        };

        //根据id,返回图片链接
        common.get_img_url = function (id) {
            return config.api_url + '/api/file/download_img/' + id;
        };

        //banner跳转
        common.change_banner = function (t) {
            console.log(t);
            window.open(t);
            //if(t==1){
            //    window.location.href="http://niufawang.com/";
            //} else if(t==2){
            //    window.location.href="http://training.ciptc.org.cn/index.shtml";
            //} else{
            //    window.location.href="http://www.qihaoip.com/";
            //}
            console.log(1);
        }
        //$(".banner").click(function(){
        //    console.log(1);
        //});
        //根据id,返回图片链接
        common.getStorageByName = function (name) {
            return localStorage.getItem(name);
        };

        common.check_html_lable = function (htmlStr) {
            //var  reg = /<[^>]+>/g;
            var reg=/<(img|h\d|span|form|div|label|input|button|textarea|style|meta|ul|li|table|tr|td|th|tbody|thead|iframe|select|option|p)+[^>]+>/g;
            return reg.test(htmlStr);
        }

        //从"data/dic.json"获取文件类型
        //typStr多个的时候用逗号‘，’隔开
        common.getMimeTypes=function(typeStr){
            //文件对应的mime types类型
            var mimeStr="";
            var typeAry=typeStr.split(',');
            var dicData = localStorage.getItem('dic');
            dicData && (dicData = JSON.parse(dicData));

            //获取存储的所有mime types类型
            var mimeTypesData=dicData.mime_types;
            _.forEach(typeAry,function(mimeItem){
                _.forEach(mimeTypesData,function(dicItem){
                    if(dicItem.name==mimeItem){
                        mimeStr=mimeStr+dicItem.value+",";
                        return;
                    }
                });
            });
            if(mimeStr!=""){
                var lastStr=mimeStr.substr(mimeStr.length-1,1);
                if(lastStr==','){
                    mimeStr=mimeStr.substr(0,mimeStr.length-1);
                }
            }
            return mimeStr;
        }

        common.getImageID=function(fileid){
            if(!fileid) return "";
            if(fileid&&(fileid+"").indexOf('[')>=0&&(fileid+"").indexOf(']')>1){
                var filedData=JSON.parse(fileid);
                return filedData[0];
            }
            return "";
        };
        return common;
    }]);
});

