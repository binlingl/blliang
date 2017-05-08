/**
 * Created by panda on 2017/3/20.
 */
define(['app', 'routers/scene/scene_edit', 'routers/scene/scene_new', '../workspace/scene_mainscene', 'routers/scene/scene_apply'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider
                .state('scene.choice', {
                    url: '/choice',
                    views: {
                        'scene': {
                            templateUrl: 'tpls/scene/choice.html',
                            resolve: {
                                deps: $requireProvider.requireJS([
                                    'ctrl/scene/choice_ctrl'
                                ])
                            },
                            controller: 'scene_choice_ctrl',
                        }
                    }
                })


        }
    ]);
});