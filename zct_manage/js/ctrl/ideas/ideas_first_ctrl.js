//创意界面的权限控制器
define(["app",'services/zct_get_my_right','directives/tab/tab'], function (myapp) {
    myapp.controller('ideas_first_ctrl',
        ['$scope','$rootScope','$state','get_my_right', function (s,rs,$state,getRight) {
            console.log("this is ideas_first_ctrl");
            var my_right=getRight.get_right(localStorage.permission);
            console.log(my_right);
            s.idea_tab=[
                {name:"全部创意",state:"home.ideas.allIdeas"},
                {name:"我的创意",state:"home.ideas.myIdeas"},
                {name:"待审批",state:"home.ideas.appr_list"},
                {name:"已审批",state:"home.ideas.approval"},
            ];
        }])
});
