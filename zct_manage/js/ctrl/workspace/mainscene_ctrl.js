/**
 * Created by admin on 2017/3/21.
 */
define(["app", 'echarts','services/zctlocal_storage','api/mainscene_api'], function (myapp,echarts) {
    myapp.controller('mainscene_ctrl',
        ['$scope','zctlocal','$state','mainscene_api',function (s,zctlocal,$state,mainscene_api) {
            console.log('23434');
            s.status = $state.params.status;
            console.log(s.status);

            var get_annual_fee=function(n){
                var form_data={
                    type:n
                }
                mainscene_api.getAnnualfeeExpire(form_data)
                    .success(function(data){
                        if(n==1){
                            s.expire_item=data.data;
                            console.log( s.expire_item);
                            console.log('到期年费提醒');
                            if(s.expire_item){
                                var warmLeftMap = function () {
                                    var myChart = echarts.init(document.getElementById('cost1'));
                                    console.log(myChart);
                                    option = {
                                        tooltip : {
                                            trigger: 'item',
                                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                                        },
                                        legend: {
                                            orient : 'vertical',
                                            x : 'left',
                                            data:['年费提醒']
                                        },
                                        toolbox: {
                                            show : true,
                                            feature : {
                                                mark : {show: true},
                                                dataView : {show: true, readOnly: false},
                                                magicType : {
                                                    show: true,
                                                    type: ['pie', 'funnel'],
                                                    option: {
                                                        funnel: {
                                                            x: '25%',
                                                            width: '50%',
                                                            funnelAlign: 'center',
                                                            max: 1548
                                                        }
                                                    }
                                                },
                                                restore : {show: true},
                                                saveAsImage : {show: true}
                                            }
                                        },
                                        calculable : true,
                                        series : [
                                            {
                                                name:'年费提醒',
                                                type:'pie',
                                                radius : ['50%', '70%'],
                                                itemStyle : {
                                                    normal : {
                                                        label : {
                                                            show : false
                                                        },
                                                        labelLine : {
                                                            show : false
                                                        }
                                                    },
                                                    emphasis : {
                                                        label : {
                                                            show : true,
                                                            position : 'center',
                                                            textStyle : {
                                                                fontSize : '30',
                                                                fontWeight : 'bold'
                                                            }
                                                        }
                                                    }
                                                },
                                                data:[
                                                    {value:s.expire_item.annualfee_amount, name:'30天内待续费专利'},
                                                ]
                                            }
                                        ]
                                    };

                                    // 使用刚指定的配置项和数据显示图表。
                                    myChart.setOption(option);
                                };
                                warmLeftMap();
                            }

                        }else{
                            s.free_item=data.data;
                            console.log( s.free_item);
                            console.log('未到期年费提醒');
                            var warmRightMap = function () {
                                var myChart = echarts.init(document.getElementById('cost2'));
                                console.log(myChart);
                                option = {
                                    tooltip : {
                                        trigger: 'item',
                                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                                    },
                                    legend: {
                                        orient : 'vertical',
                                        x : 'left',
                                        data:['宽限期专利']
                                    },
                                    toolbox: {
                                        show : true,
                                        feature : {
                                            mark : {show: true},
                                            dataView : {show: true, readOnly: false},
                                            magicType : {
                                                show: true,
                                                type: ['pie', 'funnel'],
                                                option: {
                                                    funnel: {
                                                        x: '25%',
                                                        width: '50%',
                                                        funnelAlign: 'center',
                                                        max: 1548
                                                    }
                                                }
                                            },
                                            restore : {show: true},
                                            saveAsImage : {show: true}
                                        }
                                    },
                                    calculable : true,
                                    series : [
                                        {
                                            name:'宽限期专利',
                                            type:'pie',
                                            radius : ['50%', '70%'],
                                            itemStyle : {
                                                normal : {
                                                    label : {
                                                        show : false
                                                    },
                                                    labelLine : {
                                                        show : false
                                                    }
                                                },
                                                emphasis : {
                                                    label : {
                                                        show : true,
                                                        position : 'center',
                                                        textStyle : {
                                                            fontSize : '30',
                                                            fontWeight : 'bold'
                                                        }
                                                    }
                                                }
                                            },
                                            data:[
                                                {value:s.free_item.annualfee_amount, name:'宽限期专利'},
                                            ]
                                        }
                                    ]
                                };

                                // 使用刚指定的配置项和数据显示图表。
                                myChart.setOption(option);
                            };
                            warmRightMap();
                        }
                        console.log(data);
                    })
                    .error(function(){
                        console.log('调取失败');
                    })
            }
            get_annual_fee(0);
            get_annual_fee(1);



            var patent_type_statistics=function(){
                var form_data={
                    type:1
                }
                mainscene_api.patentTypeStatistics(form_data)
                    .success(function(data){
                        console.log(data);
                    })
                    .error(function(){
                        console.log('调取失败');
                    })

            }
            patent_type_statistics();
            /*专利统计*/
            var patentMap = function () {
                var myChart = echarts.init(document.getElementById('patent_totalnum'));
                console.log(myChart);
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {
                                show: true,
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        x: '25%',
                                        width: '50%',
                                        funnelAlign: 'center',
                                        max: 1548
                                    }
                                }
                            },
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    series: [
                        {
                            name: '1访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        position: 'center',
                                        textStyle: {
                                            fontSize: '30',
                                            fontWeight: 'bold'
                                        }
                                    }
                                }
                            },
                            data: [
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                                {value: 1548, name: '搜索引擎'}
                            ]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            };
            patentMap();
            /*年费提醒*/

        }]);

});
