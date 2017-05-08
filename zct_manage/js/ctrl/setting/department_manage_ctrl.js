define(["app", "directives/sidebar/sidebar", 'api/setting_api', 'api/permission_api', 'services/permission', 'services/zctlocal_storage','services/myalert/myalert'], function (myapp) {
    myapp.controller('department_manage_ctrl', ['$scope', 'setting_api', 'permission_api',
        'permission', 'zctlocal','myalert','$uibModal', function (s, setting_api, permission_api, permission, zctlocal,myalert,$uibModal) {
        //控制侧边栏显示与否
        console.log('company_manage_ctrl');
        s.add_show = false;
        s.update_show = false;
        //控制权限显示
       s.permission = JSON.parse(zctlocal.getlocal('permission')).setting;
        s.add_department_show = function () {
            s.add_department = {
                name: '',
                status: '',
                remark: ''
            };
            //显示新增部门弹框
          var showModal = $uibModal.open({
              animation:true,
              templateUrl:'tpls/setting/add_department.html',
              controller:"add_department_ctrl",
              size:'sm',
              resolve:{
                  item:function(){
                      return s.add_department;
                  }
              }
          });
            showModal.result.then(function(data){
                s.add_department = data;
                s.department_add();
            },function(data){
                console.log(data);
            })
        }
        //s.update_department=function(){
        //
        //}
        s.bar_cancel = function () {
            s.add_show = false;
            s.update_show = false;
        }
        //查询部门信息
        s.find_department_list = function () {
            form_data = {
                name: s.find_content
            }
            setting_api.getDepartmentList(form_data)
                .success(function (data) {
                    console.log(data);
                    s.list_data = data.data;
                })
                .error(function () {
                    console.log('调取失败');
                })
        }


        //获取部门管理列表
            s.asd=[];
            s.qwe={
                title:[
                    {name:'序号',key:'order',wid:'97'},
                    {name:'部门名称',key:'name',wid:'180'},
                    {name:'启用状态',key:'status',wid:'165'},
                    {name:'备注',key:'remark',wid:'290'},
                    {name:'创建人',key:'createduser',wid:'180'},
                    {name:'创建时间',key:'created_at',wid:'172'},
                    {name:'操作',key:'pno',wid:'245'},
                ]
            };
        var get_department_list = function () {
            setting_api.getDepartmentList()
                .success(function (data) {
                    console.log(data);
                    s.list_data = data.data;
                    //s.asd= s.list_data;
                    for(var i=0;i< s.list_data.length;i++){
                        s.list_data[i].order=i+1;
                    }
                    s.asd=s.list_data;
                    if(s.list_data.length==0){
                        s.nothing=false;
                    }
                })
                .error(function () {
                    console.log('调取失败');
                })
        }

        get_department_list();

        //新增部门

        s.department_add = function () {
            if(!s.add_department.status){
                myalert.alert('','部门状态没有选择','')
            }else{
                var form_data = {
                    name: s.add_department.name,
                    status: s.add_department.status,
                    remark: s.add_department.remark,

                }
                setting_api.addDepartment(form_data)
                    .success(function (data) {
                        console.log(data);
                        get_department_list();
                        s.add_show = false;
                        s.update_show = false;
                    })
                    .error(function () {
                        console.log('调取失败');
                    })
            }

        }
        //编辑部门
        //获取该部门的详细信息
        s.update_department = function (id) {
            var form_data = {
                id: id
            };
            setting_api.departmentDetail(form_data)
                .success(function (data) {
                    console.log(data);
                    s.edit_department = data.data;
                    s.edit_department.id = data.data.id;
                    s.update_show = !s.update_show;
                })
                .error(function () {
                    console.log('调取失败')
                });
            //显示编辑部门弹框
            var modalEdit = $uibModal.open({
                animation:true,
                templateUrl:'tpls/setteing/edit_department.html',
                controller:'edit_department_ctrl',
                size:'sm',
                resolve:{
                    item:function(){
                        return s.edit_department;
                    }
                }
            });
            modalEdit.result.then(function(data){
                s.edit_department = data
                s.department_edit();
            },function(data){
              console.log(data);
            })

        };
        s.department_edit = function () {
            if(!s.edit_department.status){
                myalert.alert('','部门状态没有选择',function(){})
            }else{
                var form_data = {
                    id: s.edit_department.id,
                    name: s.edit_department.name,
                    status: s.edit_department.status,
                    remark: s.edit_department.remark,
                }
                setting_api.editDepartment(form_data)
                    .success(function (data) {
                        console.log(data);
                        get_department_list();
                        s.add_show = false;
                        s.update_show = false;
                    })
                    .error(function () {
                        console.log('调取失败');
                    })
            }

        }
        //删除部门
        s.department_cancel = function (id) {
            var form_data = {
                id: id,
            }
            setting_api.deleteDepartment(form_data)
                .success(function (data) {
                    console.log(data);
                    get_department_list();

                })
                .error(function () {
                    console.log('调取失败');
                })
        }


    }]);

    //弹框控制器
    myapp.controller("add_department_ctrl",["$scope","item","$uibModalInstance",function(s,item,$uibModalInstance){
        s.add_department = item;
        s.keepAll = function(data){
            $uibModalInstance.close(data);
        };
        s.cancel = function(){
            $uibModalInstance.dismiss('这是cancel');
        };
    }]);
    myapp.controller("edit_department_ctrl",["$scope","item","$uibModalInstance",function(s,item,$uibModalInstance){
        s.edit_department = item;
        s.keepAll = function(data){
            $uibModalInstance.close(data);
        };
        s.cancel = function(){
            $uibModalInstance.dismiss('这是cancel');
        };
    }])


});