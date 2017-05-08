define(["app","api/export_api","services/myalert/myalert"],function(myapp){
    myapp.controller("proposal_export_ctrl",["$scope","export_api","$state","myalert","setting",function (s,export_api,$state,myalert,setting) {
        //获取查询参数
        var getParams = JSON.parse($state.params.getParams);
        var searchParams = {
            cri:{sortings:getParams.sortings,pPageIndex:getParams.pPageIndex,pPageSize:getParams.pPageSize},//请求的页码类
            listType:getParams.listType,//0提案管理,1我的提案
            searchType:getParams.searchType,//搜索类型，0是提案名称，1是案号，2是发明人，3是经办人(承办人)，4是所属产品，5是技术领域
            exportExcelList:[],//导出的字段
            keyword:getParams.keyword,//搜索关键字
            type:getParams.type,//提案类型
            status:getParams.status,//提案状态
            startDate:getParams.startDate,//开始时间
            endDate:getParams.endDate,//结束时间
            exportModel:{
                id:"",
                type:"",
                is_system_settings:"",
                fieldjson:"",
                create_company_user_id:""
            },
        }
        //定义初始默认字段数据
        // s.exportList=[{"field":"name","field_name":"提案名称","sort":0},{"field":"casenumber","field_name":"案号","sort":1}];
        s.exportList=[];
        var init=function () {
            export_api.GetExportTitle({type:1}).success(function(data){
                if(data.data){
                    s.exportList= JSON.parse(data.data.fieldjson);
                    searchParams.exportModel=data.data;
                }
            });
        };
        init();
        s.saveEcxl=function(){
            if(s.exportList.length==0){
                myalert.alert('提示','导出字段不能为空',function () {
                    return;
                })
            }else {
                searchParams.exportExcelList=s.exportList;
                searchParams.exportModel.fieldjson=JSON.stringify(s.exportList);
                // export_api.ExportExcel(searchParams).success(function (data) {
                //     window.open(setting.api_url + "/api/file/download_file/"+data.data);
                // });
                var vm_window=window.open();
                vm_window.opener=null;
                export_api.ExportExcel(searchParams).success(function (data) {
                    var vm_url = setting.api_url + "/api/file/download_file/"+data.data;
                    vm_window.location=vm_url;
                    vm_window.close();
                })

            }
        }
        //定义可选字段
        s.colummList=[
            {field:"casenumber",field_name:"案号"},
            {field:"name",field_name:"提案名称"},
            {field:"type",field_name:"提案类型"},
            {field:"inventor",field_name:"发明人"},
            {field:"products",field_name:"所属产品"},
            {field:"keyword",field_name:"提案关键词"},
            {field:"summary_invention",field_name:"发明点概述"},
            // {field:"name",field_name:"技术交底附图"},
            // {field:"name",field_name:"专利检索报告"},
            {field:"contractor",field_name:"承办人"},
            // {field:"department",field_name:"提案部门"},
            {field:"technical_field",field_name:"技术领域"},
            {field:"first_inventor_idcard",field_name:"第一发明人身份证"},
            // {field:"name",field_name:"其他附件"},
            {field:"summary",field_name:"摘要"},
            {field:"remark",field_name:"备注"},

        ];
        //添加字段
        s.addExport=function (k,v) {
            var columnData = {
                field:k,
                field_name:v,
                sort:s.exportList.length
            };
            //判断是否已添加
            var isAdd=true;
            for(var i=0;i<s.exportList.length;i++){
                if(s.exportList[i].field==k&&s.exportList[i].field_name==v)
                {
                    isAdd=false;
                    myalert.alert("提示","此字段已添加",function(){return})
                }
            }
            if(isAdd){
                s.exportList.push(columnData);
            }


        }
        //移除字段
        s.deleteExport=function (i) {
            //先移除
            _.pullAt(s.exportList, i);
            //再重新设置sort的值
            for(var i=0;i<s.exportList.length;i++){
                s.exportList[i].sort=i;
            };
        }

    }])
})