define(['app','services/setting','services/http'], function (myapp) {
    myapp.factory('side_bar_api', ['setting', 'myhttp', function (setting, myhttp) {
        var api_url = setting.api_url;
        var myhttp = myhttp;
        var api = {
            get_all_user_list:function(data){//得到右侧弹框的用户信息
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetApprovalUser',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            }
        }
        return api;
    }])
})