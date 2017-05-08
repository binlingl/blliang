define(['app','routers/scene/scene_edit','routers/scene/scene_new','../workspace/scene_mainscene','routers/scene/scene_apply','routers/scene/scene_choice'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider.state('scene', {
                url: '/scene',
                views: {
                    'main': {
                        templateUrl: 'tpls/scene/scene_module.html',
                       /* resolve: {
                            deps: $requireProvider.requireJS([
                                //'ctrl/phr/enterprise/e_resume_manage'
                            ])
                        },*/
                        //controller:'phr_e_resume_manage_ctrl'
                    }
                }
            })
        }
    ]);
});