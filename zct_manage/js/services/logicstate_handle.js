define(["app", 'services/_logicstate_handle', 'services/setting', 'lodash'], function (myapp) {
    myapp.factory("logicstate_handle", ['$location', 'setting', '_logicstate_handle', function ($location, config, _logicstate_handle) {
        var action401 = function (logicstate, data) {
            var backurl = encodeURIComponent($location.$$absUrl);
            backurl = config.url_href.login + "?backurl=" + backurl;
            window.location.href = backurl;
        }

        var isHave = function (rule, rules) {
            var flag = false;
            _.each(rules, function (item) {
                if (rule.locgicstate + "" == item.locgicstate + "") {
                    flag = true;
                    return;
                }
            })
            return flag;
        }
        var rules = [{
            locgicstate: 401,
            action: action401
        }];
        _.each(_logicstate_handle, function (item) {
            if (!isHave(item, rules)) {
                rules.push(item);
            }
        })
        return function (logicstate, data) {
            _.each(rules, function (rule) {
                if (rule.locgicstate + "" == logicstate + "") {
                    rule.action(logicstate, data);
                    return;
                }
            });
        };
    }]);
})