/**
 * Created by tom on 2017/3/7.
 */
define(['app', 'env',
    'routers/demo/d_default',
    'routers/account/account',
    'routers/scene/scene',
    'routers/proposal/proposal',
    'routers/ideas/ideas',//创意
    'routers/setting/setting',
    'routers/patent/patent',//专利
    'routers/workspace/scene_mainscene',//工作台
    'routers/practicePages/practices'

], function (myapp, env) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $urlRouterProvider.otherwise("/account/login");
            if (env == "production" || env == "test") {
                $locationProvider.html5Mode(true);
            }
            $stateProvider.state('home', {
                url: '/home',
                views: {
                    'main': {
                        templateUrl: 'tpls/home/home.html',
                        controller: 'home_home_ctrl'
                    }
                }
            });

        }]);
});

