define(['app'],function (myapp) {

    myapp.filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);
    //用于过滤文字长度
    myapp.filter('limit_width', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';
            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            /*if (wordwise) {
             var lastspace = value.lastIndexOf(' ');
             if (lastspace != -1) {
             value = value.substr(0, lastspace);
             }
             }*/
            return value + (tail || ' …');
        };
    });

    //s.getImageID=function(fileid){//格式化tag
    //    if(!fileid) return "";
    //    if(fileid&&(fileid+"").indexOf('[')>=0&&(fileid+"").indexOf(']')>1){
    //        var filedData=JSON.parse(fileid);
    //        return filedData[0];
    //    }
    //    return "";
    //};


    myapp.filter("filter_array",function(){
        return function(fileid){
            if(!fileid) return "";
                if(fileid&&(fileid+"").indexOf('[')>=0&&(fileid+"").indexOf(']')>1){
                    var filedData=JSON.parse(fileid);
                    return filedData[0];
                }
                return "";
        }
    })

});