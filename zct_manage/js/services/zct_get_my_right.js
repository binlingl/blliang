define(['app','jquery'], function (myapp) {
    myapp.factory('get_my_right', [function () {
        console.log("get_my_right");
        var get_my_right={};
        //得到用户的权限
        get_my_right.get_right=function(obj){
             return(JSON.parse(JSON.parse(obj)));
        }
      return get_my_right;
    }])
})