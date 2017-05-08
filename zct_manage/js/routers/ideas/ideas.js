define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $urlRouterProvider.otherwise('home.ideas');
            $stateProvider.state('home.ideas', {//创意列表（全部创意）
                    url: '/ideasList',
                    views: {
                    "content": {
                        templateUrl: 'tpls/ideas/list.html',
                        controller:"ideas_first_ctrl"
                    }
                }
            })

            .state('home.ideas.allIdeas', {//全部创意
              //  url: '/allIdeas/:user_right',
               url:'/allIdeas',
                views: {
                    "part": {
                        templateUrl: 'tpls/ideas/all_idea_list.html',
                        controller:'ideas_allIdeas_ctrl'
                    }
                }
            })

            .state('home.ideas.myIdeas', {//我的创意
                //url: '/myIdeas/:user_right',
                    url:'/myIdeas',
                    views: {
                    "part": {
                        templateUrl: 'tpls/ideas/myIdeas.html',
                        controller:'ideas_myIdeas_ctrl'
                    }
                }
            })
            .state('home.ideas.details', {//创意详情
                url: '/details?id',
                views: {
                    "part": {
                       // params: {"id":null},
                        templateUrl: 'tpls/ideas/details.html',
                        controller:"ideas_detail_ctrl"
                    }
                }
            })
            .state('home.ideas.edit', {//编辑创意
                url: '/detailsEdit/:id',
                views: {
                    "part": {
                        templateUrl: 'tpls/ideas/edit.html',
                        controller:"ideas_edit_ctrl"
                    }
                }
            })
            .state('home.ideas.approval', {//创意详情审批
                url: '/approval',
                views: {
                    "part": {
                        templateUrl: 'tpls/ideas/approval.html',
                        controller:"ideas_hasPass_ctrl"
                    }
                }
            })


            .state('home.ideas.appr_list', {//创意审批/待审批列表
                url: '/appr_list',
                views: {
                    "part": {
                        templateUrl: 'tpls/ideas/appr_list.html',
                        controller:"ideas_waitPass_ctrl"
                    }
                }
            })
            .state('home.ideas.appr_list_detail', {//创意待审批详情
                url: '/apprListDetail/:id',
                views: {
                    "part": {
                        templateUrl: 'tpls/ideas/appr_list_detail.html',
                        controller:'appr_listDetail_ctrl',

                    }
                }
            })

            .state('home.ideas.add', {//发布创意(创意添加)
                url: '/add',
                views: {
                    "part": {
                        templateUrl: 'tpls/ideas/add.html',
                        controller:"ideas_add_ctrl"
                    }
                }
            })
            .state('home.ideas.test', {//发布创意(创意添加)
                url: '/test',
                views: {
                    "part": {
                        templateUrl: 'tpls/ideas/test.html',
                        controller:"idea_test_ctrl"
                    }
                }
            })

        }])}
    );
