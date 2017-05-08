//创意待审批详情的控制器
define(["app", "directives/sidebar/sidebar", 'api/setting_api', 'api/ideas_api', 'api/side_bar_api','services/translate_tags_style'], function (myapp) {
    myapp.controller('appr_listDetail_ctrl',
        [
            '$scope',
            '$rootScope',
            '$state',
            'setting_api',
            'ideas_api',
            'side_bar_api',
            'myalert',
            'translate_tags_format',
            function (s, rs, $state, setting_api, ideas_api, side_bar_api, myalert,tags_format) {
                 //用户状态的改变
                rs.eval = 'waitList';
                //用户编号
                var u_c_id = "";
                var Idea = {};//用于保存创意的基本信息
                var Idea_approval = [];//审批人的基本信息
                //当前审批人标记
                var c_approval_i = -1;

                // 没有输入品论就显示提示框
                s.alert_no_info = false;
                //表示已经选中多少人
                s.length = 0;

                s.userList=[];//存储弹出框的人物信息
                s.pre_user_list=[];//待选审核人
                s.sure_user_list = [];//已经确定选择的审核人

//审批意见==（同意与否）的tab 切换
                s.agreeTab = true;
                s.dis_agree_tab = function () {//不同意
                    s.agreeTab = false;
                    s.mock_current_approval.approvalsts = 2;
                    s.add_user_show = false;//隐藏右侧的弹框
                    s.cancel_choice();//删除选中的已经选中的人（userList）
                    s.sure_user_list = [];//删除已经确定添加de下一步人
                },
                s.agree_tab = function () {//同意
                    s.agreeTab = true;
                    s.mock_current_approval.approvalsts = 1;
                },

//接受当前用户的输入信息
                s.mock_current_approval = {
                    remark: '',                 //接受评论的内容
                    approvalsts: s.agreeTab ? 1 : 2 //是否同意
                };

//获取当前用户的信息
                var get_current_user_id = function () {
                    ideas_api
                        .get_user_info()
                        .success(function (data) {
                            u_c_id = data.data.id;//当前用户的ID
                            s.get_appr_detail();
                        })
                        .error(function (data) {
                            console.log(data);
                        });
                }
                get_current_user_id();

//获得当前用户，在approval中的下标
                var get_current_user = function () {
                    angular.forEach(s.appr_detail[0].idea, function (item, key) {//创意的基本信息
                        Idea[key] = item;
                    });
                    angular.forEach(s.appr_detail[0].idea_approval, function (item, key) {//创意的审批信息
                        Idea_approval[key] = item;
                    });

                    //取得u_c_id
                    Idea_approval.forEach(function (item, i) {//创意的审批信息

                        if (item.approval.approval_company_user_id == u_c_id) {
                            c_approval_i = i;
                            console.log(c_approval_i);
                            return 0;
                        }
                    });
                }

//跳转页面获得详细信息
                var inx = {
                    ideaID: $state.params.id, //根据传来的id,获取对应的详情信息
                };
                s.get_appr_detail = function () {
                    ideas_api
                        .get_appr_list_detail(inx)
                        .success(function (data) {
                            s.appr_detail = data.data.data;
                            console.log(s.appr_detail[0]);
                            tags_format.translate_tag(s.appr_detail[0],false);//tags的格式化，false 表示是详情页面
                            get_current_user();
                            s.get_all_user();//获取弹出框的人物列表的信息
                        })
                        .error(function (data) {
                            console.log(data);
                        })
                };

//进入审核时，默认显示已有的下一步审核人
                var get_next_apr_list=function(ary){
                    angular.forEach(ary,function(item,key){
                        item.approval.sort>ary[c_approval_i].approval.sort &&   s.sure_user_list.push(item.user)  ;
                       // console.log(s.sure_user_list)
                    });
                    s.test_state(s.sure_user_list);
                }

//添加用户，弹框。。。。
                s.add_user_show = false;
                s.add_user = function () {
                    s.add_user_show = !s.add_user_show;
                    s.addox = true;
                    s.test_state(s.sure_user_list);

                  //  s.test_state(s.sure_user_list);
                }
                s.bar_cancel = function () {
                    s.add_user_show = false;
                    s.addox = false;
                }

//获的用户弹框的数据(搜索“下一步添加人”)
                s.get_all_user = function () {
                    //s.goalUser = {};
                    //s.goalUser.name = name;
                    side_bar_api
                        .get_all_user_list()
                        .success(function (dat) {
                            s.userList = dat.data;
                            // s.userList.chioce=false;
                             console.log(dat.data);
                            s.test_state(s.pre_user_list);
                            get_next_apr_list(s.appr_detail[0].idea_approval);//得到之前已经选择的审核人
                        })
                        .error(function (data) {
                            console.log(data);
                        });
                }

                s.get_exact_user=function(name){
                    s.goalUser = {};
                    s.goalUser.name = name;
                    side_bar_api
                        .get_all_user_list(s.goalUser)
                        .success(function (dat) {
                            s.userList = dat.data;
                            // s.userList.chioce=false;
                            console.log(dat.data);
                            s.test_state(s.pre_user_list);
                            s.test_state(s.sure_user_list);

                            //get_next_apr_list(s.appr_detail[0].idea_approval);//得到之前已经选择的审核人
                        })
                        .error(function (data) {
                            console.log(data);
                        });
                }

//test_user state （在每一此查询下一步审核人的时候，都要对审核人进行验证，是否之前已经选中）
                s.test_state=function(obj){
                    angular.forEach(obj,function(item){
                        s.choiced_flag(item.id);
                    });
                }

//点击“小圆点”，选择添加的下一步审批人
                s.hide_add_user = true;
              //  s.pre_user_list = [];//用于存放待选审批人
                s.length = 0;//用与显示，已经选择多少人
                s.choice_user = function (sta, name, img, id) {
                    //  s.sure_user_list=[];
                    console.log(sta);
                    if (sta) {//说明选中
                        var user = {};
                        user.sta = sta;//是否选中
                        user.name = name;
                        user.head_image = img;
                        user.id = id;
                        s.pre_user_list.push(user);
                        // console.log(s.pre_user_list);
                    }
                    else {//说明取消
                        angular.forEach(s.pre_user_list, function (val, key) {
                            if (val.id == id) {
                                s.pre_user_list.splice(key, 1);
                                console.log(s.pre_user_list);
                            }
                        });
                    }
                    s.length = s.pre_user_list.length;
                }

//用于验证是否选中
                s.choiced_flag = function (id) {
                    angular.forEach(s.userList,function (item) {
                        if (id == item.id) {
                            item.choice = true;
                           // console.log(item.choice);
                        }
                    })
                }

//选中与非选中的状态改变(小圆点的激活与否)
                s.choiced_flag_changed = function (id) {
                    angular.forEach(s.userList,function (item) {
                        if (id == item.id) {
                            item.choice = !item.choice;

                            if(!item.choice){//表明是要删除此用户
                                s.delete_user(id);
                            }
                        }
                    })

                }

//点击“确定按钮”添加下一步审批人
                s.sure_add_user = function () {
                  // s.sure_user_list = [];//清空
                    angular.forEach(s.pre_user_list, function (item,key) {
                        s.sure_user_list.push({
                            id:item.id,
                            head_image:item.head_image,
                            realname:item.name,
                            rolename:item.rolename,
                            sta:item.sta,
                        });
                    });
                    angular.forEach(s.sure_user_list, function (val, key) {
                        if (val.realname && val.realname.indexOf("--") != -1 && !val.rolename) {
                            var name_official = val.realname.split("--");//进行数据格式化(name--officialName--->数组)
                            val.realname = name_official[0];
                            val.rolename = name_official[1];
                        }
                    });
                    s.pre_user_list=[];//清空
                }

//点击“取消”，清空任务列表
                s.cancel_choice = function () {
                    s.pre_user_list = [];
                    s.chioce = false;
                    angular.forEach(s.userList, function (item, key) {
                        item.choice = false;
                    });
                    s.length = 0;

                }

//点击“删除”，取消选择人
                s.delete_user = function (idx) {
                    angular.forEach(s.userList, function (item, key) {
                        if (idx == item.id) {
                            item.choice = false;
                            s.pre_user_list.splice(key, 1);

                            s.pre_user_list.forEach(function(v,i){
                                if(idx==v.id ) s.pre_user_list.splice(i,1);
                            });

                            s.sure_user_list.forEach(function(v,i){
                                   if(idx==v.id ) s.sure_user_list.splice(i,1);
                            });

                           s.length>0 && s.length--;
                        }
                    });
                }

//删除选中的下一步审批人
                s.delete_next_user = function () {
                    s.add_user_list = {};
                    s.hide_add_user = true;
                }

//输入框得到焦点
                s.get_focus = function () {
                    s.alert_no_info = false;
                }

//保存审批信息
                s.finished_edit = function () {//提交之前的准备工作
                    !finish_before()
                    &&
                    ideas_api
                        .give_approval({Ideas: s.data})
                        .success(function (data) {
                            console.log(data);
                            console.log( Idea_approval[c_approval_i].approval.approvalsts);

                            data.state && myalert.content("编辑成功", "返回上一页") || myalert.content("系统出错", "请稍候");
                             window.history.back();
                        })
                        .error(function (data) {
                            console.log(data);
                        })
                }

//在保存之前的数据处理
                var finish_before = function () {
                    //存储是否同意
                    /*if (s.sure_user_list) {//如果用户添加过下一步审批人（sure_user_list就不为null），就将当前状态该为0
                     s.mock_current_approval.approvalsts = 0;
                     }*/

                    /*
                    if (!s.mock_current_approval.remark) {//用户的评论信息为空(修改为用户可以不用评论)
                        s.alert_no_info = true;
                    }
                    else {
                        s.alert_no_info = false;
                        Idea_approval[c_approval_i].approval.remark = s.mock_current_approval.remark;//将评论信息存储用户对应的数组中
                        Idea_approval[c_approval_i].approval.approvalsts = s.mock_current_approval.approvalsts;
                        console.log( Idea_approval[c_approval_i].approval.approvalsts);
                    }

                    */
                    s.alert_no_info = false;
                    Idea_approval[c_approval_i].approval.remark = s.mock_current_approval.remark;//将评论信息存储用户对应的数组中
                    Idea_approval[c_approval_i].approval.approvalsts = s.mock_current_approval.approvalsts;
                    if (s.sure_user_list && s.agreeTab) {//说明已经选择了下一步审批人,并且用户当前的用户点击的是”同意“
                        if (Idea_approval.length != 0) {
                            console.log(Idea_approval);
                            var lastSort = Idea_approval[Idea_approval.length - 1].approval.sort;
                        }
                        s.sure_user_list.forEach(function (item) {//遍历下一步审批人列表，添加新的内容
                            lastSort = lastSort + 1;//排序加1

                            var obj={
                                approval_company_user_id: item.id,
                                ideasid: Idea_approval[c_approval_i].approval.ideasid,
                                sort: lastSort
                            }
                            Idea_approval.push({approval:obj});
                        });
                    }

                    //配置提交的数据
                    var approvals = [];
                    Idea_approval.forEach(function (item) {
                        approvals.push(item.approval);
                    })
                    s.data = {//存储参数对象
                        Ideas: Idea,
                        ListIdeasApproval: approvals
                    }
                    return s.alert_no_info;//用于表示用户是否输入评论信息
                }

//取消”编辑“，不保存
                s.cancel_save = function () {
                    myalert.alert("取消编辑", "点击完成！", function () {
                        $state.go("home.ideas.appr_list");
                    });
                }
            }]
    )
});