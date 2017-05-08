/**
 * Created by admin on 2017/3/17.
 */
define(["app","directives/sidebar/sidebar","api/scene_api","services/myalert/myalert"],function(myapp){
    myapp.controller("scene_new_ctrl",["$scope","scene_api",'$state','myalert',function(s,scene_api,$state,myalert){
        s.names = ['公司企业','代理机构','政府/事业单位','高校/研究院','其他'];
        s.ctype=s.names[0];
        s.isWrong = false;
        s.massage = "";
        /*new company*/
        s.createCompany = function(){
            if(!name && s.name.length < 4){
                s.isWrong = true;
                s.massage = "企业全称不少于4个字符";
            }else{
                var send_obj = {
                    name: s.name,
                    type: s.ctype
                };
                console.log(send_obj);
                scene_api.createCompany(send_obj).success(function(data){
                    console.log(data);
                    if(data.state == "true"){
                        $state.go('home.workspace',{status:0});
                        return;
                    }else if(data.state == "false"){
                        myalert.content(data.msg);
                    }
                });
            }


        };

        s.get_input = function(){
            s.isWrong = false;
        }
    }])
})