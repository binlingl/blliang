define(["app", "echarts", "directives/sidebar/sidebar", 'api/patent_api',"directives/table/table"], function (myapp, echarts) {
    myapp.controller('my_patents_ctrl',
        ['$scope', 'patent_api','$state', function (s, patent_api,$state) {
            console.log('my_patents_ctrl');

            //tab的切换
            s.patent_tab_list=[
                {name:"专利管理",state:'home.patent_list'},
                {name:"费用管理",state:'home.list_costmanage'},
                {name:"我的专利",state:'home.my_patents'},
            ];

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
            get_patent_list=function(){
                var params={
                    pPageIndex:s.page.bigCurrentPage,
                    pPageSize:s.page.perPageItems
                }
                patent_api.getMyPatentList(params)
                    .success(function(data){
                        console.log('获取我的专利管理列表');
                        s.list_item=data.data.data;
                        s.asd=s.list_item;
                        s.page.bigTotalItems=data.data.count;
                        console.log( s.list_item);
                    })
                    .error(function(){
                        console.log('调取失败');
                    })
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
                get_patent_list(s.serchParams);
            }
            get_patent_list();
            s.delete_single_list=function(id){
                var ids=[];
                ids.push(id);
                console.log(ids);
                var form_data={
                    ids:ids
                }
                patent_api.deletePatent(form_data)
                    .success(function(data){
                        console.log('删除专利成功');
                        get_patent_list();
                    })
                    .error(function(){
                        console.log('调取失败');
                    })
            }








        }]);
})