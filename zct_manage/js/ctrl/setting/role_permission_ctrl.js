define(["app", "directives/sidebar/sidebar", 'api/setting_api','services/zctlocal_storage'], function (myapp) {
    myapp.controller('role_permission_ctrl',
        ['$scope', "setting_api",'zctlocal', function (s, setting_api,zctlocal) {
            //权限控制
            s.permission=JSON.parse(zctlocal.getlocal('permission')).setting;
            console.log(typeof s.permission);
            s.asd=[];
            s.qwe={
                title:[
                    {name:'序号',key:'order',wid:'97'},
                    {name:'角色名称',key:'name',wid:'100'},
                    {name:'权限',key:'permission',wid:'365'},
                    {name:'创建人',key:'createduser',wid:'80'},
                    {name:'创建时间',key:'created_at',wid:'142'},
                    {name:'操作',key:'pno',wid:'145'},
                ]
            };
            var get_role_list = function () {
                setting_api.getRolePermissionList().success(function (data) {
                    console.log(data);
                    s.item = data.data;
                    for(var i=0;i< s.item.length;i++){
                        s.item[i].order=i+1;
                    }
                    s.asd= s.item;
                    if(s.item.length==0){
                        s.nothing=true;
                    }
                });
            }
            get_role_list();
            //删除角色
            s.delete_role = function (id) {
                form_data = {
                    id: id
                }
                setting_api.deleteRole(form_data).success(function (data) {
                    console.log(data);
                })
            }
            //查询角色
            s.find_role = function () {
                var form_data = {
                    name: s.role_name
                }
                setting_api.findRole(form_data)
                    .success(function (data) {
                        s.item = data.data;
                        console.log(data);
                    })
                    .error(function(){
                        console.log('调取失败');
                    })
            }

        }]);
});



