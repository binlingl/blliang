//创意编辑的控制器
define(["app","directives/sidebar/sidebar",'api/setting_api','api/ideas_api','services/create_fixed_files'],
    function (myapp) {
    myapp.controller('ideas_edit_ctrl',
        ['$scope','$rootScope','$state','setting_api','ideas_api','myalert','create_fixed','$window',
            function (s,rs,$state,setting_api,ideas_api,myalert,create_file,$window) {
         /*
            s.Ideas_edit={
                attachments:'',//附件
                basic_information:'',//填写的内容
                create_company_user_id:'',//
                id:'',//创意的ID
                name:'',//创意标题
               // tags:[],//选择的标签
                tags:"",
                status:'',//审批的状态
                update_company_user_id:''//最后 一次编辑的公司的Id
            };
            */
            //  s.Ideas=rs.Ideas;
//tab的状态的改变
            rs.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
                localStorage['to_idea']=toState.name;

                localStorage['from_idea']=fromState.name;
            });
                localStorage['from_idea']=="home.ideas.myIdeas"?rs.eval = 'myIdeas':rs.eval='allIdeas';

//获取详情
            s.get_detail=function() {
                var idx={
                    ideaID:$state.params.id
                };
                ideas_api
                    .get_idea_detail(idx)
                    .success(function (dat) {
                        console.log("---------this is ideas_detail dat--------");
                        s.Ideas_wait_edit =dat.data.data;
                        active_tag(s.Ideas_wait_edit[0].idea.tags);
                       // s.Ideas[0].idea.tags= JSON.parse(s.Ideas[0].idea.tags);
                       // s.Ideas_wait_edit=s.Ideas_wait_edit[0].idea;
                        //create_file.create_fix_file(s.Ideas_wait_edit);//生成附件
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            };
            s.get_detail();

//根据返回来的标签，标亮页面的tag
            var active_tag=function(tags){
                s.pl=false;
                s.cr=false;
                s.dn=false;
                s.cl=false;
                console.log("=================tags===================");
                console.log(tags);
                if(tags.indexOf('专利')!=-1){
                    s.pr=true;
                }
                if(tags.indexOf('版权')!=-1){
                    s.cr=true;
                }
                if(tags.indexOf('域名')!=-1){
                    s.dn=true;
                }
                if(tags.indexOf('商标')!=-1){
                    s.cl=true;
                }
                s.Ideas_wait_edit[0].idea.tags=tags;
                console.log(s.pl,s.cr,s.dn,s.cl);
            };


//--------选择标签---------
            s.addTag=function(str,sta){//参数一：tag 的名字，参数二：状态
                if(sta){//&& s.Ideas.tags.indexOf(str)==-1
                   // s.Ideas.tags.push(str);//添加
                    s.Ideas_wait_edit[0].idea.tags=str;
                }
                else{
                   // s.Ideas.tags.splice(s.Ideas.tags.indexOf(str),1);//删除
                    s.Ideas_wait_edit[0].idea.tags="";
                }
                console.log(s.Ideas_wait_edit[0].idea.tags);
            };

//编辑专利后，保存信息
            s.edit_ideas_finish=function(){
                edit_finish_before() &&
                ideas_api
                    .edit_ideas(s.Ideas_wait_edit[0].idea)
                    .success(
                        function(data){
                             data.state && myalert.alert("编辑完成","返回上一页",function(){

                                 //$window.history.back(localStorage['from_idea']);
                                 rs.eval =='myIdeas' ?$state.go("home.ideas.myIdeas"):$state.go("home.ideas.allIdeas");

                               //  $state.go("home.ideas.myIdeas");
                             });
                            console.log(data);
                        })
                    .error(function(data){console.log(data)})
            }

//点击”保存之前的验证，等一些准备工作“
            var edit_finish_before=function(){
                if(s.Ideas_wait_edit[0].idea.tags.length==0){
                    myalert.content("创意类型不能为空","专利、商标、版权、域名，选择一个");
                    return false;
                }
                else{
                    s.Ideas_wait_edit[0].idea.id=$state.params.id;//传递id
                   // s.Ideas_wait_edit[0].idea.tags.tags=JSON.stringify(s.Ideas_edit.tags); //s.Ideas.tags.join(',');//将tags变为字符串
                    return true;
                }
            }

//取消”编辑“
            s.cancel_edit=function(){
                myalert.alert("取消编辑","点击ok,返回",function(){


                      window.history.back();
                    //$state.go("home.ideas.myIdeas");
                });
            }

//附件的添加
            s.uploadcomplete_img=function (p_item) {
                s.Ideas_wait_edit[0].idea.attachments=JSON.stringify(p_item);
            }
                s.uploadcomplete = function(p_item){
                    s.Ideas_wait_edit[0].idea.attachments=JSON.stringify(p_item);
                }



        }]
    )
});
