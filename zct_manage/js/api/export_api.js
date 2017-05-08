define(["app","services/setting","services/http"],function (myapp) {
    myapp.factory("export_api",["setting", "myhttp",function (setting,myhttp) {
        var api_url = setting.api_url;
        var myhttp = myhttp;
        var api={
            GetExportTitle: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageSetting/GetExportTitle',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            ExportExcel: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManageProposal/ExportExcel',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            PatentExportExcel: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManagePatent/ExportExcel',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
        }
        return api;
    }])
})