/**
 * Created by admin on 2017/5/10.
 */
define(["app","directive/popup/popup"],function(myapp){
    myapp.controller("help_ctrl",["$scope",function($scope){
        $scope.formdata = {
            title:"用户登录",
            content:[
                {
                label:"登录名",
                type:"text"
                },
                {
                    label:"登录密码",
                    type:"password"
                },
                {
                    label:"性别",
                    type:"radio",
                    allvalue:[{typename:'sex',value:'female',showname:'女'},{typename:'sex',value:'male',showname:'男'}]
                },
                {
                    label:"兴趣爱好",
                    type:"checkbox",
                    allvalue:[{typename:'hobby',value:'sing',showname:'唱歌'},
                        {typename:'hobby',value:'dance',showname:'跳舞'},
                        {typename:'hobby',value:'run',showname:'跑步'}]
                }

            ]
        }

    }])
})
