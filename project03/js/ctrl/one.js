/**
 * Created by admin on 2017/5/4.
 */
define(["angular","ui-router","ng-bootstrap",function(angular){
  var myModule = angular("myApp",[]);
    myModule.directive("thisDirective",[function(){
        return {
            restrict:'E',
            scope:{
                dataitem:"=",
                option:"="
            },
            templateUrl:'../html/this.html',
            link:function(scope,element,attrs){


            }
        }
    }])
}])