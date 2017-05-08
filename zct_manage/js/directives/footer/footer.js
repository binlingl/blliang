define(['app','services/setting'],function (myapp) {

    myapp.directive('footer', ['setting',function (setting) {
        return {
            restrict: 'A',
            templateUrl:'/js/directives/footer/footer.html',
            link: function (scope, ele, att, mod) {

                scope.config = setting;
                console.log("888888888=====================");
                console.log(scope.config.url_href.about_us);
            }
        }
    }]);
});