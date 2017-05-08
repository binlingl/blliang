define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider.state('account.login', {
                url: "/login",
                views: {
                    "module": {
                        templateUrl: 'tpls/account/login.html',
                        //controller: 'about_company_controller'
                    }
                }
            })
        }
    ]);
});