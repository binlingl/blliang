define(['app'], function (myapp) {
    myapp.directive("enter", function () {
        return {
            restrict: 'AE',
            scope: {search: "&"},
            link: function (scope, ele, att, mod) {

            }
        }
    });
});