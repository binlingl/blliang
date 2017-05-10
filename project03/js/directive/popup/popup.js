/**
 * Created by admin on 2017/5/10.
 */


define(["app"],function(myapp){
    myapp.directive("showpopup",function(){
        return {
            restrict:'E',
            replace:true,
            scope:{
                data:"=",
                method:"&"
            },
            templateUrl:'js/directive/popup/popup.html',
            link:function(scope,element,attr){
                scope.abc = "abc";
                scope.cancel =function(){
                   
                }
            }

        }

})
})

