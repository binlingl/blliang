/**
 * Created by panda on 2017/3/15.
 */
define(['app', 'services/setting', 'services/http'], function (myapp) {
    myapp.factory('account_api', ['setting', 'myhttp', function (setting, myhttp) {
        var api_url = setting.api_url;
        var myhttp = myhttp;
        var api = {
            login: function (data) {
                return myhttp({
                    url: api_url + '/api/DU/Login',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            register: function (data) {//注册
                return myhttp({
                    url: api_url + '/api/DU/PhoneRegister',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            send_forget_password_mail: function (data) {
                var send_data = {
                    EMail: data.email
                };
                return myhttp({
                    url: api_url + '/api/du/ForgetPasswordSendMail',
                    method: 'post',
                    type: 'json',
                    data: send_data
                });
            },
            forgetUpdateUserPassword: function (data) {
                var send_data = {
                    user_password: data.p_user_password,
                    token: data.token,
                    check_code: data.check_code
                };
                return myhttp({
                    url: api_url + '/api/user/Forget_Update_user_password',
                    method: 'post',
                    type: 'json',
                    data: send_data
                });
            },
            activate: function (data) {
                var send_data = {
                    ValidateInfo: data.ValidateInfo,
                    checkcode: data.checkcode,
                    key: data.key
                };
                return myhttp({
                    url: api_url + '/api/du/activate',
                    method: 'post',
                    type: 'json',
                    data: send_data
                });
            },
            login_out: function () {
                return myhttp({
                    url: api_url + '/api/du/login_out',
                    method: 'post',
                    type: 'json'
                });
            },


            getCompanyUsers: function (data) {
                var send_data = {
                    pageindex: 1,
                    pagesize: 100
                };
                return myhttp({
                    url: api_url + '/deal/dealuser/select_e',
                    method: 'post',
                    type: 'json',
                    data: send_data
                });
            },
            getPersonalUsers: function (data) {
                var send_data = {
                    pageindex: 1,
                    pagesize: 1000
                };
                return myhttp({
                    url: api_url + '/deal/dealuser/select_p',
                    method: 'post',
                    type: 'json',
                    data: send_data
                });
            },
            getCurrentUser1: function (data) {
                return myhttp({
                    url: api_url + '/deal/dealuser/userByToken',
                    method: 'get',
                    type: 'json'
                });
            },
            //需要登录
            getUserInfo: function () {
                return myhttp({
                    url: api_url + '/api/user/userbytoken',
                    method: 'post',
                    type: 'json'
                });
            },//不需要登录
            getUserByToken: function (data) {
                return myhttp({
                    url: api_url + '/api/user/GetUserByToken',
                    method: 'post',
                    type: 'json',
                    data: data
                });
            },
            //交易平台提交身份信息(个人)
            p_add: function (data) {
                return myhttp({
                    url: api_url + '/deal/dealuser/p_add',
                    method: 'post',
                    data: data
                });
            },
            //交易平台提交身份信息(企业)
            e_add: function (data) {
                return myhttp({
                    url: api_url + '/deal/dealuser/e_add',
                    method: 'post',
                    data: data
                });
            },
            send_mobile_code: function (data) {
                //http://yun.huadee.cn/woi/req/user.ashx?ajax=SendMobileCode&mobile=15986651392&checktype=MOBILE_REGISTER
                return myhttp({
                    url: api_url + '/api/du/SendMobileCode',
                    method: 'post',
                    data: data
                });
            },
            write_limit_sendmsgcookie: function (data) {
                //http://yun.huadee.cn/woi/req/user.ashx?ajax=SendMobileCode&mobile=15986651392&checktype=MOBILE_REGISTER
                return myhttp({
                    url: api_url + '/api/du/WriteLimitSendMsgCookie',
                    method: 'post',
                    data: data
                });
            },
            exist_mobile: function (data) {
                //http://yun.huadee.cn/woi/req/user.ashx?ajax=SendMobileCode&mobile=15986651392&checktype=MOBILE_REGISTER
                return myhttp({
                    url: api_url + '/api/du/ExistMobile',
                    method: 'post',
                    data: data
                });
            },
            huadee_phone_reg: function (data) {
                //http://yun.huadee.cn/woi/req/user.ashx?ajax=SendMobileCode&mobile=15986651392&checktype=MOBILE_REGISTER
                return myhttp({
                    url: api_url + '/api/du/HuadeePhoneReg',
                    method: 'post',
                    data: data
                });
            },
            reset_password: function (data) {
                //http://yun.huadee.cn/woi/req/user.ashx?ajax=SendMobileCode&mobile=15986651392&checktype=MOBILE_REGISTER
                return myhttp({
                    url: api_url + '/api/du/ResetPassword',
                    method: 'post',
                    data: data
                });
            },
            send_reg_code: function (data) {
                //http://yun.huadee.cn/woi/req/user.ashx?ajax=SendMobileCode&mobile=15986651392&checktype=MOBILE_REGISTER
                return myhttp({
                    url: api_url + '/api/du/SendRegCode',
                    method: 'post',
                    data: data
                });
            },
            check_pwd_code: function (data) {
                //http://yun.huadee.cn/woi/req/user.ashx?ajax=SendMobileCode&mobile=15986651392&checktype=MOBILE_REGISTER
                return myhttp({
                    url: api_url + '/api/du/CheckPwdCode',
                    method: 'post',
                    data: data
                });
            },
            identifyingCode: function (data) {
                return myhttp({
                    url: api_url + '/api/DU/SendRegisterPhoneCode',
                    method: 'post',
                    data: data
                });
            },
            forgetPassword: function (data) {//找回密码
                return myhttp({
                    url: api_url + '/api/DU/ForgetPassword',
                    method: 'post',
                    data: data
                });
            },
            forgetPasswordSendCode: function (data) {//忘记密码的验证码
                return myhttp({
                    url: api_url + '/api/DU/ForgetPasswordSendCode',
                    method: 'post',
                    data: data
                });
            }


        }
        return api;
    }])
})