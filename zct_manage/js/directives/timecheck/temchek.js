define(['app'],function (myapp) {
    myapp.directive('timecheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firsttime = '#' + attrs.timecheck;
                console.log(firsttime)
                elem.add(firsttime).on('focus', function () {

                    var v = elem.val() >= $(firsttime).val();
                    ctrl.$setValidity('timematch', v);
                    //scope.$apply(function () {
                    //    var v = elem.val()<=$(firsttime).val();
                    //    ctrl.$setValidity('timematch', v);
                    //});

                });

            }
        }

    }]);
});