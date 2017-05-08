define(['app','api/side_bar_api'], function (myapp) {
    //myapp.directive('settingnav', [function () {
    //    return {
    //        restrict: 'AE',
    //        templateUrl: 'js/directives/sidebar/setting_nav1.html',
    //        replace:true,
    //        link: function (s, element, attrs) {
    //            console.log('是否生效')
    //        }
    //    }
    //}]);


    myapp
        .controller("side_bar_ctrl",['$scope',function(s){
            s.get_all_user=function(){
                side_bar_api
                    .get_all_user_list()
                    .success(function(data){
                        console.log(data);
                    })
                    .error(function(data){
                        console.log(data);
                    });
            }
            s.get_all_user();
            console.log("this is side_bar_ctrl--------------------------------------");

        }])
        .directive('proadduser', [function () {
            return {
                restrict: 'AE',
                templateUrl: 'js/directives/sidebar/add_user.html',
                replace:true,
                link: function (s, element, attrs) {
                    console.log('是否生效')

                }
            }
    }])

})