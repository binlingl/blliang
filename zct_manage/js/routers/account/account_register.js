define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider.state('account.register', {
                    url: '/register',
                    views: {
                        'account': {
                            templateUrl: 'tpls/account/register.html',
                            resolve: {
                                deps: $requireProvider.requireJS([
                                    'ctrl/account/account_register_ctrl'
                                ])
                            },
                            controller: 'account_register_ctrl'
                        }
                    }
                })
        }
    ]);
});