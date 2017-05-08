define(["app","directives/sidebar/sidebar"], function (myapp) {
    myapp.controller('proposal_select_user_ctrl',
        ['$scope', function (s) {
            console.log('proposal_select_user_ctrl');
            s.add_user_show=false;
            s.add_user=function(){
                s.add_user_show=!s.add_user_show;
            }
            s.bar_cancel=function(){
                s.add_user_show=false;
            }
        }]);

});
