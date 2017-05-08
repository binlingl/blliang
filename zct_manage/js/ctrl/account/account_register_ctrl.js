/**
 * Created by panda on 2017/3/15.
 */
define(["app", 'services/zctlocal_storage', 'api/account_api', 'services/myalert/myalert'], function (myapp) {
    myapp.controller('account_register_ctrl', ['$scope', 'account_api', 'zctlocal', 'myalert', '$state',function (s, account_api, zctlocal, myalert,$state) {
        console.log('account_register_ctrl');
        s.init = {
            count: 0
        };
        s.register = function () {
            console.log("9999999999999999999")
            var send_data = {
                Phone: s.init.phone,
                PassWord: s.init.password,
                ValidateInfo: s.init.validateinfo
            };
            account_api.register(send_data).success(function (data) {
                console.log(data);
                zctlocal.setlocal('loginData', data)
                if(data.state=='true'){
                    myalert.alert('', '注册成功', function () {
                        $state.go('account.login');
                    })
                }else{
                    myalert.alert('',data.msg, function () {
                    })
                }

            }).error(function (data) {
                console.log(data);
            })
        }
        var secend = 60;
        s.init.count = 60;
        //获取验证码
        var codeInterval;
        var clock = function () {
            secend--;
            s.init.count = secend;
            console.log(s.init.count);
            if (secend == 0) {
                s.init.count = 60;
                secend = 60;
                codeInterval = window.clearInterval(codeInterval);
            } else {

            }
            s.$apply();
        }
        s.identifying_code = function () {
            var form_data = {
                Phone: s.init.phone
            }
            console.log(form_data);
            account_api.identifyingCode(form_data).success(function (data) {
                console.log(data);
                if (data.state=='true') {

                    codeInterval = setInterval(clock, 1000);
                }else{
                    myalert.alert('', data.msg, function () {
                    })
                }
            }).error(function (data) {
                console.log(data);
            })
        }

    }]);
});
