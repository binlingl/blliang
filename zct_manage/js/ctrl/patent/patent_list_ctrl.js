define(["app", "echarts",
    "directives/sidebar/sidebar",
    'api/patent_api',
    'services/zctlocal_storage',
    "directives/table/table",
    "directives/tab/tab"
], function (myapp, echarts) {
    myapp.controller('patent_list_ctrl',
        ['$scope', 'patent_api', 'zctlocal', '$state', 'myalert',function (s, patent_api, zctlocal, $state,myalert) {
            //控制权限显示
            s.permission = JSON.parse(zctlocal.getlocal('permission')).patent;
            console.log(s.permission);
            s.show_detail = false;

            //tab的切换
            s.patent_tab_list=[
                {name:"专利管理",state:'home.patent_list'},
                {name:"费用管理",state:'home.list_costmanage'},
            ];


            //搜索框的指令数据运用
            function get_search_input(obj){
                s.search_input=[
                    {
                        key_names:[
                            {
                                keyname:'专利类型',
                                v:0,
                                values:[
                                    {name:'全部',v:"全部"},
                                    {name:'发明',v:"发明"},
                                    {name:'外观设计',v:'外观设计'},
                                    {name:'实用新型',v:'实用新型'},
                                ]
                            },
                            {
                                keyname:'专利状态',
                                v:1,
                                values:[
                                    {name:'全部',v:'全部'},
                                    {name:'准备中',v:'准备中'},
                                    {name:'受理',v:'受理'},
                                    {name:'初审',v:'初审'},
                                    {name:'公开',v:'公开'},
                                    {name:'实审',v:'实审'},
                                    {name:'复审',v:'复审'},
                                    {name:'授权',v:'授权'},
                                    {name:'终止',v:'终止'},
                                    {name:'视为撤回',v:'视为撤回'},
                                    {name:'无效',v:'无效'},
                                    {name:'驳回',v:'驳回'},
                                ]
                            },
                            {
                                keyname:'申请国',
                                v:2,
                                values:obj,
                            },

                        ],
                        value_type:"single_name",
                    },
                    {
                        key_names:[
                            [
                                {keyname:'申请号', v:0,},
                                {keyname:'案号',v:1},
                                {keyname:'发明人',v:2},
                                {keyname:'经办人',v:3},
                                {keyname:'所属产品',v:4},
                                {keyname:'权利人',v:5},
                            ]
                        ],
                        value_type:"single_select",
                    },


                ];
            }



            //年费统计图标数据
            var get_cost_statistics = function () {
                patent_api.costYearsStatistics()
                    .success(function (data) {
                        //console.log(data);
                        //    s.item=data.data;
                        //    s.item.forEach(function(item){
                        //        s.cost_year=item.years;
                        //        console.log( s.cost_year);
                        //    })
                        //console.log('年费统计图标数据');
                    })
                    .error(function () {
                        console.log('调取失败');
                    })
            };
            get_cost_statistics();
            //分页对象
            s.page = {
                maxSize: 10,//最大显示数量(UI显示)
                perPageItems: 10,//每页显示数量
                bigCurrentPage: 1,//当前页
                bigTotalItems: 100//总数据
            };
            //分页函数
            s.pageChanged = function () {

               // console.log(s.page.bigCurrentPage);
                s.find_patent_list();
            }
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
            //获取申请国家
            var country_patent = [];
            var patent_get_country = function () {
                patent_api.patentGetCountry()
                    .success(function (data) {
                        s.country_patent = data.data;
                        angular.forEach(s.country_patent,function(v,k){//统一数据格式：将返回的id转化为v,便与绑定
                            v.v=v.id;
                        });
                        get_search_input(s.country_patent);//渲染搜索框

                        //console.log('获取申请国家');
                    })
                    .error(function () {
                        console.log('调取失败');
                    })
            };
            patent_get_country();

            //专利年份统计
            s.patent_year = [];
            s.patent_quantity = [];
            //var get_patent_year = function () {
            //    patent_api.patentStatistics()
            //        .success(function (data) {
            //            console.log(data);
            //            s.item = data.data;
            //            s.item.forEach(function (item) {
            //                s.cost_year = parseInt(item.years);
            //                s.quantity = parseInt(item.quantity);
            //                console.log(s.cost_year);
            //                s.patent_year.push(s.cost_year);
            //                s.patent_year.sort();
            //                s.patent_quantity.push(s.quantity);
            //                s.patent_quantity.sort();
            //                console.log(s.patent_year);
            //            })
            //            var year = s.patent_year;
            //            console.log(year);
            //            var patentRightMap = function () {
            //                var myChart = echarts.init(document.getElementById('patentyear'));
            //                option = {
            //                    tooltip: {
            //                        trigger: 'axis'
            //                    },
            //                    legend: {
            //                        data: ['专利数量']
            //                    },
            //                    toolbox: {
            //                        show: true,
            //                        feature: {
            //                            mark: {show: true},
            //                            dataView: {show: true, readOnly: false},
            //                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            //                            restore: {show: true},
            //                            saveAsImage: {show: true}
            //                        }
            //                    },
            //                    calculable: true,
            //                    xAxis: [
            //                        {
            //                            type: 'category',
            //                            boundaryGap: false,
            //                            data: year
            //                        }
            //                    ],
            //                    yAxis: [
            //                        {
            //                            type: 'value'
            //                        }
            //                    ],
            //                    series: [
            //                        {
            //                            name: '专利数量',
            //                            type: 'line',
            //                            stack: '总量',
            //                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            //                            data: s.patent_quantity
            //                        }
            //                    ]
            //                };
            //                myChart.setOption(option);
            //            }
            //            patentRightMap();
            //            console.log('专利年份统计');
            //        })
            //        .error(function () {
            //            console.log('调取失败');
            //        })
            //};
            //get_patent_year();
            //
            //
            ////专利状态统计
            //var get_patent_state = function () {
            //    patent_api.patentStatusStatistics()
            //        .success(function (data) {
            //            console.log(data);
            //            console.log('专利状态统计');
            //            s.statusitem = data.data;
            //            console.log(s.statusitem);
            //            var state_item = [];
            //            s.status_item = s.statusitem.slice(0, -1);
            //            console.log(s.statusitem.slice(0, -1));
            //            for (var i = 0; i < s.status_item.length; i++) {
            //                state_item.push(s.status_item[i].name);
            //            }
            //            var arr_ = [];
            //            var patentLeftMap = function () {
            //                var myChart = echarts.init(document.getElementById('patentstate'));
            //                console.log(myChart);
            //                var option = {
            //                    tooltip: {
            //                        trigger: 'item',
            //                        formatter: "{a} <br/>{b} : {c} ({d}%)"
            //                    },
            //                    legend: {
            //                        orient: 'vertical',
            //                        x: 'left',
            //                        data: state_item
            //                    },
            //                    toolbox: {
            //                        show: true,
            //                        feature: {
            //                            mark: {show: true},
            //                            dataView: {show: true, readOnly: false},
            //                            magicType: {
            //                                show: true,
            //                                type: ['pie', 'funnel'],
            //                                option: {
            //                                    funnel: {
            //                                        x: '25%',
            //                                        width: '50%',
            //                                        funnelAlign: 'center',
            //                                        max: 1548
            //                                    }
            //                                }
            //                            },
            //                            restore: {show: true},
            //                            saveAsImage: {show: true}
            //                        }
            //                    },
            //                    calculable: true,
            //                    series: [
            //                        {
            //                            name: '专利统计',
            //                            type: 'pie',
            //                            radius: ['50%', '70%'],
            //                            itemStyle: {
            //                                normal: {
            //                                    label: {
            //                                        show: false
            //                                    },
            //                                    labelLine: {
            //                                        show: false
            //                                    }
            //                                },
            //                                emphasis: {
            //                                    label: {
            //                                        show: true,
            //                                        position: 'center',
            //                                        textStyle: {
            //                                            fontSize: '30',
            //                                            fontWeight: 'bold'
            //                                        }
            //                                    }
            //                                }
            //                            },
            //                            data: s.status_item
            //                        }
            //                    ]
            //                };
            //                // 使用刚指定的配置项和数据显示图表。
            //                myChart.setOption(option);
            //            }
            //            patentLeftMap();
            //
            //        })
            //        .error(function () {
            //            console.log('调取失败');
            //        })
            //};
            //get_patent_state();

            //获取专利管理列表
            s.init = {
                searchType: '',
                type: '0',
                status: '0',
                country: "0"
            }
            s.asd=[];
            s.qwe={
                title:[
                    {name:'案号',key:'casenumber',wid:'115'},
                    {name:'专利名称',key:'name',wid:'199'},
                    {name:'申请号',key:'application_number',wid:'128'},
                    {name:'申请日',key:'application_date',wid:'90'},
                    {name:'公开日期',key:'authorization_date',wid:'90'},
                    {name:'发明人',key:'inventor',wid:'120'},
                    {name:'专利状态',key:'statusStr',wid:'68'},
                    {name:'操作',key:'',wid:'112'},
                ]
            };
            s.find_patent_list = function () {
                console.log(s.subdata,"======================subdata=================");
                var form_data = {
                    endDate: s.init.endDate,
                    keyword: s.init.keyword,
                    pPageIndex: s.page.bigCurrentPage,
                    pPageSize: s.page.perPageItems,
                    searchDateType: s.init.searchDateType,
                    searchType: s.init.searchType,
                    //sortings: s.init.sortings,
                    startDate: s.init.startDate,
                    status: s.init.status,
                    type: s.init.type,
                    apply_country: s.init.country
                }
                patent_api.getPatentList(form_data)
                    .success(function (data) {
                        console.log('获取专利管理列表');
                        console.log(data);
                        s.list_item = data.data.data;
                        s.asd=s.list_item;
                        s.page.bigTotalItems = data.data.count;
                        console.log(s.list_item);
                        //s.list_item.checked=false;
                        s.list_item.forEach(function (item) {
                            item.checked = false;
                        })
                    })
                    .error(function () {
                        console.log('调取失败');
                    })
            }

            var initGetPatentList = function () {
                s.init.searchType = "";
                s.find_patent_list();
            }
            initGetPatentList();

            //导出事件
            s.exportClick = function () {
                var form_data = {
                    endDate: s.init.endDate,
                    keyword: s.init.keyword,
                    pPageIndex: s.page.bigCurrentPage,
                    pPageSize: s.page.perPageItems,
                    searchDateType: s.init.searchDateType,
                    searchType: s.init.searchType,
                    startDate: s.init.startDate,
                    status: s.init.status,
                    type: s.init.type,
                    apply_country: s.init.country,
                }
                var params = JSON.stringify(form_data);
                $state.go("home.patentExport", {getParams: params});
            }
            // get_patent_list=function(){
            //     patent_api.getPatentList()
            //         .success(function(data){
            //             console.log('获取专利管理列表');
            //             console.log(data);
            //             s.list_item=data.data.data;
            //             console.log(s.list_item);
            //             //s.list_item.checked=false;
            //             s.list_item.forEach(function(item){
            //                 item.checked=false;
            //             })
            //         })
            //         .error(function(){
            //             console.log('调取失败');
            //         })
            // }
            // get_patent_list();

            //删单个专利
            s.all_select = false;
            s.allSelect = function () {
                s.item.checked = !s.item.checked;
                _.each(s.list_item, function (item) {
                    item.checked = s.all_select
                })
                console.log(s.list_item);
                //get_patent_list();
            }
            s.isSelect = function (p_item) {
                console.log(p_item);
                s.list_item.forEach(function (item) {
                    if (p_item.id == item.id) {
                        item.checked = !p_item.checked
                    }
                })
                console.log(s.list_item);
            }
            s.delete_large_list = function () {
                var ids = [];
                s.list_item.forEach(function (item) {
                    if (item.checked == true) {
                        ids.push(item.id)
                    }
                })
                console.log(ids);
                var form_data = {
                    ids: ids
                }
                patent_api.deletePatent(form_data)
                    .success(function (data) {
                        console.log('删除专利成功');
                        s.find_patent_list();
                    })
                    .error(function () {
                        console.log('调取失败');
                    })
            }
            s.delete_single_list = function (id) {
                var ids = [];
                ids.push(id);
                console.log(ids);
                var form_data = {
                    ids: ids
                }
                patent_api.deletePatent(form_data)
                    .success(function (data) {
                        console.log('删除专利成功');
                        s.find_patent_list();
                    })
                    .error(function () {
                        console.log('调取失败');
                    })
            }
            s.deal_patent = function (p_item) {
                console.log(p_item);
                s.deal_id=p_item.id;
                s.show_deal = true;
            }
            /*交易弹窗*/
            s.price = false;
            s.clickPrice = function () {
                s.price = true;
            };
            /*是否显示交易弹窗*/
            // s.show_deal=true;
            s.closeDeal = function () {
                s.show_deal = false;
            }
            //出售专利/交易意向
            s.deal_detail={
                price:'面议'
            }
            s.save_deal_patent = function () {
                var form_data = {
                    deal_state: s.deal_detail.deal_state,
                    deal_type:s.deal_detail.deal_type,
                    id: s.deal_id,
                    price:s.deal_detail.price
                }
                patent_api.dealPatent(form_data)
                    .success(function (data) {
                        console.log(data);
                    })
                    .error(function () {
                        console.log('调取失败');
                    })
            }


        }])
})