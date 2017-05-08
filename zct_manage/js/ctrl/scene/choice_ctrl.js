/**
 * Created by panda on 2017/3/20.
 */
define(["app", "api/scene_api", 'services/zctlocal_storage','services/myalert/myalert'], function (myapp) {
    myapp.controller("scene_choice_ctrl", ["$scope", "scene_api", 'zctlocal','myalert','$state',function (s, scene_api, zctlocal,myalert,$state) {
        s.company_count = 0;
        s.current_scene = 0;
        if (zctlocal.islocal('current_scene_clientid')) {
            s.current_scene = 1;
        }
        else {
            s.current_scene = 0;
        }
        s.choice = function (p_item) {
            //zctlocal.islocal('current_scene_clientid');
            zctlocal.removelocal('current_scene_clientid');
            zctlocal.setlocal('current_scene_clientid', p_item);
            var send_obj = {
                id: p_item.id
            };
            console.log(send_obj);
            scene_api.switchScene(send_obj).success(function (data) {
                if(data.state == "false"){
                    myalert.content(data.msg);
                }else{
                    $state.go("home.workspace",{status:1});
                }
            });
        };
        var getMyCompany = function () {
            scene_api.getMyCompanyList().success(function (data) {
                if (data.data) {
                    s.company_count = data.data.length;
                    console.log(s.company_count);
                    s.companys = data.data;
                } else {
                    s.company_count = 0;
                }
            })
        };
        getMyCompany();
    }])
})