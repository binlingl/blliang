/**
 * Created by panda on 2017/3/15.
 */
define(['app', 'services/setting', 'services/http'], function (myapp) {
    myapp.factory('setting_api', ['setting', 'myhttp', function (setting, myhttp) {
        var api_url = setting.api_url;
        var myhttp = myhttp;
        var api = {
            getInfor: function (data) {//获得企业资料
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetCompanyInfor',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            company_infor_update: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageSetting/UpdateCompanyInfor',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            quitCompany: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageSetting/QuitCompany',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            cancelApply: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageSetting/CancelApply',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            getRoleList: function (data) {//获得角色列表
                return myhttp({
                        url: api_url + '/manage/ManageSetting/GetDepartmentAndRoleList',
                        method: "post",
                        type: "json",
                        data: data
                    }
                );
            },
            /*get user list*/
            getUserList: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetUserExamList',
                    method: 'post',
                    type: 'json',
                    data: data
                })
            },
            getCompanyList: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetCompanyList',
                    method: 'get',
                    type: 'json',
                    data: data
                });
            },
            getRolePermissionList: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetRolePermissionList',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            //getUserList: function (data) {//获得用户列表
            //    return myhttp({
            //        url: api_url + '/api/ManageSetting/GetUserExamList',
            //        method: "post",
            //        type: "json",
            //        data: data,
            //    });
            //},
            searchUser: function (data) {//查询指定的用户
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetUserExamList',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            removeUser: function (data) {//删除用户
                return myhttp({
                    url: api_url + '/manage/ManageSetting/RemoveCompanyUser',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            deleteRole: function (data) {//删除权限用户
                return myhttp({
                    url: api_url + '/manage/ManageSetting/DeleteRole',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            addRole: function (data) {//角色新增
                return myhttp({
                    url: api_url + '/manage/ManageSetting/AddRole',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            findRole: function (data) {//角色查询
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetRolePermissionList',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            roleDetail: function (data) {//角色查询
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetRoleDetailById',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            editRole: function (data) {//角色查询
                return myhttp({
                    url: api_url + '/manage/ManageSetting/EditRole',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            transferAdmin: function (data) {//转让管理员
                return myhttp({
                    url: api_url + '/manage/ManageSetting/TransferAdmin',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            getCompanyUsers: function (data) {//获取企业用户
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetCompanyUsers',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            removeCompanyUser: function (data) {//移除用户
                return myhttp({
                    url: api_url + '/manage/ManageSetting/RemoveCompanyUser',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            getDepartmentList: function (data) {//获取部门列表
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetDepartmentList',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            addDepartment: function (data) {//新增部门
                return myhttp({
                    url: api_url + '/manage/ManageSetting/AddDepartment',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            editDepartment: function (data) {//编辑部门
                return myhttp({
                    url: api_url + '/manage/ManageSetting/EditDepartment',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            deleteDepartment: function (data) {//删除部门
                return myhttp({
                    url: api_url + '/manage/ManageSetting/DeleteDepartment',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            departmentDetail: function (data) {//删除部门
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetDepartmentById',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            agreeCompanyUser: function (data) {//同意用户申请
                return myhttp({
                    url: api_url + '/manage/ManageSetting/AgreeCompanyUser',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            refuseUserAgree: function (data) {//同意用户申请
                return myhttp({
                    url: api_url + '/manage/ManageSetting/RefuseUserAgree',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            getCompanyUserInfor: function (data) {//同意用户申请
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetCompanyUserInfor',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            getUserInfor: function (data) {//获取登录用户的用企信息
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetUserInfor',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            getDepartmentAndRoleList: function (data) {//获取部门与角色列表（用于下拉选择框）
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetDepartmentAndRoleList',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            editUserInfor: function (data) {//编辑用企信息
                return myhttp({
                    url: api_url + '/manage/ManageSetting/EditUserInfor',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            editMyUserInfor: function (data) {//编辑用企信息
                return myhttp({
                    url: api_url + '/manage/ManageSetting/EditMyUserInfor',
                    method: "post",
                    type: "json",
                    data: data
                });
            },
            getArea: function (data) {//获取地址
                return myhttp({
                    url: api_url + '/api/dic/get_area_t',
                    method: "post",
                    type: "json",
                    data: data
                });
            },



        }
        return api;
    }]);

})