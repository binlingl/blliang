define(["app","directives/sidebar/sidebar"], function (myapp) {
    myapp.controller('setting_module_ctrl',
        ['$scope', function (s) {
          console.log('setting_module');
            s.tom=1;
            s.nav_change=function(n){
                s.tom=n
                console.log(s.tom);
            }
        }]);

});
