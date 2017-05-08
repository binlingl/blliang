define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider
                .state('home.proposal', {
                url: '/proposal',
                views: {
                    "content": {
                        templateUrl: 'tpls/proposal/proposal_module.html',
                        controller:'proposal_module_ctrl'
                    }
                }
            })
              . state('home.proposal.list', {//提案管理
               url: '/list',
               views: {
                   "proposal": {
                      templateUrl: 'tpls/proposal/list.html',
                       controller:'proposal_list_ctrl'
                  }
              }
            })
                .state("home.proposal.my_list",{// 我的提案
                    url:'/my_list',
                    views:{
                        "proposal": {
                            templateUrl: 'tpls/proposal/my_list.html',
                            controller:'my_list_ctrl'
                        }
                    }
                })
                .state("home.proposal.wait_process",{// 待审核
                    url:'/wait_process',
                    views:{
                        "proposal": {
                            templateUrl: 'tpls/proposal/wait_process.html',
                            controller:'wait_process_ctrl'
                        }
                    }
                })
                .state("home.proposal.processed",{// 已审核
                    url:'/processed',
                    views:{
                        "proposal": {
                            templateUrl: 'tpls/proposal/processed.html',
                            controller:'processed_ctrl'
                        }
                    }
                })
            .state("home.proposal.add",{//添加提案
                    url:'/add',
                    views:{
                        "proposal_content": {
                            templateUrl: 'tpls/proposal/add.html',
                            controller:'add_ctrl'
                        }
                    }
                })
                .state("home.proposal.edit",{//提案编辑
                    url:'/edit?id',
                    views:{
                        "proposal_content": {
                            templateUrl: 'tpls/proposal/edit.html',
                            controller:'edit_ctrl'
                        }
                    }
                })
                .state("home.proposal.select_user",{//选择审核?
                    url:'/select_user',
                    views:{
                        "proposal_content": {
                            templateUrl: 'tpls/proposal/select_user.html',
                            controller:'proposal_select_user_ctrl'
                        }
                    }
                })
                .state("home.proposal.export",{//导出
                    url:'/export?getParams',
                    views:{
                        "proposal_content": {
                            templateUrl: 'tpls/proposal/export.html',
                            controller:"proposal_export_ctrl"
                        }
                    }
                })
                .state("home.proposal.details_side",{//提案详情右边弹出
                    url:'/details_side',
                    views:{
                        "proposal_content": {
                            templateUrl: 'tpls/proposal/details_side.html'
                        }
                    }
                })
                .state("home.proposal.details",{// 提案详情新窗?
                    url:'/details?id',
                    views:{
                        "proposal_content": {
                            templateUrl: 'tpls/proposal/details.html',
                            controller:'details_ctrl'
                        }
                    }
                })
            //home.proposal.list
                .state("home.proposal.details_process",{// 提案审批
                    url:'/details_process?id',
                    views:{
                        "proposal_content": {
                            templateUrl: 'tpls/proposal/details_process.html',
                            controller:'details_process_ctrl'

                        }
                    }
                })
        }
    ]);
});