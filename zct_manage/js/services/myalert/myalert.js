
define(['app'], function (myapp) {
    myapp.factory('myalert', ['$uibModal', function ($uibModal) {
        var alertstate = false;
        var messagestate = false;
        var loginstate = false;
        return {
            //带回调函数的提示框
            alert: function (title, msg, callback) {
                if (!alertstate) {
                    alertstate = true;
                    var modelins = $uibModal.open({
                        backdrop: "static",
                        templateUrl: '/js/services/myalert/alert.html',
                        controller: ['$scope', '$uibModalInstance', function (s, $uibModalInstance) {
                            s.title = title;
                            s.msg = msg;
                            s.callback = function () {
                                alertstate = false;
                                $uibModalInstance.close();
                                callback()
                            };
                        }],
                        size: "alert"
                    });
                    console.log('....**********............');
                    console.log(modelins.closed)
                    modelins.closed.then(function () {
                        alertstate = false;
                        // $uibModalInstance.close();
                        callback()

                    }, function () {
                        console.log('22222222222');
                    })
                }
            },
            //不带回调函数的提示框
            content: function (title, msg) {
                if (!alertstate) {
                    alertstate = true;
                    var modelins = $uibModal.open({
                        backdrop: "static",
                        templateUrl: '/js/services/myalert/alert.html',
                        controller: ['$scope', '$uibModalInstance', function (s, $uibModalInstance) {
                            s.title = title;
                            s.msg = msg;
                            s.callback = function () {
                                alertstate = false;
                                $uibModalInstance.close();
                                //callback()
                            };
                        }],
                        size: "alert"
                    });
                    console.log('....**********............');
                    console.log(modelins.closed)
                    modelins.closed.then(function () {
                        alertstate = false;
                         //$uibModalInstance.close();
                        //callback()

                    }, function () {
                        console.log('22222222222');
                    })
                }
            },
            alert_buy: function (title, msg, buttonStr, callback) {
                if (!alertstate) {
                    alertstate = true;
                    $uibModal.open({
                        backdrop: "static",
                        templateUrl: '/js/services/myalert/alert_buy.html',
                        controller: ['$scope', '$uibModalInstance', function (s, $uibModalInstance) {
                            s.title = title;
                            s.msg = msg;
                            s.buttonStr = buttonStr;
                            s.callback = function () {
                                alertstate = false;
                                $uibModalInstance.close();
                                callback()
                            };
                        }],
                        size: "alert"
                    });

                }
            },
            message: function (title, msg, canclecallback, okcallback) {
                if (!messagestate) {
                    messagestate = true
                    $uibModal.open({
                        backdrop: "static",
                        templateUrl: '/js/services/myalert/message.html',
                        controller: ['$scope', '$uibModalInstance', function (s, $uibModalInstance) {

                            var closewin = function () {
                                messagestate = false;
                                $uibModalInstance.close();
                            }
                            s.title = title;
                            s.msg = msg;
                            s.okcallback = function () {
                                closewin();
                                okcallback();
                            };

                            var cccacbalk = s.canclecallback = function () {
                                closewin();
                                canclecallback();
                            };

                            $uibModalInstance.result.then(function () {

                            }, function () {
                                cccacbalk();
                            });

                        }],
                        size: "message"
                    })
                }
            },
            /*弹出登陆窗
             * s:页面上的scope*/
            login: function (isfresh, afterurl) {
                if (!loginstate) {
                    loginstate = true;
                    var modalInstance = $uibModal.open({
                        animation: true,
                        //backdrop:"static",
                        templateUrl: '/js/services/myalert/login.html',
                        controller: ['$scope', '$uibModalInstance', "$rootScope", function ($scope, $uibModalInstance, $rootScope) {

                            //$scope.items = items;
                            //$scope.selected = {
                            //    item: $scope.items[0]
                            //};
                            var s = $scope;
                            $scope.closeloginform = function () {
                                $uibModalInstance.dismiss('cancel');
                                loginstate = false;
                            }
                            $scope.ok = function () {
                                $uibModalInstance.close($scope.selected.item);
                            };

                            $scope.cancel = function () {
                                $uibModalInstance.dismiss('cancel');
                            };
                            s.pdata = {};
                            var model = s.model.User.createNew();
                            $scope.login_usersform_submit = function (cancel) {
                                $scope.apis.user.login($scope.pdata).success(function (data) {
                                    var login_data = data.data;
                                    if (login_data && login_data.login_state == "true") {
                                        model.name = login_data.user.name;
                                        s.zw_word = model.name;
                                        model.type = login_data.user.usertype;
                                        model.session = login_data.client_session;
                                        model.huadee_name = login_data.huadee;
                                        model.saveToCookies();
                                        model.addhuadeenCookiesName();
                                        //$uibModalInstance.close(data);
                                        $rootScope.$broadcast('loadsuccess', model);
                                        if (isfresh) {
                                            location.reload();
                                        } else {
                                            if (afterurl) {
                                                location.href = afterurl;
                                            }
                                        }
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
                        }]

                    });

                    modalInstance.result.then(function (data) {

                    }, function () {
                        //$log.info('Modal dismissed at: ' + new Date());
                    });
                    modalInstance.closed.then(function () {
                        loginstate = false;
                    });
                }
            },
            /*弹出登陆窗(个人中心弹窗)
             * s:页面上的scope*/
            login_center: function (isfresh, afterurl) {
                if (!loginstate) {
                    loginstate = true;
                    var modalInstance = $uibModal.open({
                        animation: true,
                        backdrop: "static",
                        templateUrl: '/js/services/myalert/login.html',
                        controller: ['$scope', '$uibModalInstance', "$rootScope", function ($scope, $uibModalInstance, $rootScope) {

                            //$scope.items = items;
                            //$scope.selected = {
                            //    item: $scope.items[0]
                            //};
                            var s = $scope;
                            $scope.closeloginform = function () {
                                $uibModalInstance.dismiss('cancel');
                                loginstate = false;
                            }
                            $scope.ok = function () {
                                $uibModalInstance.close($scope.selected.item);
                            };

                            $scope.cancel = function () {
                                $uibModalInstance.dismiss('cancel');
                            };
                            s.pdata = {};
                            var model = s.model.User.createNew();
                            $scope.login_usersform_submit = function (cancel) {
                                $scope.apis.user.login($scope.pdata).success(function (data) {
                                    var login_data = data.data;
                                    if (login_data && login_data.login_state == "true") {
                                        model.name = login_data.user.name;
                                        s.zw_word = model.name;
                                        model.type = login_data.user.usertype;
                                        model.session = login_data.client_session;
                                        model.huadee_name = login_data.huadee;
                                        model.saveToCookies();
                                        model.addhuadeenCookiesName();
                                        //$uibModalInstance.close(data);
                                        $rootScope.$broadcast('loadsuccess', model);
                                        if (isfresh) {
                                            location.reload();
                                        } else {
                                            if (afterurl) {
                                                location.href = afterurl;
                                            }
                                        }
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
                        }]

                    });

                    modalInstance.result.then(function (data) {

                    }, function () {
                        //$log.info('Modal dismissed at: ' + new Date());
                    });
                    modalInstance.closed.then(function () {
                        loginstate = false;
                    });
                }
            }
        }
    }]);
});
