define(["app", 'echarts','api/proposal_api','services/myalert/myalert','services/zct_get_my_right',
    'services/setting','services/common',"directives/search_input/search_input"], function (myapp, echarts) {
    myapp.controller('proposal_list_ctrl',
        ['$scope','$rootScope','proposal_api','myalert','$state','get_my_right','setting','common',function (s,$rootScope,proposal_api,myalert,$state,getRight,setting,common) {
            console.log('proposal_list_ctrl');
            $rootScope.istick = 'caseManage';
            s.setting = setting;
            s.common = common;


            //搜索框的指令运用(传递参数)
            s.search_input=[

                //类型三：下拉框+输入框
                {
                    key_names:[
                        [
                            {keyname:'提案名称', v:0,},
                            {keyname:'案号',v:1},
                            {keyname:'发明人',v:2},
                            {keyname:'经办人',v:3},
                            {keyname:'所属产品',v:4},
                            {keyname:'技术领域',v:5},
                        ]
                    ],
                    value_type:"single_select",
                    wid:'200px',
                },

                //类型四：名字+下拉框
                {
                    key_names:[
                        {
                            keyname:'提案类型',
                            v:0,
                            values:[{name:'全部',v:'全部'},{name:'发明',v:"发明"},{name:'外观设计',v:'外观设计'}]
                        },
                        {
                            keyname:'提案状态',
                            v:1,
                            values:[{name:'全部',v:'全部'},{name:'审核中',v:"审核中"},{name:'不通过',v:'不通过'},{name:'通过',v:'通过'}]
                        },
                        {
                            keyname:'是否转化',
                            v:2,
                            values:[{name:'全部',v:'全部'},{name:'未转化',v:"未转化"},{name:'已转化',v:'已转化'}]
                        },
                    ],
                    value_type:"single_name",
                },
            ];

            //  s.subdata={};//定义一个对象
            s.testSubData_click=function() {
                console.log(s.subdata);
            };


            //权限的控制
            console.log("提案 的权限控制");
            s.proposal_right=getRight.get_right(localStorage['permission']).proposal;


            //提案数量统计
            var proposal_year=[];
            var proposal_quantity=[];
            //var proposalStatistics = function(){
            //    proposal_api.ProposalStatistics().success(function(data){
            //        console.log("提案统计图");
            //        console.log(data);
            //        s.mapNum=data.data;
            //        s.mapNum.forEach(function(p_item){
            //            if(p_item){
            //                proposal_year.push(p_item.years);
            //                console.log(proposal_year);
            //                proposal_quantity.push(p_item.quantity);
            //                console.log(proposal_quantity);
            //            }else{
            //
            //            }
            //        })
            //        var rightMap=function(){
            //            var myChart = echarts.init(document.getElementById('chartpane2'));
            //            console.log("iiiiiiiiiiiiii",myChart);
            //            option = {
            //                tooltip : {
            //                    trigger: 'axis'
            //                },
            //                legend: {
            //                    data:['提案']
            //                },
            //                toolbox: {
            //                    show : true,
            //                    feature : {
            //                        mark : {show: true},
            //                        dataView : {show: true, readOnly: false},
            //                        magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            //                        restore : {show: true},
            //                        saveAsImage : {show: true}
            //                    }
            //                },
            //                calculable : true,
            //                xAxis : [
            //                    {
            //                        type : 'category',
            //                        boundaryGap : false,
            //                        data : proposal_year
            //                    }
            //                ],
            //                yAxis : [
            //                    {
            //                        type : 'value'
            //                    }
            //                ],
            //                series : [
            //                    {
            //                        name:'提案',
            //                        type:'line',
            //                        stack: '总量',
            //                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
            //                        data:proposal_quantity
            //                    }
            //                ]
            //            };
            //            myChart.setOption(option);
            //        };
            //        rightMap();
            //
            //    })
            //};
            //proposalStatistics();

            //初始化搜索类型
            s.searchTypes = [
                {name: '提案名称', value: 0},
                {name: '案号', value: 1},
                {name: '发明人', value: 2},
                {name: '经办人', value: 3},
                {name: '所属产品', value: 4},
                {name: '技术领域', value: 5}
            ];
            //是否转化
            s.is_intopatent = [
                {name:'全部',value:'-1'},
                {name:'未转化',value:'0'},
                {name:'已转化',value:'1'}
            ];
            //初始化提案类型
            s.caseTypes = [
                {name: '全部', value: '0'},
                {name: '发明', value:'发明'},
                {name: '外观设计', value:'外观设计' },
                {name: '实用新型', value: '实用新型'}
            ];

            //初始化状态
            s.caseStates = [
                {name: '全部', value: '-1'},
                {name: '审核中', value: '0'},
                {name: '审核不通过', value: '1'},
                {name: '审核通过', value: '2'}
            ];

            //设置提案状态
            s.caseState = s.caseStates[0];
            s.setCaseState = function(caseState){
                console.log(caseState);
                s.caseState = caseState;
            };
            //设置提案类型
            s.caseType = s.caseTypes[0];
            s.setCaseType = function(caseType){
                console.log(caseType);
                s.caseType = caseType;
            };
            //设置搜索类型
            s.searchType = s.searchTypes[0];
            s.setSearchType = function (searchType) {
                s.searchType = searchType;
                console.log(s.searchType);
            };
            //设置搜索关键字
            s.searchKeyword = '';
            s.setSearchKeyword = function (searchKeyword) {
                s.searchKeyword = searchKeyword;
            };
            s.open1 = function () {
                s.popup1.opened = true;
            };
            s.popup1 = {
                opened: false
            };
            s.open2 = function () {
                s.popup2.opened = true;
            };
            s.popup2 = {
                opened: false
            };




//--------分页---------------
            //uib-pagination分页参数
            s.pageParam = {
                maxSize: 10,//显示时的效果
                totalItems: 100,//总数
                currentPage: 1,//当前页
                perPageItems: 10 //每页显示数据条数
            };
//分页函数
            s.page_change = function () {
                // s.pageParam.currentPage = s.pageParam.currentPage;
                s.send_obj.pPageIndex=s.pageParam.currentPage;//每一次切换，都要，改变index
                getProposalList();
            }

            // 定义搜索对象
            s.send_obj ={
                endDate: "",
                is_intopatent:'-1',
                keyword: "",
                pPageIndex:s.pageParam.currentPage,         //指定页
                pPageSize:s.pageParam.perPageItems,        //每页显示数据条数
                searchType: "0",
                sortings: {
                    dir: '',  //升序：desc 降序asc
                    sort: ''    //按创建日期排序，
                },
                startDate:"",
                status: "-1",
                type: "0"
            }

            //导出事件
            s.exportClick=function(){
                //标记查询(0提案管理,1我的提案);
                s.send_obj.listType=0;
                var params = JSON.stringify(s.send_obj);
                $state.go("home.proposal.export",{getParams:params});
            }


            //获取提案列表
            s.asd=[];
            s.qwe={
                title:[
                    {name:'案号',key:'casenumber',wid:'140'},
                    {name:'提案名称',key:'name',wid:'199'},
                    {name:'创建人',key:'createduser',wid:'128'},
                    {name:'创建日期',key:'created_at',wid:'90'},
                    {name:'所属产品',key:'products',wid:'90'},
                    {name:'发明人',key:'inventor',wid:'90'},
                    {name:'提案状态',key:'statusStr',wid:'68'},
                    {name:'操作',key:'pno',wid:'116'},
                ]
            };
            var getProposalList =function(){
                proposal_api.getProposalList(s.send_obj).success(function(data){
                    console.log(data);
                    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%",s.send_obj);
                    s.item = data.data.data;
                    s.asd= s.item;
                    // console.log(data.data.count);
                     s.pageParam.totalItems=data.data.count;//提案数据总数
                    console.log(s.item);
                });
            };
            getProposalList();


            //点击查询事件
            s.check = function () {
                console.log(s.subdata,"==================================");
                console.log(s.send_obj);
                getProposalList();
            };
            //全选
            s.selectAll = false;
            s.checkAll = function(selectAll){
                s.item.forEach(function(p_item){
                    p_item.isChoose = selectAll;
                });
            };
            //当所有被选择了的时候全选将被选中
            var arr = [];
            s.checkOne = function(isChoose,id){
                if(isChoose == true){
                    arr.push(id);
                }
                if(arr.length == s.item.length){
                    s.selectAll = true;
                }else if(arr.length < s.item.length){
                    s.selectAll = false;
                }
            };
            //删除事件
            var deleteCases = function(arr){
                proposal_api.deleteProposal({ids:arr}).success(function(data){
                    getProposalList();
                })
            };
            //删除单个
            s.deleteOne = function(id,index){
                s.item.forEach(function(p_item){
                    if(p_item.id == id){
                        var ids = [];
                        ids.push(id);
                        deleteCases(ids);
                    }
                });
            };
            //批量删除
            s.deleteCases = function(){
                var itemArray = [];
                s.item.forEach(function(p_item){
                    if(p_item.isChoose == true){
                        itemArray.push(p_item.id);
                    }
                });
                if(itemArray.length == 0){
                    myalert.content('删除失败','请选择要删除的提案!');
                }else{
                    deleteCases(itemArray);
                }

            }
            //是否显示侧边详情
            s.show_details_aside = false;
            //侧边栏提案详情信息
            s.get_details = function (id) {
                s.show_details_aside = !s.show_details_aside;
                proposal_api.proposa_detaile({id:id,getType:'1'})
                    .success(function (data) {
                        console.log("12344");
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
                        //审批人信息
                        s.p_approvallist = data.data.approvalList;
                        //s.approvaluser = s.p_approvallist.ApprovalUser;//审批用户
                        //s.approvaldate = s.p_approvallist.ApprovalDate;//审核日期
                        //s.approvaluserheadportrait = s.p_approvallist.ApprovalUserHeadPortrait;//审批用户头像
                        //s.approvalsts = s.p_approvallist.approvalsts;//状态
                        //s.remark = s.p_approvallist.remark;//审核标记
                        //当前审批人后面的审批列表
                        s.approvalUserList = data.data.approvalUserList;
                        s.id = s.approvalUserList.id;//审批人id
                        s.name = s.approvalUserList.name;//审批人姓名
                        s.sort = s.approvalUserList.sort;//审批人顺序
                    })
            };





        }]);

});
