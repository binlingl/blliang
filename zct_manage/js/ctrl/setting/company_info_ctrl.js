define(["app", "directives/sidebar/sidebar","directives/cascade/cascade", 'api/setting_api',], function (myapp) {
    myapp.controller('company_info_ctrl',
        ['$scope', 'setting_api', function (s, setting_api) {
            //  console.log('company_manage_ctrl+++企业资料管理');
            s.company_item = {};

            s.update_company = function () {
                var form_obj = {
                    address: s.company_item.address,
                    address_data: s.area_address,
                    contacts: s.company_item.contacts,
                    id: s.company_item.id,
                    name: s.company_item.name,
                    phone: s.company_item.phone,
                    type: s.company_item.type,
                }
                console.log(form_obj);
                setting_api.company_infor_update(form_obj).success(function (data) {
                    console.log(data);
                    s.information_show = true;
                    s.edit_show = false;
                    getCompanyInfor();
                }).error(function (data) {
                    console.log(data);
                })

            }
            var getCompanyInfor = function () {
                setting_api.getInfor().success(function (data) {
                    console.log('企业信息');
                    s.company_item = data.data;
                    console.log(s.company_item);
                })
                    .error(function () {
                        console.log('调取失败');
                    });
            }
            getCompanyInfor();
            //控制展示页和编辑页的显示与否
            s.information_show = true;
            s.edit_show = false;
            s.infor_edit = function () {
                s.information_show = false;
                s.edit_show = true;
            }
            s.edit_cancel = function () {
                s.information_show = false;
                s.edit_show = true;
            }

            //获取地址
            s.area_address=[];
            var get_area = function () {
                setting_api.getArea().success(function (data) {
                    s.area_list = data.data;
                })
            }
            get_area();

        }]);

});
