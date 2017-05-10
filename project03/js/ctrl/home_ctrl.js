/**
 * Created by admin on 2017/5/8.
 */
define(["app",
    "ctrl/help_ctrl"
],function(myapp){
    myapp.controller("home_ctrl",["$scope",function($scope){
        $scope.formlist = {
            title:"用户注册",
            content:[
                {
                    label:"设置登录名",
                    type:"text"
                },
                {
                    label:"设置登录密码",
                    type:"password"
                },
                {
                    label:"选择性别",
                    type:"radio",
                    allvalue:[{typename:'sex',value:'female',showname:'女'},{typename:'sex',value:'male',showname:'男'}]
                },
                {
                    label:"设置邮箱",
                    type:"email"
                },
                {
                    label:"联系电话",
                    type:"text"
                }


            ]
        };
    }])
});
