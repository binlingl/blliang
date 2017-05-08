/**
 * Created by admin on 2017/3/21.
 */
define(["app", 'echarts','api/proposal_api','directives/myfileuploder/myfileuploader','api/side_bar_api'],
    function (myapp, echarts) {
        myapp.controller('add_ctrl',['$scope','proposal_api','myalert','side_bar_api','$state', function (s,proposal_api,myalert,side_bar_api,$state) {
            s.alltypes = ['发明','实用新型','外观设计'];
            s.nameempty = false;
            s.typeempty = false;
            //提案编号
            var get_pro_num = function(){
                proposal_api.createCassNumber()
                    .success(function (data) {
                        console.log(data) ;
                        s.casenumber = data.data;
                    })
            };
            get_pro_num();
            //提案部门
            var get_pat_list = function () {
                proposal_api.GetDepartmentlist()
                    .success(function (data) {
                        s.partmentoption = data.data.DepartmentList;
                    })
            };
            get_pat_list();
            s.setpartment = function (partments) {
                s.partments = partments;
                s.departmentid = partments.id;
            };

            s.init={
                address:'',
                attachment:'',
                username:'',
                phone:'',
                weixin:''
            };
            s.upload_file_collecdoc=function(fileids){
                console.log(fileids);
                // s.init.attachment=p_data;
                s.init.attachment=JSON.stringify(fileids);
            };

            //添加下一步审核人“弹框的出现”
            s.add_user_show = false;
            s.add_user = function () {
                s.add_user_show = !s.add_user_show ;
                console.log(s.add_user_show);
            };
            s.bar_cancel = function () {
                s.add_user_show = false;
            }

//获得弹出框列表的数据(userList),点击“+”
            s.keyWords = '';
            var get_user_list=function(keyWords){
                side_bar_api
                    .get_all_user_list({name:keyWords})
                    .success(function (dat) {

                        s.userList = dat.data;
                        s.userList.chioce=false;
                        angular.forEach(s.pre_user_list,function(p_item){
                            s.choiced_flag(p_item.id);
                        });
                        console.log(dat.data);
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            };
            get_user_list(s.keyWords);
            s.get_list = function(keyWords){
                get_user_list(keyWords);
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
            s.pre_user_list=[];
            s.get_pre_user=function(item){
                console.log(item);
                if(item.choice){
                    s.pre_user_list.push(item);
                }else {
                    for (var i=0;i<s.pre_user_list.length;i++){
                        if(s.pre_user_list[i].id==item.id){
                            s.pre_user_list.splice(i,1);
                        }
                    }
                }
                s.choicedNum = s.pre_user_list.length;
            }
//选完“审批人”，点击确定按钮
            s.sure_user_list=[];
            s.user_length = s.sure_user_list.length;
            s.get_sure_user=function(){
                s.pre_user_list.forEach(function(item){
                    if(s.sure_user_list.indexOf(item) == -1){
                        s.sure_user_list.push(item);
                    }
                });
                s.sure_user_list.forEach(function(item){
                    if(s.pre_user_list.indexOf(item) == -1){
                        s.sure_user_list = s.pre_user_list;
                    }
                });
                s.user_length = s.sure_user_list.length;
                angular.forEach(s.sure_user_list,function(val,key){
                    if (val.name && val.name.indexOf("--")!=-1) {
                        var name_official = val.name.split("--");//进行数据格式化(name--officialName--->数组)
                        val.name = name_official[0];
                        val.officialName = name_official[1];
                    }
                });
            }
//鼠标移入“下一步审批人 ”，出现删除按钮，点击点击删除按钮
            s.delete_user=function(id,idx){//参数1:ID  参数2：待删除元素的下标值
                //s.sure_user_list=[]; s.pre_user_list=[];
                console.log(idx);
                //  s.userList[idx].choice=false;
                angular.forEach(s.userList,function(item,key){
                    (item.id==id) && (item.choice=false);
                });
                s.sure_user_list.splice(idx,1);
                s.pre_user_list.splice(idx,1);
            };
            /*技术交底书*/
            s.upload_file_attachment=function(fileids){
                s.technology_book = JSON.stringify(fileids);
            };
            /*技术交底附图*/
            s.uploadcom_patent_drawing = function(fileids){
                s.technology_drawings = JSON.stringify(fileids);
                console.log('****************',s.technology_drawings);
            };
            /*专利检索报告*/
            s.upload_search_report = function(fileids){
                s.patent_search_report = JSON.stringify(fileids);
            };
            /*其他附件*/
            s.upload_file_otherattachment = function(fileids){
                s.other_attachments = JSON.stringify(fileids);
            };
//点击“保存”按钮，保存信息
            s.addProposals = function(){
                if(!s.proposalname && !s.type) {
                    s.nameempty = true;
                    s.typeempty = true;
                    myalert.content("请补提案信息");
                }else if(!s.proposalname) {
                    s.nameempty = true;
                    myalert.content("提案名称不能为空");
                }else if(!s.type) {
                    s.typeempty = true;
                    myalert.content("请选择提案类型");
                }
                else if(s.user_length == 0){
                    myalert.content("请选择审核人");
                }else{
                    var approval_users = [];
                    angular.forEach(s.sure_user_list,function(p_item,index){
                        var user_obj = {id:p_item.id,sort:index};
                        approval_users.push(user_obj);
                    });
                    console.log(approval_users);
                    s.send_obj = {
                        approvalUserList:approval_users,//审批人（id 顺序）
                        /*提案实体*/
                        proposal:{
                            casenumber: s.casenumber,//案号
                            contractor: s.contractor,//承办人
                            departmentid: s.departmentid,//提案部门
                            first_inventor_idcard: s.first_inventor_idcard,//第一发明人身份证
                            inventor: s.inventor,//发明人
                            keyword: s.keyword,//提案关键字
                            name: s.proposalname,//提案名称
                            other_attachments: s.other_attachments,//其他附件
                            patent_search_report: s.patent_search_report,//专利检索附件
                            products: s.products,//所属产品
                            remark: s.remark,//备注
                            summary: s.summary,//摘要
                            summary_invention: s.summary_invention,//发明点概述
                            technical_field: s.technical_field,//技术领域
                            technology_book: s.technology_book,//技术交底书
                            technology_drawings: s.technology_drawings,//技术交底书附图
                            type: s.type//提案类型
                        }
                    };
                    proposal_api
                        .addProposal(s.send_obj)
                        .success(function(data){
                            if(data.state){
                                console.log(data);
                                //保存成功，弹框祝贺
                                myalert.alert("提案保存成功","查看我的提案",function(){
                                    $state.go('home.proposal.my_list');
                                });
                            }

                        })
                        .error(function(data){
                            console.log(data);
                        })
                };
            };


        }]);
    });
