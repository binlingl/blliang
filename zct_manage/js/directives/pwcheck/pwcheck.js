define(['app'],function (myapp) {
    myapp.directive('pwCheck', [function () {
        console.log('pwCheck');
        return {
            restrict: 'A',
            require: "ngModel",
            link: function (scope, elem, attrs, ctrl) {
                var otherInput = elem.inheritedData("$formController")[attrs.pwCheck];
                ctrl.$parsers.push(function (value) {
                    ctrl.$setValidity("pwCheck", value === otherInput.$viewValue);
                    return value;
                });

                otherInput.$parsers.push(function (value) {
                    ctrl.$setValidity("pwCheck", value === ctrl.$viewValue);
                    return value;
                });
            }
        };
    }]);
});