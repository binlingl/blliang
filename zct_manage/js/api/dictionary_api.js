define(['app', 'services/setting', 'services/http'], function (myapp) {
    myapp.factory('dictionary_api', ['setting', 'myhttp', function (setting, myhttp) {
        var api_url = setting.api_url;
        var myhttp = myhttp;
        var api = {
            get: function (pmyhtt, papi_url) {
                api_url = papi_url;
                myhttp = pmyhtt;
                return api;
            },
            patent_service_type: function () {
                return myhttp({
                    url: api_url + '/api/dic/patent_service_type',
                    method: 'get',
                    type: 'json'
                });
            },
            trademake_service_type: function () {
                return myhttp({
                    url: api_url + '/api/dic/trademake_service_type',
                    method: 'get',
                    type: 'json'
                });
            },
            patent_industry_technology: function () {
                return myhttp({
                    url: api_url + '/api/dic/patent_industry_technology',
                    method: 'get',
                    type: 'json'
                });
            },
            deal_patent_industry: function (data) {
                return myhttp({
                    url: api_url + '/deal/industry/select_all',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            dealPatentIndustry: function (data) {
                var sendData = {
                    pageindex: 1,
                    pagesize: 1000,
                    business: "patent"
                };
                return myhttp({
                    url: api_url + '/deal/industry/select_all',
                    method: 'post',
                    type: 'json',
                    data: sendData
                });
            },
            add_patent_industry: function (data) {
                return myhttp({
                    url: api_url + '/deal/industry/add',
                    method: 'post',
                    data: data
                });
            },
            delete_patent_industry: function (data) {
                return myhttp({
                    url: api_url + '/deal/industry/delete/' + data,
                    method: 'get'
                });
            },
            //交易平台行业分类字典get
            get_deal_industry: function (data) {
                return myhttp({
                    url: api_url + '/deal/industry/select_all_t/' + data,
                    method: 'get'
                });
            },
            //获取中华人民共和国地区数据(树形)
            get_area_t: function (data) {
                return myhttp({
                    url: api_url + '/api/dic/get_area_t',
                    method: 'get'
                });
            },
            //树形结构
            get_position_treedata:function(data)
            {
                return myhttp({
                    url:api_url+"/api/AllDic/GetDicTypeTree",
                    method:"post",
                    type:"json",
                    data:data
                });
            },
            //获取所有城市这一级
            get_area_l: function (data) {
                return myhttp({
                    url: api_url + '/api/dic/get_area_l',
                    method: 'post',
                    type:"json",
                    data:data
                });
            },
            //根据文件id获取文件信息
            get_file_info: function (id) {
                return myhttp({
                    url: api_url+'/api/file/getfiledatabyid?fileid='+id,
                    //url:api_url+'/api/file/download_file/'+id,
                    method: 'get'
                });
            }
        };
        return api;
    }])
})

//define([], function () {
//    var api_url = "";
//    var myhttp = '';
//    var api = {
//        get: function (pmyhtt, papi_url) {
//            api_url = papi_url;
//            myhttp = pmyhtt;
//            return api;
//        },
//        patent_service_type: function () {
//            return myhttp({
//                url: api_url + '/api/dic/patent_service_type',
//                method: 'get',
//                type: 'json'
//            });
//        },
//        trademake_service_type: function () {
//            return myhttp({
//                url: api_url + '/api/dic/trademake_service_type',
//                method: 'get',
//                type: 'json'
//            });
//        },
//        patent_industry_technology: function () {
//            return myhttp({
//                url: api_url + '/api/dic/patent_industry_technology',
//                method: 'get',
//                type: 'json'
//            });
//        },
//        deal_patent_industry: function (data) {
//            return myhttp({
//                url: api_url + '/deal/industry/select_all',
//                method: 'post',
//                type: 'json',
//                data: data
//            });
//        },
//        dealPatentIndustry: function (data) {
//            var sendData = {
//                pageindex: 1,
//                pagesize: 1000,
//                business: "patent"
//            };
//            return myhttp({
//                url: api_url + '/deal/industry/select_all',
//                method: 'post',
//                type: 'json',
//                data: sendData
//            });
//        },
//        add_patent_industry: function (data) {
//            return myhttp({
//                url: api_url + '/deal/industry/add',
//                method: 'post',
//                data: data
//            });
//        },
//        delete_patent_industry: function (data) {
//            return myhttp({
//                url: api_url + '/deal/industry/delete/' + data,
//                method: 'get'
//            });
//        },
//        //交易平台行业分类字典get
//        get_deal_industry: function (data) {
//            return myhttp({
//                url: api_url + '/deal/industry/select_all_t/' + data,
//                method: 'get'
//            });
//        },
//        //获取中华人民共和国地区数据(树形)
//        get_area_t: function (data) {
//            return myhttp({
//                url: api_url + '/api/dic/get_area_t',
//                method: 'get'
//            });
//        },
//        //树形结构
//        get_position_treedata:function(data)
//        {
//            return myhttp({
//                url:api_url+"/api/AllDic/GetDicTypeTree",
//                method:"post",
//                type:"json",
//                data:data
//            });
//        },
//        //获取所有城市这一级
//        get_area_l: function (data) {
//            return myhttp({
//                url: api_url + '/api/dic/get_area_l',
//                method: 'post',
//                type:"json",
//                data:data
//            });
//        },
//        //根据文件id获取文件信息
//        get_file_info: function (id) {
//            return myhttp({
//                    url: api_url+'/api/file/getfiledatabyid?fileid='+id,
//                method: 'get'
//            });
//        }
//    };
//    return api;
//});