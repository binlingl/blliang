define(["app", "directives/sidebar/sidebar", 'api/setting_api', 'lodash','services/myalert/myalert',"directives/table/table",], function (myapp) {
    myapp.controller('company_manage_ctrl',
        ['$scope', 'setting_api','$state','myalert', function (s, setting_api,$state,myalert) {
            console.log('company_manage_ctrl');
            //控制侧边栏的显示与否
            s.add_user_show = false

            //控制选择场景
            s.choice_scene = true;
            s.closeThis = function(){
                s.choice_scene = false;
            };

            s.add_user = function (id) {
                s.add_user_show = true;
                s.company_id=id;
                console.log(s.add_user_show);
                get_company_users(id);
            }
            s.bar_cancel = function () {
                s.add_user_show = false;
            }
            /*get company list*/

            s.asd=[];
            s.qwe={
                title:[
                    {name:'序号',key:'order',wid:'128'},
                    {name:'企业名称',key:'name',wid:'419'},
                    {name:'状态',key:'operateStatus',wid:'195'},
                    {name:'角色',key:'roleName',wid:'196'},
                    {name:'企业管理员',key:'companyAdmin',wid:'183'},
                    {name:'操作',key:'departmentname',wid:'200'},
                ]
            };
            var getCompanyList = function () {
                var company_obj = {
                    id: "",
                    name: ""
                };
                setting_api.getCompanyList(company_obj).success(function (data) {
                    console.log(data);
                    /* var obj = JSON.parse(data);*/
                    s.item = data.data;

                    for(var i=0;i< s.item.length;i++){
                        s.item[i].order=i+1;
                    }
                    s.asd=s.item;
                    if(s.item.length==0){
                        s.nothing=true
                    }
                })
            };
            getCompanyList();

            //推出企業
            s.quit_company = function (id) {
                var form_data = {
                    id: id
                }
                setting_api.quitCompany(form_data).success(function (data) {
                    console.log(data);
                    getCompanyList();
                    myalert.alert('',data.msg,function(){})
                })
                    .error(function () {
                        console.log('调取失败');
                    });
            }
            //取消申请
            s.cancel_apply = function (id) {
                var form_data = {
                    id: id
                }
                setting_api.cancelApply(form_data).success(function (data) {
                    console.log(data);
                    getCompanyList();
                    myalert.alert('',data.msg,function(){})
                })
                    .error(function () {
                        console.log('调取失败');
                    });
            }
            //获取准管理员列表
            var get_company_users = function (id) {
                var form_data={
                    id:id
                }
                setting_api.getCompanyUsers(form_data)
                    .success(function (data) {
                        console.log('获取准管理员列表')
                        s.user_data = data.data;
                        s.user_data.forEach(function (item) {
                            item.isSlected = false;
                        });
                        //s.user_data.isSelected=false;
                        console.log(s.user_data);
                    })
                    .error(function () {
                        console.log('调取失败');
                    })

            }



            //是否选中的效果

            s.is_selected = function (p_item) {
                _.each(s.user_data, function (item) {
                    if (item.id == p_item.id) {
                        item.isSlected = !p_item.isSlected;
                    }else{
                        item.isSlected=false;
                    }
                    if(item.isSlected){
                        s.trans_user_id=item.id;
                    }
                    console.log(item);
                });
                console.log(s.user_data);
            }

            //转让管理员
            s.transfer_manager = function () {
                var form_data = {
                    companyId: s.company_id,
                    companyUserId: s.trans_user_id
                }
                setting_api.transferAdmin(form_data)
                    .success(function (data) {
                        console.log(data);
                        s.add_user_show = false;//侧边框消失
                        getCompanyList();//重新刷新数据
                        myalert.alert('',data.msg,function(){})
                    })
                    .error(function () {
                        console.log('调取失败');
                    })

            }
        }])
});
