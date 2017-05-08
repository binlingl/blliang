define(['app','services/model/user','services/setting','api/user_api','services/common','jquery'],function (myapp) {
    myapp.directive('login', ['$uibModal', 'common', '$rootScope', 'usermodel','setting',
        function ($uibModal, common, $rootScope,usermodel,setting) {
        return {
            template: '<a ng-show="isLogin" href="{{config.url_href.personal}}" class="pc">{{zw_word}}</a><a ng-show="!isLogin" class="dl">登录</a>',
            link: function (s, ele) {
                s.pdata = {};
                var model = usermodel.createNew();

                //判断用户是否登陆
//1、获取用户名
                s.config = setting;

                console.log(setting);
                s.zw_word = common.getCookie(setting.cookies.user.name);
                s.$on("loadsuccess", function () {

                    s.zw_word = common.getCookie(setting.cookies.user.name);
                    s.userclass = common.getCookie(setting.cookies.user.class);
                    s.isLogin=common.isLogin();
                    if (s.userclass == 'ENTERPRISE') {
                        $(ele).find('.pc').attr('href', setting.url_href.personal_e);
                    } else if (s.userclass == 'PERSONAL') {
                        $(ele).find('.pc').attr('href', setting.url_href.personal_p);
                    }
                    s.userType = s.userclass;
                    s.isLogin = true;
                });

                setTimeout(function () {
                    console.log("=============8888888==");
                    s.userclass = common.getCookie(setting.cookies.user.class);

                    if (s.userclass == 'ENTERPRISE') {
                        ele.find('.pc').attr('href', setting.url_href.personal_e);
                    } else if (s.userclass == 'PERSONAL') {
                        ele.find('.pc').attr('href', setting.url_href.personal_p);
                    } else {
                        ele.find('.pc').attr('href', setting.url_href.personal);
                    }
                }, 1000);

                //ele.find('.pc').attr('href', '/full_platform/#/personal_center/profile?menu=个人信息');
                //2、绑定到个人中心的路径

                console.log(ele.find('.dl'));
                $(ele).find('.dl').on('click', function () {
                    console.log('invoke login click');
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '/js/directives/login/login.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'md',
                        scope: s,
                        resolve: {
                            items: function () {
                                return s.items;
                            }
                        }
                    });
                    modalInstance.result.then(function (data) {

                    }, function () {
                        console.log(s.items);
                        //$log.info('Modal dismissed at: ' + new Date());
                    });
                });


            }
        }
    }]);

    myapp.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', "$rootScope", 'usermodel','user_api',
        function ($scope, $uibModalInstance, $rootScope,usermodel,user_api) {

        //$scope.items = items;
        console.log($scope.items);
        //$scope.selected = {
        //    item: $scope.items[0]
        //};
        var s = $scope;
        $scope.ok = function () {
            $uibModalInstance.close($scope.items);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        s.pdata = {};
        var model = usermodel.createNew();
        $scope.login_usersform_submit = function (cancel) {

            user_api.login($scope.pdata).success(function (data) {
                var login_data = data.data;
                console.log(login_data);
                if (login_data && login_data.login_state == "true") {
                    model.name = login_data.user.name;
                    s.zw_word = model.name;
                    model.type = login_data.user.usertype;
                    model.user_class = login_data.user.user_class;
                    model.session = login_data.client_session;
                    model.huadee_name = login_data.huadee;
                    model.saveToCookies();
                    model.addhuadeenCookiesName();
                    //$uibModalInstance.close(data);
                    $rootScope.$broadcast('loadsuccess', model);
                    cancel();
                } else {
                    console.log(data);
                    s.msg = data.data.login_msg;
                    console.log(s.msg);
                    //
                    function equals(msg, 密码错误) {
                        if (str1 == str2) {
                            return true;
                        }
                        return false;
                    }
                }
            }).error(function (data) {
                reject(data);
            });

        }
    }]);

});