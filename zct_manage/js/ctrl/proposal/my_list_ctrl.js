/**
 * Created by admin on 2017/3/21.
 * 我的提案的控制器
 */
define(["app", 'echarts', 'api/proposal_api', 'services/myalert/myalert','services/zct_get_my_right','services/setting','services/common'], function (myapp, echarts) {
    myapp.controller('my_list_ctrl', ['$scope','$rootScope', 'proposal_api', 'myalert', '$state','get_my_right','setting','common',
        function (s,$rootScope, proposal_api, myalert, $state,getRight,setting,common) {
        $rootScope.istick = 'myCase';

            s.setting = setting;
            s.common = common;
        //我的提案的权限控制
        console.log("提案 的权限控制");
        s.proposal_right=getRight.get_right(localStorage['permission']).proposal;
            console.log(s.proposal_right);

        s.getType = 0;
        //初始化搜索类型
        s.searchTypes = [
                {name: '提案名称', value: 0},
                {name: '案号', value: 1},
                {name: '发明人', value: 2},
                {name: '经办人', value: 3},
                {name: '所属产品', value: 4},
                {name: '技术领域', value: 5}
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
        s.setCaseState = function (caseState) {
            console.log(caseState);
            s.caseState = caseState;
        };
        //设置提案类型
        s.caseType = s.caseTypes[0];
        s.setCaseType = function (caseType) {
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
            totalItems: 0,//总数
            currentPage: 1,//当前页
            perPageItems: 10 //每页显示数据条数
        }
//分页函数
        s.page_change = function () {

            // s.pageParam.currentPage = s.pageParam.currentPage;
            console.log(s.pageParam.currentPage);
            console.log(s.pageParam.totalItems);
          //  send_obj.pPageIndex=s.pageParam.currentPage;//每一次切换，都要，改变index
            getProposals();
        }

        // 定义搜索对象
        s.send_obj={
            getType:0,
            endDate: "",
            keyword: "",
            pPageIndex:s.pageParam.currentPage,         //指定页
            pPageSize:s.pageParam.perPageItems,        //每页显示数据条数
            searchType: "0",
            sortings: {
                dir: '',  //升序：desc 降序asc
                sort: ''    //按创建日期排序，
            },
            startDate: '',
            status: '-1',
            type: '0'
        };

        //导出事件
        s.exportClick=function(){
            //标记查询(0提案管理,1我的提案);
            s.send_obj.listType=1;
            var params = JSON.stringify(s.send_obj);
            $state.go("home.proposal.export",{getParams:params});
        }

        //获取我的提案管理列表

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
        var getProposals = function () {
            /*//搜索参数
            var send_obj = {
                endDate: new Date(s.endDate),
                keyword: s.searchKeyword,
                getType: s.getType,
                pPageIndex:s.pageParam.currentPage,         //指定页
                pPageSize:s.pageParam.perPageItems,        //每页显示数据条数
                searchType: s.searchType.value,
                sortings: {
                    dir: '',  //升序：desc 降序asc
                    sort: ''    //按创建日期排序，
                },
                startDate: new Date(s.startDate),
                status: s.caseState.value,
                type: s.caseType.value
            };

            send_obj.pPageIndex=s.pageParam.currentPage;//每一次切换，都要，改变index
            console.log(send_obj);*/
            proposal_api.getProposals(s.send_obj)
                .success(function (data) {
                    s.pageParam.totalItems=data.data.count;//提案数据总数
                    s.item = data.data.data;
                    s.asd=s.item;
                    s.item.isChoose = false;
                });
        }
        getProposals();

        //点击查询事件
        s.check = function () {
            //console.log(send_obj);
            console.log("----------------");
            getProposals();
        };
        //全选
        s.selectAll = false;
        s.checkAll = function (selectAll) {
            s.item.forEach(function (p_item) {
                p_item.isChoose = selectAll;
            });
        };
        //当所有被选择了的时候全选将被选中
        var arr = [];
        s.checkOne = function (isChoose, id) {
            if (isChoose == true) {
                arr.push(id);
            }
            if (arr.length == s.item.length) {
                s.selectAll = true;
            } else if (arr.length < s.item.length) {
                s.selectAll = false;
            }
        };
        //删除事件
        var deleteCases = function (arr) {
            proposal_api.deleteProposal({ids: arr}).success(function (data) {
                getProposals();
            })
        };
        //删除单个
        s.deleteOne = function (id, index) {
            s.item.forEach(function (p_item) {
                if (p_item.id == id) {
                    var ids = [];
                    ids.push(id);
                    deleteCases(ids);
                }
            });
        };
        //批量删除
        s.deleteCases = function () {
            var itemArray = [];
            s.item.forEach(function (p_item) {
                if (p_item.isChoose == true) {
                    itemArray.push(p_item.id);
                }
            });
            if (itemArray.length == 0) {
                myalert.content('删除失败', '请选择要删除的提案!');
            } else {
                deleteCases(itemArray);
            }

        }
        //是否显示侧边详情
        s.show_details_aside = false;
        //侧边栏提案详情信息
        s.get_details = function (id) {
            s.show_details_aside = !s.show_details_aside;
            proposal_api.proposa_detaile({id: id, getType: '1'})
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
                    //获取详情中的图片地址
                    s.p_detaile.technology_drawings = s.setting.url_href.down_img+'/'+ s.common.getImageID(s.p_detaile.technology_drawings);
                    //审批人信息
                    s.p_approvallist = data.data.approvalList;
                    console.log(s.p_approvallist);
                    //当前审批人后面的审批列表
                    s.approvalUserList = data.data.approvalUserList;
                    s.id = s.approvalUserList.id;//审批人id
                    s.name = s.approvalUserList.name;//审批人姓名
                    s.sort = s.approvalUserList.sort;//审批人顺序
                })
        };
    }])
})
