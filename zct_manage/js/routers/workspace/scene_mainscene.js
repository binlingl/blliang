/**
 * Created by panda on 2017/3/20.
 */
define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider.state('home.workspace', {
                url: '/workspace?status',
                views: {
                    "content": {
                        templateUrl: 'tpls/workspace/mainscene.html',
                        controller:"mainscene_ctrl"
                    }
                }
            })

        }
    ]);
});