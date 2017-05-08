/**
 * Created by admin on 2017/3/17.
 */
define(["app","directives/sidebar/sidebar",'api/setting_api'], function (myapp) {
    myapp.controller('user_exam_ctrl',
        ['$scope','setting_api', function (s,setting_api) {
            console.log('company_manage_ctrl');
            s.add_user_show = false;
            s.add_user = function () {
                s.add_user_show = !s.add_user_show;
            }
            s.bar_cancel = function () {
                s.add_user_show = false;
            }
            /*get user_exam list*/
           var getUserList = function(){
               var user_obj = {
                   departmentid:"0",
                   realname:"",
                   roleid:"0",
                   type:1
               };
               setting_api.getUserList(user_obj).success(function(data){
                   console.log(data);
                 /*  var obj = JSON.parse(data);*/
                   s.item = data.data;
               })
           };
            getUserList();
            /*删除*/
            s.remove = function(index){

            }
        }])
});
