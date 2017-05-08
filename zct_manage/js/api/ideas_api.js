define(['app', 'services/setting', 'services/http'], function (myapp) {
    myapp.factory('ideas_api', ['setting', 'myhttp', function (setting, myhttp) {
        var api_url = setting.api_url;
        var myhttp = myhttp;
        var api = {

            add_ideas:function(data){//添加创意
                return myhttp({
                    url: api_url + '/manage/ManageIdeas/AddIdea',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },

            remove_ideas:function(data){//删除创意
                return myhttp({
                    url: api_url + '/manage/ManageIdeas/DeleteIdea',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },

            get_idea_detail:function(data){//创意详情（根据id获得详情）
                return myhttp({
                    url:api_url+'/manage/ManageIdeas/GetIdeasDetails',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },

            edit_ideas:function(data){//创意的编辑
              return myhttp({
                  url:api_url+'/manage/ManageIdeas/EditIdea',
                  method: 'post',
                  type: 'json',
                  data: data
              });
            },

            get_wait_pass_list:function(data){//获得待审批的创意列表
                return myhttp({
                    url:api_url+'/manage/ManageIdeas/GetWaitIdeas',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },

            get_appr_list_detail:function(data){//获得创意待审批的详情
                return myhttp({
                    url:api_url+'/manage/ManageIdeas/GetApprovalIdeasDetails',
                    method: 'post',
                    type: 'json',
                    data: data
                });

            },

            give_approval:function(data){//创意的审批
                return myhttp({
                    url:api_url+'/manage/ManageIdeas/ApprovalIdea',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },

            get_has_pass_list:function(data){//获得已审批列表
                return myhttp({
                    url:api_url+'/manage/ManageIdeas/GetComplieIdeas',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },

            get_all_list:function(data){//有权限的获得所有创意
                return myhttp({
                    url:api_url+'/manage/ManageIdeas/GetAllIdeas',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },

            get_my_ideas_list:function(data){//无权限获得我的创意
                return myhttp({
                    url:api_url+'/manage/ManageIdeas/GetMyIdeas',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },

            get_user_info:function(data){//获取用户的信息
                return myhttp({
                    url:api_url+'/manage/ManageSetting/GetUserInfor',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },


        }
        return api;
    }]);

})