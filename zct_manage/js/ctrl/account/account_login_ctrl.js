/**
 * Created by panda on 2017/3/15.
 */
define(["app",'services/zctlocal_storage','api/account_api','services/myalert/myalert','api/scene_api','services/common','services/setting'], function (myapp) {
    myapp.controller('account_login_ctrl', ['$scope','account_api','zctlocal','$state','myalert','scene_api','common','setting',
        function (s,account_api,zctlocal,$state,myalert,scene_api,common,setting) {
        console.log('account_login_ctrl');

            console.log('account_login_ctrl');
            s.form_obj={};
            s.account_login=function () {
                var form_obj={
                    PassWord: s.form_obj.PassWord,
                    Phone: s.form_obj.Phone
                }
                account_api.login(form_obj).success(function (data) {
                    console.log(data);
                    if(data.data.login_state=='false'){
                        myalert.content('温馨提示！',data.data.login_msg);
                        return;
                    }

                    common.delCookie(setting.cookies.user.session);
                    common.setCookie(setting.cookies.user.session,data.data.client_session);
                    zctlocal.setlocal('loginData',data.data)
                    $state.go('scene.choice');
                }).error(function (data) {
                    console.log(data);
                })
            }
        }]);
});
