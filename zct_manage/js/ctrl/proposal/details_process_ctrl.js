/**
 * Created by admin on 2017/3/27.
 */
define(["app",'api/proposal_api','api/side_bar_api','services/myalert/myalert','services/setting','services/common'], function (myapp) {
    myapp.controller('details_process_ctrl',['$scope','proposal_api','$state','side_bar_api','myalert','setting','common',function (s,proposal_api,$state,side_bar_api,myalert,setting,common) {
        var id = $state.params.id;
        //获取提案详情信息
        var get_details = function () {
            proposal_api.proposa_detaile({id:id,getType:1})
                .success(function (data) {
                    console.log(data);
                    s.p_detaile = data.data.data;//审核详情
                    //技术交底书
                    s.getFile = function(id)
                    {
                        if(id){
                            proposal_api.getfiledatabyid(id).success(function (data) {
                                s.p_detaile.technology_book = data.data.name;
                            });
                        }
                    };
                    s.getFile(common.getImageID(s.p_detaile.technology_book));
                    //专利检索报告
                    s.getPatentFile = function(id)
                    {
                        if(id){
                            proposal_api.getfiledatabyid(id).success(function (data) {
                                s.p_detaile.patent_search_report = data.data.name;
                            });
                        }
                    };
                    s.getPatentFile(common.getImageID(s.p_detaile.patent_search_report));
                    //其他附件
                    s.getOtherFile = function(id)
                    {
                        if(id){
                            proposal_api.getfiledatabyid(id).success(function (data) {
                                s.p_detaile.other_attachments = data.data.name;
                            });
                        }
                    };
                    s.getOtherFile(common.getImageID(s.p_detaile.other_attachments));
                    //获取图片详情
                    s.p_detaile.technology_drawings=setting.url_href.down_img+"/"+common.getImageID(s.p_detaile.technology_drawings);
                    //审批人信息
                    s.p_approvallist = data.data.approvalList;
                    //s.approvaluser = s.p_approvallist.ApprovalUser;//审批用户
                    //s.approvaldate = s.p_approvallist.ApprovalDate;//审核日期
                    //s.approvaluserheadportrait = s.p_approvallist.ApprovalUserHeadPortrait;//审批用户头像
                   // s.approvalsts = s.p_approvallist.approvalsts;//状态
                    //s.remark = s.p_approvallist.remark;//审核标记
                    //当前审批人后面的审批列表
                    s.approvalUserList = data.data.approvalUserList;
                    console.log(s.approvalUserList);
                    /*s.userid = s.approvalUserList.id;//审批人id
                    s.name = s.approvalUserList.name;//审批人姓名
                    s.sort = s.approvalUserList.sort;//审批人顺序*/
                })
        };
        get_details();

        //添加下一步审核人“弹框的出现”
        s.add_user_show = false;
        s.add_user = function () {
            s.add_user_show = !s.add_user_show;
            if(s.add_user_show){
                //s.get_user_list();//获得用户列表的信息
            }
        };
        s.bar_cancel = function () {
            s.add_user_show = false;
        }

//获得弹出框列表的数据(userList),点击“+”
        var get_user_list=function(){
            side_bar_api
                .get_all_user_list({name:s.keyWords})
                .success(function (dat) {
                    s.userList = dat.data;
                    s.userList.chioce=false;
                    console.log(dat.data);
                })
                .error(function (data) {
                    console.log(data);
                });
        };
        get_user_list();
        s.get_list = function(){
            get_user_list();
            console.log("*****")
        };

//用户被选中与否(激活小圆点)，choiced_flag
        s.choiced_flag=function(id){
            s.userList.forEach(function(item){
                if(item.choice && id==item.id) {
                    item.choice = false;
                }
                else if(id==item.id){
                    item.choice=true;
                }
            });
            // console.log(s.userList);
        };
        //激活小圆点，搜索框顶部列举出已经被选中的人
        s.choicedNum = 0;
        s.get_pre_user=function(){
            s.pre_user_list=[];
            angular.forEach(s.userList,function(item,key){
                if(item.choice){
                    s.pre_user_list.push(item);
                }
                console.log( s.pre_user_list);
                s.choicedNum = s.pre_user_list.length;
            });
        };

//选完“审批人”，点击确定按钮
        s.get_sure_user=function(){
            s.sure_user_list=[];
            angular.forEach(s.pre_user_list,function(item){
                s.approvalUserList.push(item);
            });
            angular.forEach(s.approvalUserList,function(val,key){
                if (val.name && val.name.indexOf("--")!=-1) {
                    var name_official = val.name.split("--");//进行数据格式化(name--officialName--->数组)
                    val.name = name_official[0];
                    val.officialName = name_official[1];
                }
            });
        };
//鼠标移入“下一步审批人 ”，出现删除按钮，点击点击删除按钮
        s.delete_user=function(id,idx){//参数1:ID  参数2：待删除元素的下标值
            //s.sure_user_list=[]; s.pre_user_list=[];
            console.log(idx);
            s.approvalUserList.splice(idx,1);
            s.pre_user_list.splice(idx,1);
            angular.forEach(s.userList,function(item,key){
                (item.id==id) && (item.choice=false);
            });
        };
        //是否同意
        s.mock_current_approval={
            remark: '',               //接受评论的内容
            appr:'2' //是否同意
        };
        s.agree = function(){
            s.agreeTab = true;
            s.mock_current_approval.appr = '2';
        };
        s.disagree = function(){
            s.agreeTab = false;
            s.mock_current_approval.appr = '1';
        };
        //审核
        s.approvalProposal = function(){
            //获取后面审批人数组
            s.userArr = [];
            angular.forEach(s.approvalUserList,function(p_item,index){
                var obj = {id:p_item.id,sort:index};
                s.userArr.push(obj);
            });
            var approvalStatus = 0;
            angular.forEach(s.p_approvallist,function(p_item,index){
               if(p_item.id == id){
                   approvalsts = p_item.approvalsts;
                   remark = p_item.remark;
               }
            });
            if(s.mock_current_approval.appr == '1'){
                s.userArr = [];
            }
            var send_obj = {
                //后面的审批人
                approvalUserList: s.userArr,
                //审核实体
                pa:{
                    approvalsts: s.mock_current_approval.appr,   // 审核状态 ‘2’是同意 ‘1’是不同意
                    proposalid:id,      //提案id
                    remark: s.mock_current_approval.remark
                }
            };
            proposal_api.approvalProposal(send_obj).success(function(data){
                console.log("%%%%%%%%%%%%%%%%%%%%%%%",send_obj);
                if(data.state=='true'){
                    myalert.alert('提交成功！','查看待审核提案',function(){
                        $state.go('home.proposal.wait_process');
                    })
                }else{
                    myalert.content(data.msg);
                }
            });
        };

    }]);
});
