/**
 * Created by admin on 2017/3/28.
 */
//define(["app",'api/proposal_api','services/myalert/myalert','services/zct_get_my_right'], function (myapp) {
//    myapp.controller('proposal_module_ctrl',
//        ['$scope','$state','$rootScope','proposal_api',function (s,$state,$rootScope,proposal_api) {
//
//        }]);
//
//});


//导航tab的切换
define(["app",'services/zct_get_my_right','directives/tab/tab'], function (myapp) {
    myapp.controller('proposal_module_ctrl',
        ['$scope','$state','$rootScope','get_my_right',function (s,$state,r,getRight) {
            console.log("这是提案的firstCtrl");
            var my_right=getRight.get_right(localStorage.permission);
            console.log(my_right);
            if(my_right.proposal.view){//说明此用户有查看全部提案的权限的
                // $state.go("home.ideas.allIdeas",{user_right:JSON.stringify(idea_right)});
                s.can_see_all_proposal=true;
                $state.go("home.proposal.list");
            }
            else{//此用户没有查看全部提案的权限
                //$state.go("home.ideas.myIdeas",{user_right:JSON.stringify(idea_right)});
                s.can_see_all_proposal=false;
                $state.go("home.proposal.my_list");
            }

//tab的切换样式
            s.proposal_tab_list=[
                {name:"提案管理",state:"home.proposal.list"},
                {name:"我的提案",state:"home.proposal.my_list"},
                {name:"待审批",state:"home.proposal.wait_process"},
                {name:"已审批",state:"home.proposal.processed"},
            ];
        }]);
});
