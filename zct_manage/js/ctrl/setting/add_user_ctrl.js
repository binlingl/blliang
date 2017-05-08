define(["app",
    "directives/sidebar/sidebar",
    'api/setting_api',
    'services/zctlocal_storage',
    'services/myalert/myalert',
    "directives/table/table",
        'directives/search_input/search_input'

    ],
    function (myapp) {
    myapp.controller('add_user_ctrl',
        ['$scope', 'setting_api','zctlocal','myalert','$uibModal', function (s, setting_api,zctlocal,myalert,$uibModal) {
            console.log('company_manage_ctrl');
            //权限控制
            s.permission = JSON.parse(zctlocal.getlocal('permission')).setting;

            //搜索框的指令
            function get_search_input(obj1,obj2){
                s.search_input=[
                    {
                        key_names:[
                            {
                                keyname:'姓名',
                                v:0,
                            }
                        ],
                        value_type:"input",
                    },
                    {
                        key_names:[
                            {
                                keyname:'角色',
                                v:1,
                                values:obj1,
                                //default_val:{name:'全部',v:0}
                            },
                            {
                                keyname:'部门',
                                v:2,
                                values:obj2,
                            },
                        ],
                        value_type:"single_name",
                    },
                    //{
                    //    key_names:[
                    //        {
                    //            keyname:'部门',
                    //            v:2,
                    //            values:obj2,
                    //        },
                    //    ],
                    //    value_type:"single_name",
                    //},
                ];
            }


            //已添加和待审核内容的切换
            s.tom = 'added';
            s.tab_change = function (str) {
                s.tom = str;
            }
            //控制侧边栏显示与否
            s.add_show = false;
            s.update_show = false;
            s.add_user = function () {
                //新增用户弹框
                var showModal = $uibModal.open({
                    animation:true,
                    templateUrl:'tpls/setting/add_user_popup.html',
                    controller:'add_user_popup_ctrl',
                    size:'sm',
                    resolve:{
                        item:function(){
                            return s.editingUser;
                        }
                    }
                });
                showModal.result.then(function(data){
                    s.editingUser = data;


                },function(data){
                    console.log(data);
                })

            }
            s.update_user = function (tmp) {//编辑用户信息,获取用户详情
                s.update_show = !s.update_show;
                s.editingUser = tmp;//正在编辑的用户
                var form_data = {
                    id: tmp
                }
                setting_api.getCompanyUserInfor(form_data)
                    .success(function (data) {
                        console.log(data)
                        s.company_user = data.data;
                    });
                //编辑弹框
                var showEditModal = $uibModal.open({
                    animation:true,
                    templateUrl:'tpls/setting/add_user_popup.html',
                    controller:'edit_user_popup_ctrl',
                    size:'sm',
                    resolve:{
                        item:function(){
                            return s.company_user;
                        }
                    }
                });
                showEditModal.result.then(function(data){
                    s.company_user = data;
                    s.edit_user_infor();
                },function(data){
                    console.log(data);
                })

            }
            s.bar_cancel = function () {//取消用户的编辑
                s.add_show = false;
                s.update_show = false;
            };

            s.save_user = function () {//编辑完成，保存信息


            };


            s.search_data = {
                departmentid: '0',
                realname: '',
                roleid: '0',
            };
            s.search_user = function () {//查询指定的用户
                s.search_data.type = s.hJ ? 0 : 1,//	0已加入，1待审核
                    setting_api.searchUser(s.search_data).success(function (data) {
                        s.userList = data;
                    });
            };

            ////获得下拉框的列表数据getRoleList
            //(s.roleList = function () {
            //    setting_api.getRoleList().success(function (data) {
            //        //  console.log(data);
            //        s.data = data;
            //    });
            //})();


            //s.asd=[{pname:'sdfsdfsdfs',pno:'232323'},{pname:'fdsfds',pno:'232434423'}];
            s.asd=[];
            s.qwe={
                title:[
                    {name:'序号',key:'order',wid:'97'},
                    {name:'姓名',key:'realname',wid:'123'},
                    {name:'手机号',key:'phone',wid:'150'},
                    {name:'邮箱',key:'email',wid:'198'},
                    {name:'角色',key:'rolename',wid:'142'},
                    {name:'所属部门',key:'departmentname',wid:'142'},
                    {name:'创建人',key:'createduser',wid:'114'},
                    {name:'创建时间',key:'created_at',wid:'160'},
                    {name:'操作',key:'pno',wid:'228'},
                ]
            };



            // 获得已添加用户列表 getUserList
            var getAddList = function () {
                var user_obj = {
                    type: 0
                };
                setting_api.getUserList(user_obj).success(function (data) {
                    console.log(data);
                    console.log('获得已添加用户列表');
                    s.add_item = data.data;
                    console.log(s.add_item);

                   for(var i=0;i< s.add_item.length;i++){
                       s.add_item[i].order=i+1;
                   }
                    s.asd=s.add_item;
                    console.log(s.asd)
                })
            };

            getAddList()

            // 查找已添加用户列表 getUserList
            s.user = {
                roleid:'0',
                departmentid: '0',
            }
            s.findAddList = function () {
                console.log(s.subdata,"++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                var user_obj = {
                    type: 0,
                    departmentid: s.user.departmentid,
                    realname: s.user.realname,
                    roleid: s.user.roleid
                };
                setting_api.getUserList(user_obj).success(function (data) {
                    console.log(data);
                    s.add_item = data.data;
                    //getAddList()
                })
            };


            /*获得待审核用户列表  get user_exam list*/
            s.exam=[];
            s.oexam={
                title:[
                    {name:'序号',key:'order',wid:'206'},
                    {name:'姓名',key:'realname',wid:'206'},
                    {name:'手机号',key:'phone',wid:'267'},
                    {name:'创建人',key:'createduser',wid:'202'},
                    {name:'创建时间',key:'created_at',wid:'202'},
                    {name:'操作',key:'pno',wid:'303'},
                ]
            };
            var getExamList = function () {
                var user_obj = {
                    type: 1
                };
                setting_api.getUserList(user_obj).success(function (data) {
                    console.log(data);
                    console.log('获得待审核用户列表');

                    s.exam_item = data.data;
                    for(var i=0;i< s.exam_item.length;i++){
                        s.exam_item[i].order=i+1;
                    }
                    s.exam=s.exam_item;
                    console.log(s.exam_item);
                })
            };
            getExamList();
            //删除
            s.remove_user = function (id) {
                var form_data = {
                    id: id
                }
                setting_api.removeCompanyUser(form_data)
                    .success(function (data) {
                        getExamList();
                        getAddList();
                        console.log(data);
                    })
            }
            //同意用户申请
            s.agree_user = function (id) {
                var form_data = {
                    id: id
                }
                setting_api.agreeCompanyUser(form_data)
                    .success(function (data) {
                        getExamList();
                        getAddList();
                        console.log(data);
                    })
            }

            //拒绝用户申请
            s.refuse_user = function (id) {
                var form_data = {
                    id: id
                }
                setting_api.refuseUserAgree(form_data)
                    .success(function (data) {
                        getExamList();
                        getAddList();
                        console.log(data);
                    })
            }


            var get_department_and_role_list = function () {
                setting_api.getDepartmentAndRoleList()
                    .success(function (data) {
                        console.log(data);
                        s.role_list = data.data.RoleList;
                        s.department_list = data.data.DepartmentList;

                        angular.forEach(s.role_list,function(v,k){
                            v.v=v.id
                        });
                        angular.forEach(s.department_list ,function(v,k){
                            v.v=v.id
                        });

                        get_search_input( s.role_list, s.department_list);
                    })
                    .error(function () {
                        console.log('调取失败');
                    })
            }
            get_department_and_role_list();


            // 保存编辑用户修改
            s.edit_user_infor = function () {
                if(!s.company_user.departmentid){
                    myalert.alert('','部门没有选择','')
                }  else if(!s.company_user.roleid){
                    myalert.alert('','角色名称没有选择','')
                }
                else{
                    var user_obj = {
                        departmentid: s.company_user.departmentid,
                        id: s.company_user.id,
                        phone: s.company_user.phone,
                        realname: s.company_user.realname,
                        roleid: s.company_user.roleid,
                    };
                    setting_api.editUserInfor(user_obj).success(function (data) {
                        s.add_show = false;
                        s.update_show = false;
                        getAddList()
                    })
                }

            };


        }]);
    myapp.controller("add_user_popup_ctrl",["$scope","$uibModalInstance","item",function(s,$uibModalInstance,item){
        s.editingUser = item;
        s.keepAll=function(data){
            $uibModalInstance.close(data);
        };
        s.cancel=function(){
            $uibModalInstance.dismiss('这是cancel');
        };
    }]);
        myapp.controller("edit_user_popup_ctrl",["$scope","$uibModalInstance","item",function(s,$uibModalInstance,item){
            s.company_user = item;
            s.keepAll=function(data){
                $uibModalInstance.close(data);
            };
            s.cancel=function(){
                $uibModalInstance.dismiss('这是cancel');
            };
        }])
});
