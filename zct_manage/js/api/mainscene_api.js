/**
 * Created by panda on 2017/3/15.
 */
define(['app', 'services/setting', 'services/http'], function (myapp) {
    myapp.factory('mainscene_api', ['setting', 'myhttp', function (setting, myhttp) {
        var api_url = setting.api_url;
        var myhttp = myhttp;
        var api = {
            getAnnualfeeExpire: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManagePatent/GetAnnualfeeExpire',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            patentTypeStatistics: function (data) {
                return myhttp({
                    url: api_url + '/manage/ManagePatent/PatentTypeStatistics',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            }
        }
        return api;
    }])
})