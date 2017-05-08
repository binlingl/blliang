/**
 * Created by panda on 2017/3/15.
 */
define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider.state('demo', {
                url: '/demo',
                views: {
                    "main": {
                        templateUrl: 'tpls/demo/d_default.html'
                    }
                }
            })
                .state('demo.login', {
                    url: '/login',
                    views: {
                        "content": {
                            templateUrl: 'tpls/demo/d_login.html'
                        }
                    }
                })
        }
    ]);
});