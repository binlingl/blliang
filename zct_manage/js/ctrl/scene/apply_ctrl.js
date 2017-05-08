/**
 * Created by admin on 2017/3/17.
 */
define(["app", "directives/sidebar/sidebar", "api/scene_api", 'services/myalert/myalert'], function (myapp) {
    myapp.controller("scene_apply_ctrl", ['$scope', "scene_api", 'myalert', function (s, scene_api, myalert) {
        s.exist = 0;//一开始进入的状态
        /*搜索企业时获取企业列表*/
        /*搜索企业时获取企业列表*/
        s.getCompanyList = function () {
            if (s.name) {
                scene_api.getCompanyList(s.name).success(function (data) {
                    if (data.data == '') {
                        s.exist = 2;//没有搜索到企业的时候
                    } else {
                        console.log(data);
                        /*var obj = JSON.parse(data);*/
                        s.item = data.data;
                        s.exist = 1;//当搜索到企业了的时候
                    }
                }).error(function () {
                    s.exist = 2;//没有搜索到企业的时候
                });
            } else {
                s.exist = 3;
            }
        };
        /*当点击企业列表中“申请加入”时*/
        s.applyCompany = function (id) {
            scene_api.applyCompany(id).success(function (data) {
               if (data.state = "true") {
                    s.item.forEach(function (p_item) {
                        if (id == p_item.id) {
                            p_item.status = "1";
                            return;
                        }
                    });
                }else {
                    myalert.content(data.msg);
                }
            }).error(function (error) {
                console.log(error);
            });
        }
    }]);
});
