/**
 * Created by admin on 2017/3/23.
 */
define(["app",'echarts',
    "directives/sidebar/sidebar",
    'api/setting_api',
    'api/patent_api',
    'services/zctlocal_storage',
    'services/setting',
    "directives/table/table",
    'directives/search_input/search_input'
], function (myapp,echarts) {
    myapp.controller('list_costmanage_ctrl',
        ['$scope','patent_api','zctlocal','common','$state', function (s,patent_api,zctlocal,common,$state) {
            s.show_detail=false;

            //tab的切换
            s.patent_tab_list=[
                {name:"专利管理",state:'home.patent_list'},
                {name:"费用管理",state:'home.list_costmanage'},
                {name:"我的专利",state:'home.my_patents'},
            ];

            ////初始化查询条件
            s.serchItems={
                autoItems:[
                    {v:0,name:'专利名称'},
                    {v:1,name:'申请号'},
                    {v:2,name:'案号'},
                    {v:3,name:'发明人'},
                    {v:4,name:'经办人'},
                    {v:5,name:'所属产品'},
                    {v:6,name:'权利人'}],
                patentType:[
                    {v:0,name:'全部'},
                    {v:"发明",name:'发明'},
                    {v:'外观设计',name:'外观设计'},
                    {v:'实用新型',name:'实用新型'}
                ],
                patentStatus:[
                    {v:0,name:'全部'},
                    {v:1,name:'准备中'},
                    {v:2,name:'受理'},
                    {v:3,name:'初审'},
                    {v:4,name:'公开'},
                    {v:5,name:'实审'},
                    {v:6,name:'复审'},
                    {v:7,name:'授权'},
                    {v:8,name:'终止'},
                    {v:9,name:'视为撤回'},
                    {v:10,name:'无效'},
                    {v:11,name:'驳回'}
                ],
                dateItems:[
                    {v:0,name:'申请日'},
                    {v:1,name:'公开日'},
                    {v:2,name:'授权日'}
                ],
            }

            function get_search_input(obj){
                s.search_input=[
                    {
                        key_names:[
                            {
                                keyname:'专利类型',
                                v:0,
                                values: s.serchItems.patentType,
                            },
                            {
                                keyname:'专利状态',
                                v:1,
                                values: s.serchItems.patentStatus,
                            },
                            {
                                keyname:'申请国家',
                                v:2,
                                values: obj,

                            }
                        ],
                        value_type:"single_name",
                    },
                ];
            }



            //分页对象
            s.page={
                maxSize:10,//最大显示数量(UI显示)
                perPageItems:10,//每页显示数量
                bigCurrentPage:1,//当前页
                bigTotalItems:100//总数据
            };
            //分页函数
            s.pageChanged=function(){
                console.log(s.page.bigCurrentPage);
                s.serch_click(s.serchParams);
            }
            //查询参数
            s.serchParams={
                endDate:"",
                endDateItems:"",
                keyword:"",
                pPageIndex:s.page.bigCurrentPage,
                pPageSize:s.page.perPageItems,
                searchDateType:"",
                searchDateTypeItems:s.serchItems.dateItems[0],
                searchType:"",
                searchTypeItems:s.serchItems.autoItems[0],
                startDateItems:"",
                statusItems:s.serchItems.patentStatus[0],
                status:"",
                typeItems:s.serchItems.patentType[0],
                type:""
            }

            s.asd=[];
            s.qwe={
                title:[
                    {name:'案号',key:'casenumber',wid:'115'},
                    {name:'专利名称',key:'name',wid:'199'},
                    {name:'申请号',key:'application_number',wid:'128'},
                    {name:'申请日',key:'application_date',wid:'90'},
                    {name:'专利状态',key:'statusStr',wid:'68'},
                    {name:'待缴年费日期',key:'nopayyear',wid:'112'},
                    {name:'待缴年费金额',key:'nopayyearamount',wid:'90'},
                    {name:'官费',key:'official_fee',wid:'120'},
                    {name:'代理费',key:'agency_fees',wid:'68'},
                    {name:'已缴年费',key:'paid_amount',wid:'112'},
                    {name:'已缴费用总计',key:'payyearamount',wid:'68'},
                    {name:'操作',key:'',wid:'112'},
                ]
            };
            //获取列表数据
            var getData=function (p_item) {
                patent_api.getCostList(p_item).success(function (data) {
                    s.costDatas=data.data.data;
                    console.log('获取列表数据');
                    console.log(s.costDatas);
                    s.asd=s.costDatas;
                    s.page.bigTotalItems=data.data.count;
                })
            };
            //获取国家
            var getCountry=function () {
                patent_api.getCountry().success(function (data) {
                    console.log(data);
                    s.serchItems.countryItems=data.data;
                     angular.forEach( s.serchItems.countryItems,function(v,k) {
                         v.v=v.id;
                     });
                    get_search_input(s.serchItems.countryItems);
                })
            }
            getCountry();
            getData();

            //编辑
            s.edit_click=function (p_id) {
                console.log(p_id);
            }
            //删除
            s.del_click=function (p_id) {
                console.log(p_id);
            }
            //查询
            s.serch_click=function () {
                s.serchParams.searchDateType=s.serchParams.searchDateTypeItems.num;
                s.serchParams.searchType=s.serchParams.searchTypeItems.num;
                s.serchParams.status=s.serchParams.statusItems.num;
                s.serchParams.type=s.serchParams.typeItems.num;
                s.serchParams.startDate=common.dateFormat('yyyy-MM-dd',s.serchParams.startDateItems);
                s.serchParams.endDate=common.dateFormat('yyyy-MM-dd',s.serchParams.endDateItems);
                getData(s.serchParams);
            }
            //导出事件
            s.exportClick=function(){
                var form_data={
                    endDate: s.serchParams.endDate,
                    keyword: s.serchParams.keyword,
                    pPageIndex: s.page.bigCurrentPage,
                    pPageSize: s.page.perPageItems,
                    searchDateType: s.serchParams.searchDateTypeItems.num,
                    searchType: s.serchParams.searchTypeItems.num,
                    startDate: s.serchParams.startDate,
                    status: s.serchParams.statusItems.num,
                    type: s.serchParams.typeItems.num,
                    apply_country:s.serchParams.country,
                }
                var params = JSON.stringify(form_data);
                $state.go("home.patentExport",{getParams:params});
            }
            //费用年份统计
            //var cost_years_statistics = function () {
            //    patent_api.costYearsStatistics()
            //        .success(function (data) {
            //            console.log('费用年份统计');
            //            console.log(data);
            //            s.cost_year=[];
            //            s.cost_quantity=[];
            //            var cost_item=data.data;
            //            _.each(cost_item,function(item){
            //                s.cost_year.push(item.years);
            //                s.cost_quantity.push(item.quantity);
            //            })
            //            console.log( s.cost_year);
            //            console.log( s.cost_quantity)
            //            var costRightMap=function(){
            //                var myChart = echarts.init(document.getElementById('costmanage'));
            //                option = {
            //                    tooltip : {
            //                        trigger: 'axis'
            //                    },
            //                    legend: {
            //                        data:['年费统计']
            //                    },
            //                    toolbox: {
            //                        show : true,
            //                        feature : {
            //                            mark : {show: true},
            //                            dataView : {show: true, readOnly: false},
            //                            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            //                            restore : {show: true},
            //                            saveAsImage : {show: true}
            //                        }
            //                    },
            //                    calculable : true,
            //                    xAxis : [
            //                        {
            //                            type : 'category',
            //                            boundaryGap : false,
            //                            data : s.cost_year.sort()
            //                        }
            //                    ],
            //                    yAxis : [
            //                        {
            //                            type : 'value'
            //                        }
            //                    ],
            //                    series : [
            //                        {
            //                            name:'年费统计',
            //                            type:'line',
            //                            stack: '总量',
            //                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            //                            data: s.cost_quantity
            //                        }
            //                    ]
            //                };
            //                myChart.setOption(option);
            //            }
            //            costRightMap();
            //        })
            //        .error(function () {
            //            console.log('调取失败');
            //        })
            //}
            //cost_years_statistics();
            //费用状态统计
            var cost_statistics = function () {
                patent_api.costStatistics()
                    .success(function (data) {
                        console.log('费用状态统计');
                        s.cost_state=data.data;
                        console.log(data);
                    })
                    .error(function () {
                        console.log('调取失败');
                    })
            }
            cost_statistics();



            //时间控件对应的开关start
            s.open1 = function () {
                s.popup1.opened = true;
            };
            s.open2 = function () {
                s.popup2.opened = true;
            };

            s.popup1 = {
                opened: false
            };
            s.popup2 = {
                opened: false
            };

            //时间控件对应的开关end

        }])
})