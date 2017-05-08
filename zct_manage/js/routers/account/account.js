define(['app','routers/account/account_login','routers/account/account_password','routers/account/account_register'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider.state('account', {
                url: '/account',
                views: {
                    'main': {
                        templateUrl: 'tpls/account/account_module.html',
                       /* resolve: {
                            deps: $requireProvider.requireJS([
                                'ctrl/account/account_login_ctrl'
                            ])
                        }*/
                        //controller:'phr_e_resume_manage_ctrl'
                    }
                }
            })
        }
    ]);
});