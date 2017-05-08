define(["app","jquery"],function(myapp){
    myapp.factory('translate_tags_format',['$filter',function($filter){
        console.log("translate_tags_format");
         return {
             translate_tag:function(obj,flag) {
                 if(flag){//列表页面（需要循环）
                     angular.forEach(obj, function (val, i) {
                         try {
                             if (val.idea.tags) {//如果存在tags
                                 val.idea.tags = JSON.parse(val.idea.tags); //将json字符串变为数组
                             }
                         }
                         catch (e) {//转化json字符串出错
                             console.log("无效数据，非json字符串",i);
                             console.log(val.idea.tags);
                             var tag=[];
                             tag[0]=val.idea.tags;
                             val.idea.tags=tag;
                         }
                     });
                 }
                else{//详情页面（不需要循环）
                     try {
                         if (obj.idea.tags) {//如果存在tags
                             obj.idea.tags = JSON.parse(obj.idea.tags); //将json字符串变为数组
                         }
                     }
                     catch (e) {//转化json字符串出错
                         console.log("无效数据，非json字符串");
                         console.log(obj.idea.tags);
                         var tag=[];
                         tag[0]=obj.idea.tags;
                         obj.idea.tags=tag;
                     }
                 }
             }
         }
    }]);
});