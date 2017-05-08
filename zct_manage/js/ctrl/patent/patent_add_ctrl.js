define(["app", "echarts", "directives/sidebar/sidebar", 'api/patent_api','services/common','services/myalert/myalert'], function (myapp, echarts) {
    myapp.controller('patent_add_ctrl',
        ['$scope', 'patent_api', '$state','common', 'myalert','$uibModal',function (s, patent_api, $state,common,myalert,$uibModal) {
            console.log('patent_add_ctrl');
            //操作id(添加和修改)
            var patentid = $state.params.patentid;
            //显示tab的初始化
            var tab_ = $state.params.tab;
            //定义tab数据
            s.tab = {
                infoP: false,
                help: false,
                cost: false
            };
            //tab切换事件
            s.tab_action = function (v) {
                switch (v) {
                    case 'infoP':
                        s.tab.infoP = true;
                        s.tab.help = false;
                        s.tab.cost = false;
                        break;
                    case 'help':
                        s.tab.infoP = false;
                        s.tab.help = true;
                        s.tab.cost = false;
                        break;
                    case 'cost':
                        s.tab.infoP = false;
                        s.tab.help = false;
                        s.tab.cost = true;
                        break;
                }
                console.log(s.tab);
            };
            //定义专利基本信息对象
            s.add_patent = {
                agency: '',//代理机构
                agent: '',//代理人
                announcement_number: '',//公告号
                application_date: '',//申请日
                application_number: '',//申请号
                apply_country: '',//申请国家
                authorization_date: '',//授权日
                authorization_notice_date: '',//授权公告日
                casenumber: '',//案号
                certificate_number: '',//证书号
                contractor: '',//承办人
                deadlines_date: '',//截稿日期
                departmentid: '',//提案部门
                first_inventor_idcard: '',//第一发明人身份证
                invalid_date: '',//无效
                invalid_reason: '',//无效原因，有以下几种：主动放弃，驳回，未缴年费
                inventor: '',//发明人，可以有多个
                ipc: '',//IPC分类号
                keyword: '',//关键字
                name: '',//专利名称
                other_attachments: '',//其他附件
                paid_annually_date: '',//待缴年费日
                patent_man: '',//权利人
                patent_search_report: '',//专利检索报告
                products: '',//所属产品
                proposal_fraction: '',//提案评分
                proposalid: '',//对应提案，可以是多个，多个时用‘
                public_date: '',//公开日
                public_number: '',//公开号
                remark: '',//备注
                status: '',//专利状态
                status_str:'',
                summary: '',//摘要
                summary_invention: '',//发明点概述
                technical_field: '',//技术领域
                technology_book: '',//技术交底书
                technology_drawings: '',//技术交底附图
                termination_date: '',//专利权终止日
                trade_status: '',//交易状态
                type: '',//专利类型，有如下几种：发明，实用新型，外观设计
                id: '',
                proposalList: '',//对应提案
                updated_at:'',
                updateduser:'',
                created_at:'',
                createduser:'',
            }
            /*系统自动生成专利案号
             * 调用/manage/ManagePatent/CreateCaseNumber接口*/
            var getCaseNum = function () {
                patent_api.getCaseNumber().success(function (data) {
                    s.add_patent.casenumber = data.data;
                }).error(function (err) {

                });
            };

            //获取提案部门
            var getDepartment = function () {
                patent_api.GetDepartment().success(function (data) {
                    s.departmentList = data.data.DepartmentList;
                }).error(function (err) {

                })
            };
            //获取国家
            var getCountry = function () {
                s.CountryList = [];
                patent_api.getCountry().success(function (data) {
                    s.CountryList = data.data;
                })
            };
            //获取对应提案
            s.getProposalid = function () {
                patent_api.GetProposalListByName({name: s.add_patent.name}).success(function (data) {
                    console.log(data);
                    if (data.data && data.data.length > 0) {
                        s.add_patent.proposalList = data.data;
                        for (var i = 0; i < data.data.lenth; i++) {
                            s.add_patent.Proposalid += data.data[i].name + " ";
                        }
                    }
                })
            };

            //申请费用列表，申请费用添加成功的时候，push一条数据到此数组
            s.ApplicationfeeList = [];
            //申请费用对象
            s.ApplicationfeeData = {
                agency_fees: '',//	代理费
                beneficiary: '',//	收款方
                contacts: '',//		string
                name: '',//		string
                official_fee: '',//	官费
                paid_amount: '',//	已付金额
                patentid: '',//	专利ID
                payment_date: '',//	付费日期
                payment_status: '',//	付款状态
                phone: '',//		string
                remark: '',//		string
                total_cost: '',//	费用总额
                id: ''
            };
            //专利年费列表
            s.AnnualfeeList = [];
            //专利年费对象
            s.AnnualfeeData = {
                annualfee_amount: '',//	年费金额
                annualfee_year: '',//	年份
                beneficiary: '',//	收款方
                contacts: '',//		string
                late_fee: '',//	滞纳金
                paid_amount: '',//	已付金额
                patentid: '',//	专利ID
                payment_date: '',//	付费日期
                payment_status: '',//	付款状态
                phone: '',//		string
                remark: '',//		string
                total_cost: '',//	费用总额
                id: ''
            };
            //奖励费用列表
            s.RewardList = [];
            //奖励费用对象
            s.RewardData = {
                name: '',	//
                patentid: '',	//专利ID
                remark: '',	//
                reward_document: '',	//公文
                reward_quota: '',	//奖励额度
                sent_amount: '',	//已付金额
                sent_date: '',	//发奖日期
                sent_status: '',	//付款状态
                total_cost: '',	//费用总额
                winners: '',	//奖励人
                id: ''
            };
            //资助费用列表
            s.FundedList = [];
            //资助费用对象
            s.FundedData = {
                applicant_date: '',	//申请日期
                applicant_man: '',	//申请人
                funded_amount: '',	//资助金额
                name: '',		//string
                patentid: '',	//专利ID
                remark: '',		//string
                sent_date: '',	//发奖日期
                sent_document: '',	//公文
                id: ''
            }

            //赋值
            var DetailToPatent=function (data) {
                //编辑初始值
                s.add_patent = data.data.patent;
                s.ApplicationfeeList = data.data.applicationfeeList;
                s.AnnualfeeList = data.data.annualfeeList;
                s.RewardList = data.data.rewardList;
                s.FundedList = data.data.fundedList;
                //编辑费用对象先添加 patentid
                s.ApplicationfeeData.patentid = data.data.patent.id;
                s.AnnualfeeData.patentid = data.data.patent.id;
                s.RewardData.patentid = data.data.patent.id;
                s.FundedData.patentid = data.data.patent.id;
                //专利基本信息时间转换
                s.add_patent.application_date=s.add_patent.application_date==null?"":new Date(s.add_patent.application_date);
                s.add_patent.authorization_date=s.add_patent.authorization_date== null ? "":new Date(s.add_patent.authorization_date);
                s.add_patent.authorization_notice_date=s.add_patent.authorization_notice_date== null ? "":new Date(s.add_patent.authorization_notice_date);
                s.add_patent.deadlines_date=s.add_patent.deadlines_date== null ? "":new Date(s.add_patent.deadlines_date);
                s.add_patent.paid_annually_date=s.add_patent.paid_annually_date== null ? "":new Date(s.add_patent.paid_annually_date);
                s.add_patent.public_date=s.add_patent.public_date== null ? "":new Date(s.add_patent.public_date);
                s.add_patent.termination_date=s.add_patent.termination_date== null ? "":new Date(s.add_patent.termination_date);
                s.add_patent.invalid_date=s.add_patent.invalid_date== null ? "":new Date(s.add_patent.invalid_date);
                //申请费用时间转换
                for(var i =0;i<s.ApplicationfeeList.length;i++){
                    s.ApplicationfeeList[i].payment_date=s.ApplicationfeeList[i].payment_date==null?'':new  Date(s.ApplicationfeeList[i].payment_date);
                }
                //专利年费时间转换
                for(var i=0;i<s.AnnualfeeList.length;i++){
                    s.AnnualfeeList[i].annualfee_year=s.AnnualfeeList[i].annualfee_year==null?"":new Date(s.AnnualfeeList[i].annualfee_year);
                    s.AnnualfeeList[i].payment_date=s.AnnualfeeList[i].payment_date==null?"":new Date(s.AnnualfeeList[i].payment_date);
                }
                //奖励费用时间转换
                for(var i=0;i<s.RewardList.length;i++){
                    s.RewardList[i].sent_date =s.RewardList[i].sent_date==null?"":new Date(s.RewardList[i].sent_date);
                }
                //资助费用时间转换
                for(var i=0;i<s.FundedList.length;i++){
                    s.FundedList[i].applicant_date =s.FundedList[i].applicant_date==null?"":new Date(s.FundedList[i].applicant_date);
                    s.FundedList[i].sent_date =s.FundedList[i].sent_date==null?"":new Date(s.FundedList[i].sent_date);
                }

            }
            var init = function () {
                //显示费用；隐藏专利基本信息
                if (tab_ && tab_ == 'cost') {
                    s.tab_action('cost');
                }
                //获取提案部门
                getCountry();
                getDepartment();
                if (patentid) {
                    s.headInfo=true;
                    patent_api.GetPatent({id: patentid}).success(function (data) {
                        // //编辑初始值
                        // s.add_patent = data.data.patent;
                        // s.ApplicationfeeList = data.data.applicationfeeList;
                        // s.AnnualfeeList = data.data.annualfeeList;
                        // s.RewardList = data.data.rewardList;
                        // s.FundedList = data.data.fundedList;
                        // //编辑费用对象先添加 patentid
                        // s.ApplicationfeeData.patentid = data.data.patent.id;
                        // s.AnnualfeeData.patentid = data.data.patent.id;
                        // s.RewardData.patentid = data.data.patent.id;
                        // s.FundedData.patentid = data.data.patent.id;
                        // //专利基本信息时间转换
                        // s.add_patent.application_date=s.add_patent.application_date==null?"":new Date(s.add_patent.application_date);
                        // s.add_patent.authorization_date=s.add_patent.authorization_date== null ? "":new Date(s.add_patent.authorization_date);
                        // s.add_patent.authorization_notice_date=s.add_patent.authorization_notice_date== null ? "":new Date(s.add_patent.authorization_notice_date);
                        // s.add_patent.deadlines_date=s.add_patent.deadlines_date== null ? "":new Date(s.add_patent.deadlines_date);
                        // s.add_patent.paid_annually_date=s.add_patent.paid_annually_date== null ? "":new Date(s.add_patent.paid_annually_date);
                        // s.add_patent.public_date=s.add_patent.public_date== null ? "":new Date(s.add_patent.public_date);
                        // s.add_patent.termination_date=s.add_patent.termination_date== null ? "":new Date(s.add_patent.termination_date);
                        // s.add_patent.invalid_date=s.add_patent.invalid_date== null ? "":new Date(s.add_patent.invalid_date);
                        // //申请费用时间转换
                        // for(var i =0;i<s.ApplicationfeeList.length;i++){
                        //     s.ApplicationfeeList[i].payment_date=s.ApplicationfeeList[i].payment_date==null?'':new  Date(s.ApplicationfeeList[i].payment_date);
                        // }
                        // //专利年费时间转换
                        // for(var i=0;i<s.AnnualfeeList.length;i++){
                        //     s.AnnualfeeList[i].annualfee_year=s.AnnualfeeList[i].annualfee_year==null?"":new Date(s.AnnualfeeList[i].annualfee_year);
                        //     s.AnnualfeeList[i].payment_date=s.AnnualfeeList[i].payment_date==null?"":new Date(s.AnnualfeeList[i].payment_date);
                        // }
                        // //奖励费用时间转换
                        // for(var i=0;i<s.RewardList.length;i++){
                        //     s.RewardList[i].sent_date =s.RewardList[i].sent_date==null?"":new Date(s.RewardList[i].sent_date);
                        // }
                        // //资助费用时间转换
                        // for(var i=0;i<s.FundedList.length;i++){
                        //     s.FundedList[i].applicant_date =s.FundedList[i].applicant_date==null?"":new Date(s.FundedList[i].applicant_date);
                        //     s.FundedList[i].sent_date =s.FundedList[i].sent_date==null?"":new Date(s.FundedList[i].sent_date);
                        // }
                        DetailToPatent(data);
                        s.tab.infoP=true;
                    })
                }else {
                    s.tab.infoP=true;
                    s.headInfo=false;
                    //获取专利案号
                    getCaseNum();
                }
            };
            init();


            //费用添加窗口控制
            s.isShow = {
                //专利费用
                PatentCost: false,
                //专利年费
                AddAward: false,
                //奖励费用
                AddCost: false,
                //资助费用
                AddHelp: false
            };
            //费用添加窗口控制事件
            s.openCost = function (v,type,index) {
                switch(v){
                    case "PatentCost":
                        if (type == 'add') {
                            s.ApplicationfeeData.agency_fees = '';
                            s.ApplicationfeeData.beneficiary = '';
                            s.ApplicationfeeData.contacts = '';
                            s.ApplicationfeeData.name = '';
                            s.ApplicationfeeData.official_fee = '';
                            s.ApplicationfeeData.paid_amount = '';
                            s.ApplicationfeeData.payment_date = '';
                            s.ApplicationfeeData.payment_status = '';
                            s.ApplicationfeeData.phone = '';
                            s.ApplicationfeeData.remark = '';
                            s.ApplicationfeeData.total_cost = '';
                            s.ApplicationfeeData.id = '';
                        } else if (type == 'edit') {
                            s.ApplicationfeeData.agency_fees = s.ApplicationfeeList[index].agency_fees;
                            s.ApplicationfeeData.beneficiary = s.ApplicationfeeList[index].beneficiary;
                            s.ApplicationfeeData.contacts = s.ApplicationfeeList[index].contacts;
                            s.ApplicationfeeData.name = s.ApplicationfeeList[index].name;
                            s.ApplicationfeeData.official_fee = s.ApplicationfeeList[index].official_fee;
                            s.ApplicationfeeData.paid_amount = s.ApplicationfeeList[index].paid_amount;
                            s.ApplicationfeeData.patentid = s.ApplicationfeeList[index].patentid;
                            s.ApplicationfeeData.payment_date = s.ApplicationfeeList[index].payment_date;
                            s.ApplicationfeeData.payment_status = s.ApplicationfeeList[index].payment_status;
                            s.ApplicationfeeData.phone = s.ApplicationfeeList[index].phone;
                            s.ApplicationfeeData.remark = s.ApplicationfeeList[index].remark;
                            s.ApplicationfeeData.total_cost = s.ApplicationfeeList[index].total_cost;
                            s.ApplicationfeeData.id = s.ApplicationfeeList[index].id;
                        }
                        var modalInstance = $uibModal.open({
                            animation:true,
                            templateUrl:"tpls/patent/add/addPatentCost.html",
                            controller:"add_patent_cost_ctrl",
                            size:'lg',
                            resolve:{
                                item:function () {
                                    return s.ApplicationfeeData;
                                }
                            }
                        });
                        modalInstance.result.then(function(data){
                            s.ApplicationfeeData = data;
                            s.saveApplicationfee();
                        },function(data){
                            console.log(data);
                        });
                        break;
                    case "AddAward":
                        if (type == 'add') {
                            s.AnnualfeeData.annualfee_amount = '';
                            s.AnnualfeeData.annualfee_year = '';
                            s.AnnualfeeData.beneficiary = '';
                            s.AnnualfeeData.contacts = '';
                            s.AnnualfeeData.late_fee = '';
                            s.AnnualfeeData.paid_amount = '';
                            // s.AnnualfeeData.patentid='';
                            s.AnnualfeeData.payment_date = '';
                            s.AnnualfeeData.payment_status = '';
                            s.AnnualfeeData.phone = '';
                            s.AnnualfeeData.remark = '';
                            s.AnnualfeeData.total_cost = '';
                            s.AnnualfeeData.id = '';
                        } else if (type == 'edit') {
                            s.AnnualfeeData.annualfee_amount = s.AnnualfeeList[index].annualfee_amount;
                            s.AnnualfeeData.annualfee_year = s.AnnualfeeList[index].annualfee_year;
                            s.AnnualfeeData.beneficiary = s.AnnualfeeList[index].beneficiary;
                            s.AnnualfeeData.contacts = s.AnnualfeeList[index].contacts;
                            s.AnnualfeeData.late_fee = s.AnnualfeeList[index].late_fee;
                            s.AnnualfeeData.paid_amount = s.AnnualfeeList[index].paid_amount;
                            s.AnnualfeeData.patentid = s.AnnualfeeList[index].patentid;
                            s.AnnualfeeData.payment_date = s.AnnualfeeList[index].payment_date;
                            s.AnnualfeeData.payment_status = s.AnnualfeeList[index].payment_status;
                            s.AnnualfeeData.phone = s.AnnualfeeList[index].phone;
                            s.AnnualfeeData.remark = s.AnnualfeeList[index].remark;
                            s.AnnualfeeData.total_cost = s.AnnualfeeList[index].total_cost;
                            s.AnnualfeeData.id = s.AnnualfeeList[index].id;
                        }
                        var addAward = $uibModal.open({
                            animation:true,
                            templateUrl:"tpls/patent/add/addAwardCost.html",
                            controller:"add_award_cost_ctrl",
                            size:'lg',
                            resolve:{
                                item:function () {
                                    return s.AnnualfeeData;
                                }
                            }
                        });
                        addAward.result.then(function(data){
                            s.AnnualfeeData = data;
                            s.saveAnnualfee();
                        },function(data){
                            console.log(data);
                        });
                        break;
                    case "AddCost":
                        if (type == 'add') {
                            s.RewardData.name = '';
                            // s.RewardData.patentid='';
                            s.RewardData.remark = '';
                            s.RewardData.reward_document = '';
                            s.RewardData.reward_quota = '';
                            s.RewardData.sent_amount = '';
                            s.RewardData.sent_date = '';
                            s.RewardData.sent_status = '';
                            s.RewardData.total_cost = '';
                            s.RewardData.winners = '';
                            s.RewardData.id = '';
                        } else if (type == 'edit') {
                            s.RewardData.name = s.RewardList[index].name;
                            s.RewardData.patentid = s.RewardList[index].patentid;
                            s.RewardData.remark = s.RewardList[index].remark;
                            s.RewardData.reward_document = s.RewardList[index].reward_document;
                            s.RewardData.reward_quota = s.RewardList[index].reward_quota;
                            s.RewardData.sent_amount = s.RewardList[index].sent_amount;
                            s.RewardData.sent_date = s.RewardList[index].sent_date;
                            s.RewardData.sent_status = s.RewardList[index].sent_status;
                            s.RewardData.total_cost = s.RewardList[index].total_cost;
                            s.RewardData.winners = s.RewardList[index].winners;
                            s.RewardData.id = s.RewardList[index].id;
                        }
                        var addCost = $uibModal.open({
                           animation:true,
                            templateUrl:"tpls/patent/add/addSomeCost.html",
                            controller:'add_some_cost_ctrl',
                            size:'lg',
                            resolve:{
                                item:function(){
                                    return s.RewardData;
                                }
                            }
                        });
                        addCost.result.then(function(data){
                            s.RewardData = data;
                            s.saveReward();
                            console.log(data);
                        },function(data){
                            console.log(data);
                        });
                        break;
                    case "AddHelp":
                        if (type == 'add') {
                            s.FundedData.applicant_date = '';
                            s.FundedData.applicant_man = '';
                            s.FundedData.funded_amount = '';
                            s.FundedData.name = '';
                            // s.FundedData.patentid='';
                            s.FundedData.remark = '';
                            s.FundedData.sent_date = '';
                            s.FundedData.sent_document = '';
                            s.FundedData.id = '';
                        } else if (type == 'edit') {
                            s.FundedData.applicant_date = s.FundedList[index].applicant_date;
                            s.FundedData.applicant_man = s.FundedList[index].applicant_man;
                            s.FundedData.funded_amount = s.FundedList[index].funded_amount;
                            s.FundedData.name = s.FundedList[index].name;
                            s.FundedData.patentid = s.FundedList[index].patentid;
                            s.FundedData.remark = s.FundedList[index].remark;
                            s.FundedData.sent_date = s.FundedList[index].sent_date;
                            s.FundedData.sent_document = s.FundedList[index].sent_document;
                            s.FundedData.id = s.FundedList[index].id;
                        }
                        var addHelp = $uibModal.open({
                            animation:true,
                            templateUrl:'tpls/patent/add/addHelpCost.html',
                            controller:'add_help_ctrl',
                            size:'lg',
                            resolve:{
                                item:function(){
                                    return s.FundedData;
                                }
                            }
                        });
                        addHelp.result.then(function(data){
                            console.log(data);
                            s.FundedData = data;
                            s.saveFunded();
                        },function(data){
                            console.log(data);
                        });
                        break;
                }
            }

            //保存基本信息事件
            s.savePatent = function () {
                if(!s.add_patent.type){
                    myalert.alert('','专利类型没有选择','')
                    return
                }
                if(!s.add_patent.trade_status){
                    myalert.alert('','交易状态没有选择','')
                    return
                }
                if(!s.add_patent.status){
                    myalert.alert('','专利状态没有选择','')
                    return
                }
                patent_api.savePatent(s.add_patent)
                    .success(function (data) {
                        if (data.data) {
                            s.ApplicationfeeData.patentid = data.data;
                            s.AnnualfeeData.patentid = data.data;
                            s.RewardData.patentid = data.data;
                            s.FundedData.patentid = data.data;
                            myalert.alert('提示','保存成功',function () {
                            })
                        }else if(data.data==null&&data.state=='true'&&data.state=='true'&&data.isOK=='true'){
                            myalert.alert('提示','保存成功',function () {
                            })
                        }else {
                            myalert.alert('提示','保存失败',function () {
                            })
                        }
                    })
                    .error(function () {
                        console.log('调取失败')
                    });
            };
            //保存申请费用事件
            s.saveApplicationfee = function () {
                if(!s.ApplicationfeeData.payment_status){
                    myalert.alert('','付款状态不能为空','');
                    return
                }
                patent_api.SaveApplicationfee(s.ApplicationfeeData).success(function (data) {
                    if (data.data) {
                        if (s.ApplicationfeeData.id != data.data) {
                            s.ApplicationfeeData.id = data.data;
                            s.ApplicationfeeList.push(_.clone(s.ApplicationfeeData));
                        } else {
                            patent_api.GetPatent({id: s.ApplicationfeeData.patentid}).success(function (data) {
                                DetailToPatent(data);
                            });
                        }
                        s.openCost('close', 'add', 0);
                    } else {
                    }
                })
            };
            //保存专利年费事件
            s.saveAnnualfee = function () {
                patent_api.SaveAnnualfee(s.AnnualfeeData).success(function (data) {
                    if (data.data) {
                        if (s.AnnualfeeData.id != data.data) {
                            s.AnnualfeeData.id = data.data;
                            s.AnnualfeeList.push(_.clone(s.AnnualfeeData));
                        } else {
                            patent_api.GetPatent({id: s.AnnualfeeData.patentid}).success(function (data) {
                                DetailToPatent(data);
                            });
                        }
                        myalert.alert('提示','保存成功',function () {

                        })
                        s.openCost('close', 'add', 0);
                    } else {
                    }
                })
            };
            //保存奖励费用事件
            s.saveReward = function () {
                console.log('付款状态还没选择');
                if(!s.RewardData.sent_status){
                    myalert.alert('','付款状态还没选择','')
                }else{
                    patent_api.SaveReward(s.RewardData).success(function (data) {
                        if (data.data) {
                            if (s.RewardData.id != data.data) {
                                s.RewardData.id = data.data;
                                s.RewardList.push(_.clone(s.RewardData));
                            } else {
                                patent_api.GetPatent({id: s.RewardData.patentid}).success(function (data) {
                                    DetailToPatent(data);
                                });
                            }
                            s.openCost('close', 'add', 0);
                        } else {
                        }
                    });
                }

            };
            //保存资助费用事件
            s.saveFunded = function () {
                patent_api.SaveFunded(s.FundedData).success(function (data) {
                    if (data.data) {
                        if (s.FundedData.id != data.data) {
                            s.FundedData.id = data.data;
                            s.FundedList.push(_.clone(s.FundedData));
                        } else {
                            patent_api.GetPatent({id: s.FundedData.patentid}).success(function (data) {
                                DetailToPatent(data);
                            });
                        }
                        s.openCost('close', 'add', 0);
                    } else {
                    }
                });
            };
            s.deleteCost = function (costType, id, index) {
                var deleteParams = {id: id};
                switch (costType) {
                    case "Applicationfee":
                        patent_api.DeleteApplicationfee(deleteParams).success(function (data) {
                            patent_api.GetPatent({id: s.ApplicationfeeData.patentid}).success(function (data) {
                                DetailToPatent(data);
                            });
                        });
                        break;
                    case "Annualfee":
                        patent_api.DeleteAnnualfee(deleteParams).success(function (data) {
                            patent_api.GetPatent({id: s.AnnualfeeData.patentid}).success(function (data) {
                                DetailToPatent(data);
                            });
                        });
                        break;
                    case "Reward":
                        patent_api.DeleteReward(deleteParams).success(function (data) {
                            patent_api.GetPatent({id: s.RewardData.patentid}).success(function (data) {
                                DetailToPatent(data);
                            });
                        });
                        break;
                    case "Funded":
                        patent_api.DeleteFunded(deleteParams).success(function (data) {
                            patent_api.GetPatent({id: s.FundedData.patentid}).success(function (data) {
                                DetailToPatent(data);
                            });
                        });
                        break;
                }

            }
            //技术交底书
            s.technology_book_fun = function (fileids) {
                s.add_patent.technology_book = JSON.stringify(fileids);
            };
            //技术交底附图
            s.technology_drawings_fun = function (fileids) {
                s.add_patent.technology_drawings = JSON.stringify(fileids);
            };
            //专利检索报告附件
            s.report_fun = function (fileids) {
                s.add_patent.patent_search_report = JSON.stringify(fileids);
            }
            //其他附件
            s.other_fun = function (fileids) {
                s.add_patent.other_attachments = JSON.stringify(fileids);
            }
            //添加奖励费用中的附件
            s.reward_document_fun=function (fileids) {
                s.RewardData.reward_document = JSON.stringify(fileids);
            }
            //新增资助中的附件
            s.sent_document_fun=function (fileids) {
                s.FundedData.sent_document = JSON.stringify(fileids);
            }

            //时间控件对应的开关start
            s.open1 = function () {
                s.popup1.opened = true;
            };
            s.open2 = function () {
                s.popup2.opened = true;
            };
            s.open3 = function () {
                s.popup3.opened = true;
            };
            s.open4 = function () {
                s.popup4.opened = true;
            };
            s.open5 = function () {
                s.popup5.opened = true;
            };
            s.open6 = function () {
                s.popup6.opened = true;
            };
            s.open7 = function () {
                s.popup7.opened = true;
            };
            s.open8 = function () {
                s.popup8.opened = true;
            };
            s.open9 = function () {
                s.popup9.opened = true;
            };
            s.open10 = function () {
                s.popup10.opened = true;
            };
            s.open11 = function () {
                s.popup11.opened = true;
            };
            s.open12 = function () {
                s.popup12.opened = true;
            };
            s.open13 = function () {
                s.popup13.opened = true;
            };
            s.open14 = function () {
                s.popup14.opened = true;
            };
            s.popup1 = {
                opened: false
            };
            s.popup2 = {
                opened: false
            };
            s.popup3 = {
                opened: false
            };
            s.popup4 = {
                opened: false
            };
            s.popup5 = {
                opened: false
            };
            s.popup6 = {
                opened: false
            };
            s.popup7 = {
                opened: false
            };
            s.popup8 = {
                opened: false
            };
            s.popup9 = {
                opened: false
            };
            s.popup10 = {
                opened: false
            };
            s.popup11 = {
                opened: false
            };
            s.popup12 = {
                opened: false
            };
            s.popup13 = {
                opened: false
            };
            s.popup14 = {
                opened: false
            };

            //时间控件对应的开关end
        }]);


    //各弹出框控制器
    myapp.controller('add_patent_cost_ctrl',["$scope","item","$uibModalInstance",function(s,item,$uibModalInstance){
        s.ApplicationfeeData = item;
        s.keepAll=function(data){
            $uibModalInstance.close(data);
        };
        s.cancel=function(){
            $uibModalInstance.dismiss('这是cancel');
        };
        s.popup = {
            opened: false
        };
        s.open = function () {
            s.popup.opened = true;
        };

    }]);
    myapp.controller('add_award_cost_ctrl',['$scope','item','$uibModalInstance',function(s,item,$uibModalInstance){
        s.AnnualfeeData = item;
        s.keepAll=function(data){
            $uibModalInstance.close(data);
        };
        s.cancel=function(){
            $uibModalInstance.dismiss('这是cancel');
        };
        s.popup1 = {
            opened: false
        };
        s.open1 = function () {
            s.popup1.opened = true;
        };
        s.popup2 = {
            opened: false
        };
        s.open2 = function () {
            s.popup2.opened = true;
        };
    }]);
    myapp.controller('add_some_cost_ctrl',['$scope','item','$uibModalInstance',function(s,item,$uibModalInstance){
        s.RewardData = item;
        s.keepAll=function(data){
            $uibModalInstance.close(data);
        };
        s.cancel=function(){
            $uibModalInstance.dismiss('这是cancel');
        };
        s.popup = {
            opened: false
        };
        s.open = function () {
            s.popup.opened = true;
        };
    }]);
    myapp.controller('add_help_ctrl',['$scope','item','$uibModalInstance',function(s,item,$uibModalInstance){
        s.FundedData = item;
        s.keepAll = function(data){
            $uibModalInstance.close(data);
        };
        s.cancel = function(){
            $uibModalInstance.dismiss('这是cancel');
        };
        s.popup1 = {
            opened:false
        };
    s.open1 = function(){
        s.popup1.opened = true;
    };
        s.popup2 = {
            opened:false
        };
        s.open2 = function(){
            s.popup2.opened = true;
        }
    }])
});

