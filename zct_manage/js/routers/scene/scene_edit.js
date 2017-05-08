/**
 * Created by panda on 2017/3/20.
 */
define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider.state('scene.edit', {
                url: '/edit',
                views: {
                    'scene': {
                        templateUrl: 'tpls/scene/edit.html',
                        //controller: 'phr_e_resume_manage_state1_ctrl',
                    }
                }
            })

        }
    ]);
});