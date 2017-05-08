define(["app"],function(myapp){
    myapp.factory("logicstate_handle",["myalert",'$location',function(myalert,$location){
        return function(logicstate,data){
            if (logicstate.toString() == "110") {
                myalert.alert('提示', data.msg, function () {
                })

            }
            else if (logicstate.toString() == "403") {
                myalert.alert("提示", "权限不足", function () {

                });

                //执行客户端退出操作
                //common.removeLoginInfo();
                //location.href="/full_platform/#/login/new";
            } else if (logicstate.toString() == "4031") {
                myalert.alert("提示", "需要先通过用户认证", function () {
                    location.href = "/full_platform/#/personal_center/identity";
                });
            }else if(logicstate.toString()=="401"){

                //过滤简历管理页面，当是简历管理是跳转到登陆
                //http://localhost:4002/full_platform/#/personal_center/resume_manage/show/48e29f27-0815-4121-b96b-6ccb3948a65d
                var backurl_flag = $location.$$absUrl.indexOf("full_platform/#/personal_center/resume_manage/show");
                var backurl = encodeURIComponent($location.$$absUrl);

                if(backurl_flag == -1){
                    myalert.login(true);
                }else{
                    backurl = "/full_platform/#/login/new?backurl=" + backurl;

                    window.location.href =backurl;
                }
            }
        }
    }]);
})