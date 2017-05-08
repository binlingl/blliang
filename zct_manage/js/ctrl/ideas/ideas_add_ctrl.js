define(["app", "directives/sidebar/sidebar", 'api/setting_api', 'api/ideas_api', 'api/side_bar_api','lodash','directives/myfileuploder/myfileuploader'], function (myapp) {
    myapp.controller('ideas_add_ctrl',
        ['$scope','$state', 'setting_api', 'ideas_api', 'side_bar_api','myalert', function (s,$state, setting_api, ideas_api, side_bar_api,myalert) {

//用于存储，待创建的创意的信息
            console.log("ideas_add_ctrl");
            s.ideas = {
                attachments: [],//附件
                basic_information: '',//内容
                name: '',//标题
               // tags: [],//标签
                tags:''//创意标签
            };
            s.approval_user = [];
            //s.attach_files= ['wu_1b1itbpb1mj810t96gumb3ujpvWU_FILE_3','wu_1b2nl1kvt4su1c4014gb14ov1aq40WU_FILE_0'];

//标签的增加，与删除（发布创意中）
            /*
            s.addTag = function (str, sta) {//参数一：tag 的名字，参数二：状态
                if (sta) {
                    s.ideas.tags.push(str);//添加
                }
                else {
                    s.ideas.tags.splice(s.ideas.tags.indexOf(str), 1);//删除
                }
                console.log(s.ideas.tags);
            };
            */

//标签的增加，与删除（发布创意中）
            s.addTag = function (str, sta) {//参数一：tag 的名字，参数二：状态
                if (sta) {
                    //pr=cl=cr=dn=false;
                    s.ideas.tags=str;//添加
                }
                else {
                    //s.ideas.tags.splice(s.ideas.tags.indexOf(str), 1);//删除
                    s.ideas.tags="";
                }
                console.log(s.ideas.tags);
            };

//点击“保存”按钮，发送请求,添加创意
            s.addIdeas = function () {//点击”保存“,调用
                if(s.ideas.tags.length<=0){
                    myalert.content("请选择创意类型：专利、商标、版权、域名");
                }
                else {
                   // s.ideas.tags = JSON.stringify(s.ideas.tags);//多个tags的情况
                    var form_data = {
                        Ideas: s.ideas,
                        ListIdeasApproval: s.approval_user
                    }
                    before_add_idea()&&
                    ideas_api.add_ideas({Ideas: form_data}).success(function (data) {
                        if (data.state) {
                            myalert.alert("发布创意成功", "查看我的创意", function () {
                                $state.go("home.ideas.myIdeas");
                            });
                        }
                    });
                }
            }

//添加创意之前的一下验证
            var before_add_idea=function(){
                if(!s.ideas.name || !s.ideas.basic_information ){
                    myalert.content("请补全创意信息！");
                    return false;
                }

                if(s.sure_user_list){
                    //下一步处理人的排序
                    angular.forEach(s.sure_user_list,function(item,i){
                        s.approval_user.push({
                            approval_company_user_id:item.id,
                            sort: i
                        });

                    });
                }
               return true;
            };

//取消保存
            s.cancel_save=function(){
                window.history.back();
            };
//添加用户，弹框
            s.add_user_show = false;
            s.add_user = function () {
                s.add_user_show = !s.add_user_show ;

                s.get_all_user();
                console.log(s.add_user_show);
            };
            s.bar_cancel = function () {
                s.add_user_show = false;
            };

//获的用户弹框的数据(搜索“下一步添加人”)

            s.goalUser = {};
            s.get_all_user = function (name) {
                s.goalUser.name = name;
                s.userList = {};//用来存储数据库返回来的用户数据
                side_bar_api
                    .get_all_user_list(s.goalUser)
                    .success(function (dat) {
                        //每次在加载数据之前都要进行查询是否已经在在之前选中过此用户
                        s.userList = dat.data;

                        s.test_state(s.pre_user_list);

                    })
                    .error(function (data) {
                        console.log(data);
                    });
            }
            s.get_all_user();

//test_user state （在每一此查询下一步审核人的时候，都要对审核人进行验证，是否之前已经选中）
            s.test_state=function(obj){
                angular.forEach(obj,function(item){
                    s.choiced_flag(item.id);
                });
            }

//********************************************************************
//pre_user_list:搜索框上要遍历的数组
//userList:接口返回的数据
//sure_user_list:确定要选择的审批用户的存储数组
//********************************************************************


//点击“小圆点”，选择添加的下一步审批人
            s.hide_add_user = true;
            s.pre_user_list=[];//用于存放待选审批人
            s.length=0;//用与显示，已经选择多少人
            s.choice_user=function (sta,name, img, id){
              //  s.sure_user_list=[];
                console.log(sta);
                if(sta){//说明选中
                    var user={};
                    user.sta=sta;//是否选中
                    user.name=name;
                    user.head_image=img;
                    user.id=id;
                    s.pre_user_list.push(user);
                    console.log( s.pre_user_list);
                }
                else{//说明取消
                    angular.forEach(s.pre_user_list,function(val,key){
                        if(val.id==id){
                            s.pre_user_list.splice(key,1);
                        }
                    });
                }
                s.length=s.pre_user_list.length;
            }

//选中与非选中的状态改变(小圆点的激活与否)
            s.choiced_flag=function(id){
                s.userList.forEach(function(item){
                    console.log(item.id);
                    if(id==item.id){
                       item.choice=!item.choice;
                        console.log(item.choice);
                    }
                })
            }

//点击“确定按钮”添加下一步审批人
            s.sure_add_user=function(){
                s.sure_user_list=[];
                angular.forEach(s.pre_user_list,function(item,key){
                    s.sure_user_list[key]=item;
                    s.sure_user_list[key].sort=key;//添加sort
                });
                angular.forEach(s.sure_user_list,function(val,key){
                    if (val.name && val.name.indexOf("--")!=-1) {
                        var name_official = val.name.split("--");//进行数据格式化(name--officialName--->数组)
                        val.name = name_official[0];
                        val.officialName = name_official[1];
                    }
                });
                console.log(s.sure_user_list);
            }

//点击“取消”，清空任务列表
            s.cancel_choice=function(){
               s.pre_user_list=[];
                s.chioce=false;
                angular.forEach(s.userList,function(item,key){
                    item.choice=false;
                });

            }

//点击“删除”，取消选择人
            s.delete_user=function(idx){//idx代表被选中元素的ID
                angular.forEach(s.sure_user_list,function(item,key){
                    if(idx==item.id) {
                        s.pre_user_list.splice(key,1);
                        s.sure_user_list.splice(key,1);
                        s.length--;
                        get_user_list_delete(idx);//遍历userList,将对应的元素，取消选中
                    }
                });
            }
            //用于遍历userList,改变选中元素的状态
            var get_user_list_delete=function(idx){
                s.userList.forEach(function(item){
                    if(item.id==idx){
                        item.choice = false;
                    }
                });
            }

            //一次添加一个人
           /* s.choice_user = function (idx, name, img, id) {//人物的选择切换
                if (s.choiced === parseInt(idx)) {
                    s.choiced = -1;
                    s.add_user_list = {};
                    s.hide_add_user = true;//隐藏
                }
                else {
                    s.choiced = idx;
                    s.add_user_list = {};//用于存储，选中的用户

                    if (name) {
                        var name_official = name.split("--");//进行数据格式化(name--officialName--->数组)
                        s.add_user_list.name = name_official[0];
                        s.add_user_list.officialName = name_official[1];
                    }

                    console.log(name_official);
                    //s.add_user_list.name = "下一个英雄";
                    //  s.add_user_list.img = img;
                    //  s.add_user_list.img = 'images/ideas/add/adder_one.png';
                    //s.add_user_list.id = id;
                    s.add_user_list.id = id;
                    s.approval_user[0].approval_company_user_id = id;//保存在 s.ideas中，用于编辑完之后，返回给后端
                    s.approval_user[0].sort = 222;
                    s.hide_add_user = false;//显示

                }
            }
            */

//查找指定的下一步审批人
         /*
            s.goalUser = {};
            s.get_next_user_list = function (name) {
                console.log(name);
                s.goalUser.name = name;
                side_bar_api
                    .get_all_user_list(s.goalUser)
                    .success(function (dat) {
                        s.userList = dat.data;
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            }
*/
//删除选中的下一步审批人
            s.delete_next_user = function () {
                s.add_user_list = {};
                s.hide_add_user = true;
            }

            s.uploadcomplete_img=function (p_item) {
                s.ideas.attachments=JSON.stringify(p_item);
            },
            s.uploadcomplete = function(p_item){
                s.ideas.attachments=JSON.stringify(p_item);
            }
        }]
    )
});


