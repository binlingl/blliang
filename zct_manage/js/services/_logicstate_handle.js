define(["app", 'services/myalert/myalert', 'services/setting'], function (myapp) {

    myapp.factory("_logicstate_handle", ["myalert", '$location', 'setting', function (myalert, $location, config) {
        var action110 = function (logicstate, data) {
            myalert.alert('提示', data.msg, function () {
            })
        };
        var action403 = function (logicstate, data) {
            myalert.alert("提示", "权限不足", function () {

            });
        };
        var action4031 = function (logicstate, data) {
            myalert.alert("提示", "需要先通过用户认证", function () {
                console.log(config.url_href.identity);
                document.location = config.url_href.identity;
            });
        };
        var action401 = function (logicstate, data) {
            var backurl_flag = $location.$$absUrl.indexOf(config.url_href.resume_manage_show);
            var backurl = encodeURIComponent($location.$$absUrl);

            if (backurl_flag == -1) {
                myalert.login(true);
            } else {
                backurl = config.url_href.loginOut + "?backurl=" + backurl;

                window.location.href = backurl;
            }
        };
        return [
            {locgicstate: 110, action: action110},
            {locgicstate: 403, action: action403},
            {locgicstate: 4031, action: action4031},
            {locgicstate: 401, action: action401}
        ];
    }]);
})