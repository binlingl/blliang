/**
 * Created by panda on 2017/3/20.
 */
define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider
                .state('scene.new', {
                    url: '/new',
                    views: {
                        'scene': {
                            templateUrl: 'tpls/scene/new.html',
                            resolve: {
                                deps: $requireProvider.requireJS([
                                    'ctrl/scene/new_ctrl'
                                ])
                            },
                            controller: 'scene_new_ctrl',
                        }
                    }
                })

        }
    ]);
});