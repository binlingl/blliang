/**
 * Created by admin on 2017/3/17.
 */
define(["app","services/setting","services/http"],function(myapp){
    myapp.factory('scene_api',['setting', 'myhttp', function (setting, myhttp){
        var api_url = setting.api_url;
        var myhttp = myhttp;
        var api = {
            /*get the result list */
            getCompanyList:function(data){
            return myhttp({
                url: api_url + '/manage/ManageScene/GetCompanyByName?companyName='+data,
                method: 'get',
                type:'json',
                data:data
            });
            },
            /*when new company */
            createCompany:function(data){
                return myhttp({
                    url:api_url+"/manage/ManageScene/CreateCompany",
                    method:"post",
                    type:"json",
                    data:data
                });
            },
            /*choose scene*/
            switchScene:function(data){
                return myhttp({
                    url:api_url+"/manage/ManageSetting/SwitchScene",
                    method:"post",
                    type:"json",
                    data:data
                });
            },


            /*apply company*/
            applyCompany:function(data){
                return myhttp({
                    url:api_url+"/manage/ManageScene/ApplyCompany?id="+data,
                    method:"get",
                    type:"json",
                    data:data
                });
            },
          /*  //获取当前用户的所有企业列�?
            getCompanyList:function(){
                return myhttp({
                    url:api_url+"/manage/ManageSetting/GetMyCompanyList",
                    method:"get",
                    type:"json"
                });
            },*/
            //获取当前用户的所有企业列�?
            getMyCompanyList:function(){
                return myhttp({
                    url:api_url+"/manage/ManageSetting/GetMyCompanyList",
                    method:"get",
                    type:"json"
                });
            },
            //判断当前用户是否有加入或者创建场�?
            IsHaveCompany:function(){
                return myhttp({
                    url:api_url+"/manage/ManageScene/IsHaveCompany",
                    method:"get",
                    type:"json"
                });
            },
        };
        return api;
    }]);
})