/**
 * Created by admin on 2017/5/8.
 */
define(["app",
    "ctrl/help_ctrl"
],function(myapp){
    myapp.controller("home_ctrl",["$scope",function($scope){
        $scope.formlist = {
            title:"�û�ע��",
            content:[
                {
                    label:"���õ�¼��",
                    type:"text"
                },
                {
                    label:"���õ�¼����",
                    type:"password"
                },
                {
                    label:"ѡ���Ա�",
                    type:"radio",
                    allvalue:[{typename:'sex',value:'female',showname:'Ů'},{typename:'sex',value:'male',showname:'��'}]
                },
                {
                    label:"��������",
                    type:"email"
                },
                {
                    label:"��ϵ�绰",
                    type:"text"
                }


            ]
        };
    }])
});
