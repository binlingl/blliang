define(['app'], function (myapp) {
    myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$requireProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider) {
            $stateProvider.state('hireHome', {
                url: "/hireHome",
                views: {
                    "main": {
                        templateUrl: 'tpls/practicePages/hireHome.html',
                    }
                }
            })
                .state('personalCenter',{
                    url: "/personalCenter",
                    views: {
                        "main": {
                            templateUrl: 'tpls/practicePages/personalCenter.html',
                        }
                    }
                })
                .state('seller',{
                    url: "/seller",
                    views: {
                        "main": {
                            templateUrl: 'tpls/practicePages/seller.html',
                        }
                    }
                })
                .state('sellerChange',{
                    url: "/sellerChange",
                    views: {
                        "main": {
                            templateUrl: 'tpls/practicePages/sellerChange.html',
                        }
                    }
                })

        }
    ]);
});
