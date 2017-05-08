/**
 * Created by panda on 2017/3/20.
 */
define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider
                .state('scene.mainscene', {
                    url: '/mainscene',
                    views: {
                        'scene': {
                            templateUrl: 'tpls/scene/mainscene.html',
                            resolve: {
                                deps: $requireProvider.requireJS([
                                    'ctrl/scene/mainscene_ctrl'
                                ])
                            },
                            controller: 'scene_mainscene_ctrl',
                        }
                    }
                })

        }
    ]);
});