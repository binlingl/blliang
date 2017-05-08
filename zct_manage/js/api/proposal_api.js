/**
 * Created by admin on 2017/3/21.
 */
define(["app","services/setting","services/http"],function(myapp){
    myapp.factory('proposal_api',['setting', 'myhttp', function (setting, myhttp){
        var api_url = setting.api_url;
        var myhttp = myhttp;
        var api = {
            /*getProposalList*/
            getProposalList: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageProposal/GetApprovalList',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            /*删除*/
            deleteProposal: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageProposal/DeleteProposal',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            /*my prosal list*/
            getProposals: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageProposal/GetApprovals',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            /*add proposal*/
            addProposal: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageProposal/AddProposal',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            /*edit proposal*/
            editProposal:function(data){
                return myhttp({
                    url:api_url+'/manage/ManageProposal/EditProposal',
                    method:'post',
                    type:'json',
                    data:data
                })
            },
            /*new proposal id*/
            createCassNumber: function () {
                return myhttp({
                    url: api_url + '/manage/ManageProposal/CreateCaseNumber',
                    method: 'get',
                    type: 'json'
                });
            },
            //获取部门详情
            GetDepartmentlist: function () {
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetDepartmentAndRoleList',
                    method: 'get',
                    type: 'json'
                });
            },
            //提案詳情
            proposa_detaile: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageProposal/GetProposalDetailById',
                    method: 'post',
                    type: 'json',
                    data:data
                });
            },
            GetApprovalUserlist: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetApprovalUser',
                    method: 'post',
                    type: 'json',
                    data:data
                });
            },
            //提案数量统计
            ProposalStatistics: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageProposal/ProposalStatistics',
                    method: 'get',
                    type: 'json',
                    data:data
                });
            },
            //提案审批
            approvalProposal: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageProposal/ApprovalProposal',
                    method: 'post',
                    type: 'json',
                    data:data
                });
            },
            //通过id获取文件详情
            getfiledatabyid:function(data){
                return myhttp({
                    url: 'http://api.greatipr.cn/api/file/getfiledatabyid?fileid='+data,
                    method: 'get',
                    type: 'json',
                    data:data
                });
            }





        };





        return api;

    }]);
});
