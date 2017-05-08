define(["app", "directives/sidebar/sidebar", 'api/setting_api', 'directives/myfileuploder/myfileuploader', 'directives/showimg/showimg'], function (myapp) {
    myapp.controller('personal_ctrl', ['$scope', 'setting_api', function (s, setting_api) {
            console.log("this is personal_ctrl");
            s.appearance_show = true;
            s.appearance_edit = false;
            var get_user_infor = function () {
                setting_api.getUserInfor().
                    success(function (data) {
                        console.log(data);
                        s.person_item_show = data.data;
                        //s.person_item=data.data;
                    })
            }
            get_user_infor();

            s.uploadheadimg = function (fileds) {
                console.log(fileds);
                s.person_item.head_image = fileds[0];
            }
            s.edit_person = function () {
                s.appearance_show = false;
                s.appearance_edit = true;
                console.log(s.person_item);
                console.log(s.person_item_show)
                get_user_infor();
            }

            s.edit_myuser_infor = function (formobj) {
                if (formobj.$valid) {
                    var form_data = {
                        head_image: s.person_item.head_image,
                        id: s.person_item.id,
                        phone: s.person_item.phone,
                        realname: s.person_item.realname,
                        //roleid:s.person_item.roleid,
                        email: s.person_item.email
                    }
                   // console.log(s.person_item)
                    setting_api.editMyUserInfor(form_data).
                        success(function (data) {
                            console.log(typeof s.person_item.head_image);
                           // s.person_item=data.data;
                            get_user_infor();
                            s.appearance_show=true;
                            s.appearance_edit=false;
                        })
                } else {
                    console.log('信息填写有误');
                }

            }

        }]
    )
});
