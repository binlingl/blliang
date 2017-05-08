/**
 * Created by panda on 2017/3/20.
 */
define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider
                .state('scene.apply', {
                    url: '/apply',
                    views: {
                        'scene': {
                            templateUrl: 'tpls/scene/apply.html',
                            controller: 'scene_apply_ctrl',
                        }
                    }
                })

        }
    ]);
});