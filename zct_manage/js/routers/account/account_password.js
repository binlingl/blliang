define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider.state('account.find_psw', {
                    url: '/find_psw',
                    views: {
                        'account': {
                            templateUrl: 'tpls/account/find_psw.html',
                            resolve: {
                                deps: $requireProvider.requireJS([
                                    'ctrl/account/account_findpwd_ctrl'
                                ])
                            },
                            controller: 'account_findpwd_ctrl',
                        }
                    }
                }).state('account.find_success', {
                    url: '/find_success',
                    views: {
                        'account': {
                            templateUrl: 'tpls/account/find_success.html',
                            //controller: 'phr_e_resume_manage_state1_ctrl',
                        }
                    }
                })
        }
    ]);
});