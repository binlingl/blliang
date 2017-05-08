define(["app",'services/permission','api/setting_api','services/zct_get_my_right'], function (myapp) {
    myapp.controller('home_home_ctrl',
        ['$scope','$rootScope','$state','permission','setting_api','get_my_right','$location',
            function (s,$rootScope,$state,permission,setting_api,get_my_right,$location)
            {
                s.ngv_highlight='idea';
            console.log('home_home_ctrl');
                var l_url=$location.$$url;
                if(l_url.indexOf('idea')) s.ngv_highlight='idea';
                else if(l_url.indexOf('patent')) s.ngv_highlight='patent';
                console.log($location.$$url);
                s.idea_back=true;
                s.proposal_back=false;
                s.setting_back=false;
                s.patent_back=false;
                if(l_url.indexOf('ideas')>-1||l_url.indexOf('Ideas')>-1){
                    s.idea_back=true;
                    console.log('ideas')
                    s.proposal_back=false;
                    s.setting_back=false;
                   s.patent_back=false;
                }else if(l_url.indexOf('patent')>-1||l_url.indexOf('costmanage')>-1){
                    s.idea_back=false;
                    console.log('patent')
                    s.patent_back=true;
                    s.setting_back=false;
                    s.proposal_back=false;
                }else if(l_url.indexOf('proposal')>-1){
                    s.idea_back=false;
                    console.log('proposal')
                    s.proposal_back=true;
                    s.setting_back=false;
                    s.patent_back=false;
                }else if(l_url.indexOf('setting')>-1){
                    s.idea_back=false;
                    console.log('setting')
                    s.proposal_back=false;
                    s.patent_back=false;
                    s.setting_back=true;
                }
            permission.get_permission();
            var my_right=get_my_right.get_right(localStorage.permission);

            console.log(my_right);


            $rootScope.$on('$stateChangeStart',function(even,toState){
                console.log('执行了');
                if(toState.name.indexOf('ideas')>-1||toState.name.indexOf('Ideas')>-1){
                    s.idea_back=true;
                    console.log('ideas')
                    s.proposal_back=false;
                   s.setting_back=false;
                    s.patent_back=false;
                }else if(toState.name.indexOf('patent')>-1||toState.name.indexOf('costmanage')>-1){

                    s.idea_back=false;
                    console.log('patent')
                    s.patent_back=true;
                    s.setting_back=false;
                    s.proposal_back=false;
                }else if(toState.name.indexOf('proposal')>-1){
                    s.idea_back=false;
                    s.tom=2;
                    console.log('proposal')
                    s.proposal_back=true;
                    s.setting_back=false;
                    s.patent_back=false;

                }else if(toState.name.indexOf('setting')>-1){
                    s.idea_back=false;
                    console.log('setting')
                    s.proposal_back=false;
                    s.patent_back=false;
                    s.setting_back=true;
                }
            });


            if(my_right.ideas.view){//说明此用户有查看全部创意的权限的
                // $state.go("home.ideas.allIdeas",{user_right:JSON.stringify(idea_right)});
                s.can_see_all_proposal=true;
                s.can_see_my_proposal=false;
            }
            else{//此用户没有查看全部创意的权限
                //$state.go("home.ideas.myIdeas",{user_right:JSON.stringify(idea_right)});
                s.can_see_all_idea=false;
                s.can_see_my_idea=true;

                s.can_see_all_proposal=false;
                s.can_see_my_proposal=true;
            }
            var get_user_infor = function () {
                setting_api.getUserInfor().
                    success(function (data) {
                        console.log(data);
                        s.person_item=data.data;
                    })
            }
            get_user_infor();

//home页面的“创意”两个字的的点击
            my_right.ideas.view?s.can_see_all_idea=true:s.can_see_all_idea=false;
            s.go_idea_page=function(){
                s.can_see_all_idea?$state.go("home.ideas.allIdeas"):$state.go("home.ideas.myIdeas");
            }
        }]);
});
