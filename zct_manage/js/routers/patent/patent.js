define(['app'], function (myapp) {
        myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
                $urlRouterProvider.otherwise('home.patentList');
                $stateProvider.state('home.patentList', {//
                    url: '/patentList',
                    views: {
                        "content": {
                            templateUrl: 'tpls/patent/show_all.html',

                        }
                    }
                })
                .state('home.patent_list', {//专利列表
                    url: '/patent_list',
                    views: {
                        "content": {
                            templateUrl: 'tpls/patent/list.html',
                            controller:'patent_list_ctrl'
                        }
                    }
                })
                    .state('home.list_costmanage', {//费用列表
                        url: '/list_costmanage',
                        views: {
                            "content": {
                                templateUrl: 'tpls/patent/list_costmanage.html',
                                controller:'list_costmanage_ctrl'
                            }
                        }
                    })
                .state('home.patentRevising', {//专利修改基本信息
                    url: '/patentRevisingDetail',
                    views: {
                        "content": {
                            templateUrl: 'tpls/patent/revising/revisingDetail.html'
                        }
                    }
                }) .state('home.my_patents', {//我的专利
                        url: '/my_patent',
                        views: {
                            "content": {
                                templateUrl: 'tpls/patent/my_patents.html',
                                controller:'my_patents_ctrl'
                            }
                        }
                    })
              .state('home.patentRevising.cost', {//专利修改中的费用
                url: '/patentRevisingCost?id',
                views: {
                    "revisingBox": {
                        templateUrl: 'tpls/patent/revising/revisingCost.html'
                    }
                }
            })
            .state('home.patentRevising.help', {//专利修改中的资助
                url: '/patentRevisingHelp',
                views: {
                    "revisingBox": {
                        templateUrl: 'tpls/patent/revising/revisingHelp.html'
                    }
                }
            })

            .state('home.patentAdd', {//专利增加(详情)
                url: '/patentAddDetail?patentid&tab',
                views: {
                    "content": {
                        templateUrl: 'tpls/patent/add/addDetail.html',
                        controller:'patent_add_ctrl'
                    }
                }
            })
            // .state('home.patentAdd.cost', {//专利增加（cost）
            //     url: '/patentAddCost',
            //     views: {
            //         "addBox": {
            //             templateUrl: 'tpls/patent/add/addCost.html'
            //         }
            //     }
            // })
            // .state('home.patentAdd.help', {//专利增加（help）
            //         url: '/patentAddHelp',
            //         views: {
            //             "addBox": {
            //                 templateUrl: 'tpls/patent/add/addHelp.html'
            //             }
            //         }
            // })


            .state('home.patent_costList', {//、专利费用列表
                url: '/patent_costList',
                views: {
                    "content": {
                        templateUrl: 'tpls/patent/cost_list.html'
                    }
                }
            })

                .state('home.patentDetails', {//、专利详情
                    url: '/patentDetails?id',
                    views: {
                        "content": {
                            templateUrl: 'tpls/patent/details.html',
                            controller:'patent_details_ctrl'
                        }
                    }
                })

                .state('home.patentDetailsSide', {//、专利详情右侧弹框
                    url: '/patentDetailsSide',
                    views: {
                        "content": {
                            templateUrl: 'tpls/patent/detailsSide.html'
                        }
                    }
                })

                .state('home.patentImport', {//、专利导入
                    url: '/patentImport',
                    views: {
                        "content": {
                            templateUrl: 'tpls/patent/import.html'
                        }
                    }
                })
                .state('home.patentExport', {//、专利导出
                    url: '/patentExport?getParams',
                    views: {
                        "content": {
                            templateUrl: 'tpls/patent/export.html',
                            controller:'patent_export_ctrl'
                        }
                    }
                })
                    .state('home.new_patent', {//、专利导出
                        url: '/new_patent',
                        views: {
                            "content": {
                                templateUrl: 'tpls/patent/new_patent.html',
                                controller:'patent_list_ctrl'
                            }
                        }
                    }).state('home.add_patent_cost',{//新增专利费用弹框
                        url:'/add_patent_cost',
                        views:{
                            "content":{
                                templateUrl:'tpls/patent/add/addPatentCost.html',
                                controller:''
                            }
                        }

                    })

            }])}
);

