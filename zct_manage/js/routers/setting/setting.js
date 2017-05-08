define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider.state('home.setting', {
                url: '/setting',
                views: {
                    "content": {
                        templateUrl: 'tpls/setting/setting_module.html',
                        controller:'setting_module_ctrl'
                    }
                }
            }).state('home.setting_nav', {
                    url: '/setting_nav',
                    views: {
                        "content": {
                            templateUrl: 'tpls/setting/setting_nav.html',
                            controller:'setting_module_ctrl'
                        }
                    }
                }).
                state('home.setting.department', {//部门管理
                url: '/department',
                views: {
                    "setting": {
                        templateUrl: 'tpls/setting/department.html',
                        controller:'department_manage_ctrl'
                    }
                }
            })
                .state('home.setting.personal', {//个人资料设置
                    url: '/personal',
                    views: {
                        "setting": {
                            templateUrl: 'tpls/setting/personal.html',
                            controller:"personal_ctrl"
                        }
                    }
                })
                .state('home.setting.basic', {//基本设置
                    url: '/basic',
                    views: {
                        "setting": {
                            templateUrl: 'tpls/setting/basic.html'
                        }
                    }
                })
                .state('home.setting.role_permission', {//角色权限
                    url: '/role_permission',
                    views: {
                        "setting": {
                            templateUrl: 'tpls/setting/role_permission.html',
                             controller:"role_permission_ctrl"
                        }
                    }
                }) .state('home.setting.role_edit', {//角色编辑
                    url: '/role_edit?id',
                    views: {
                        "setting": {
                            templateUrl: 'tpls/setting/role_edit.html',
                            controller:'role_edit_ctrl'
                        }
                    }
                }) .state('home.setting.role_add', {//角色增加
                    url: '/role_add',
                    views: {
                        "setting": {
                            templateUrl: 'tpls/setting/role_add.html',
                            controller:'role_add_ctrl'
                        }
                    }
                })
                .state('home.setting.procedure', {//流程管理
                    url: '/procedure',
                    views: {
                        "setting": {
                            templateUrl: 'tpls/setting/procedure.html'
                        }
                    }
                }) .state('home.setting.company_infor', {//企业信息
                    url: '/company_infor',
                    views: {
                        "setting": {
                            templateUrl: 'tpls/setting/company_infor.html',
                            controller:"company_info_ctrl"
                        }
                    }
                }) .state('home.setting.company_manage', {//企业信息
                    url: '/company_manage',
                    views: {
                        "setting": {
                            templateUrl: 'tpls/setting/company_manage.html',

                            controller:'company_manage_ctrl'
                        }
                    }
                })
                .state('home.setting.user_add', {//企业信息
                    url: '/user_add',
                    views: {
                        "setting": {
                            templateUrl: 'tpls/setting/user_add.html',
                            controller:'add_user_ctrl'
                        }
                    }
                }).state('home.setting.user_exam', {//企业信息
                    url: '/user_exam',
                    views: {
                        "setting": {
                            templateUrl: 'tpls/setting/user_exam.html',
                            controller:'user_exam_ctrl'
                        }
                    }
                })
        }
    ]);
});