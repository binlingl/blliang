define(['app', 'services/setting', 'services/http'], function (myapp) {
    myapp.factory('patent_api', ['setting', 'myhttp', function (setting, myhttp) {
        var api_url = setting.api_url;
        var myhttp = myhttp;
        var api = {
            costYearsStatistics: function (data) {//费用年份统计
                return myhttp({
                    url: api_url + '/manage/ManagePatent/CostYearsStatistics',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            costStatistics: function (data) {//费用状态统计
                return myhttp({
                    url: api_url + '/manage/ManagePatent/CostStatistics',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            //新增专利
            savePatent:function(data){
                return myhttp({
                    url: api_url + '/manage/ManagePatent/savePatent',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            //添加申请费用
            SaveApplicationfee:function(data){
                return myhttp({
                    url: api_url + '/manage/ManagePatent/SaveApplicationfee',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            //添加年费
            SaveAnnualfee:function(data){
                return myhttp({
                    url: api_url + '/manage/ManagePatent/SaveAnnualfee',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            //添加奖励
            SaveReward:function(data){
                return myhttp({
                    url: api_url + '/manage/ManagePatent/SaveReward',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            //添加资助
            SaveFunded:function(data){
                return myhttp({
                    url: api_url + '/manage/ManagePatent/SaveFunded',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            //删除申请费用
            DeleteApplicationfee:function(data){
                return myhttp({
                    url: api_url + '/manage/ManagePatent/DeleteApplicationfee',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            //删除年费
            DeleteAnnualfee:function(data){
                return myhttp({
                    url: api_url + '/manage/ManagePatent/DeleteAnnualfee',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            //删除奖励
            DeleteReward:function(data){
                return myhttp({
                    url: api_url + '/manage/ManagePatent/DeleteReward',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            //删除资助
            DeleteFunded:function(data){
                return myhttp({
                    url: api_url + '/manage/ManagePatent/DeleteFunded',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            //获取专利详情
            GetPatent:function(data){
                return myhttp({
                    url: api_url + '/manage/ManagePatent/GetPatentDetailById',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },

            //获取部门
            GetDepartment:function(data){
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetDepartmentAndRoleList',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            //获取对应提案
            GetProposalListByName:function(data){
                return myhttp({
                    url: api_url + '/manage/ManageProposal/GetProposalListByName',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            patentStatistics:function(data){//专利年份统计
                return myhttp({
                    url: api_url + '/manage/ManagePatent/PatentStatistics',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            patentStatusStatistics: function (data) {//专利状态统计
                return myhttp({
                    url: api_url + '/manage/ManagePatent/PatentStatusStatistics',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            getCaseNumber:function(data){
                return myhttp({
                    url: api_url + '/manage/ManagePatent/CreateCaseNumber',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            getPatentList: function (data) {//专利管理列表
                return myhttp({
                    url: api_url + '/manage/ManagePatent/GetPatentList',
                    method: 'post',
                    type: 'json',
                    data: data
                });

            },
            getCostList: function (data) {//费用管理列表
                return myhttp({
                    url: api_url + '/manage/ManagePatent/GetCostList',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            deletePatent: function (data) {//删除专利管理列表的数据
                return myhttp({
                    url: api_url + '/manage/ManagePatent/DeletePatent',
                    method: 'post',
                    type: 'json',
                    data: data
                });

            },

            getPatentDetailById:function(data){//专利详情
                return myhttp({
                    url: api_url + '/manage/ManagePatent/GetPatentDetailById',
                        method: 'post',
                        type: 'json',
                        data: data
                });


            },
            patentGetCountry:function(data){//专利详情
                return myhttp({
                    url: api_url + '/manage/ManagePatent/GetCountry',
                    method: 'post',
                    type: 'json',
                    data: data
                });


            },
            getCountry: function (data) {//国家
                return myhttp({
                    url: api_url + '/manage/ManagePatent/GetCountry',
                    method: 'get',
                    type: 'json'
                });


            },
            getMyPatentList: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManagePatent/GetMyPatentList',
                    method: 'post',
                    type: 'json',
                    data: data
                });


            },
            dealPatent: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManagePatent/DealPatent',
                    method: 'post',
                    type: 'json',
                    data: data
                });


            },

        }
        return api;
    }]);

})