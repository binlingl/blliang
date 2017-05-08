define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider.state('account.login', {
                    url: '/login',
                    views: {
                        'account': {
                            templateUrl: 'tpls/account/login.html',
                            resolve: {
                                deps: $requireProvider.requireJS([
                                    'ctrl/account/account_login_ctrl'
                                ])
                            },
                            controller: 'account_login_ctrl',
                        }
                    }
                })
        }
    ]);
});