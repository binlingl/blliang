define(['app','services/setting','services/http'], function (myapp) {
    myapp.factory('permission_api', ['setting', 'myhttp', function (setting, myhttp) {
        var api_url = setting.api_url;
        var myhttp = myhttp;
        var api = {
            getUserPermission:function(){//得到右侧弹框的用户信息
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetUserPermission',
                    method: 'get',
                    type: 'json'
                });
            }
        }
        return api;
    }])
})