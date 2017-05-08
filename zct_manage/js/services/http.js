define(['app', 'services/logicstate_handle','services/_logicstate_handle','services/common','services/setting','lodash'], function (myapp) {
    myapp.factory('myhttp', ['$q', '$http', '$timeout', '$state', 'common', 'setting', 'logicstate_handle','$location',
        function ($q, $http, $timeout, $state, common, config, logicstate_handle,$location) {
            var basehttp;
            //显示进度条
            var showProgress = function () {
                $(".loading-progress").removeClass("progress-out").show().addClass("progress-in");

            };


            //隐藏进度条
            var hideProgress = function () {
                $(".loading-progress").removeClass("progress-in").addClass("progress-out");
                setTimeout(function () {
                    $(".loading-progress").hide();
                }, 800)
            };

            //显示提示
            var set_auto_message = function (message) {
                $('.auto-message').html(message);
                $timeout(clear_auto_message, 2000, false);
            };

            //隐藏提示
            var clear_auto_message = function () {
                $('.auto-message').html("");
            };

            return basehttp = function (request) {

                var promise;
                showProgress();
                if (request.url.indexOf('?') !== -1) {
                    request.url = request.url + "&random=" + _.random(1, 1000);
                } else {
                    request.url = request.url + "?random=" + _.random(1, 1000);
                }

                if (common.is_exist(common.getCookie(config.client_session_cookie))) {
                    request.url = request.url + "&token=" + common.getCookie(config.client_session_cookie);
                }

                if (common.is_exist(common.getCookie(config.sp_session_cookie))) {
                    request.url = request.url + "&sp_token=" + common.getCookie(config.sp_session_cookie);
                }

                promise = $q(function (resolve, reject) {
                    return $http(request).success(function (data, state) {
                        //错误提示
                        if (data.state+"" == 'false') {
                            logicstate_handle(data.logicstate,data)
                        }

                        resolve(data, state);
                        hideProgress();

                    }).error(function (data, state) {
                        hideProgress();
                        reject(data, state);
                    });
                });
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn2) {
                    return promise["catch"](fn2);
                };
                return promise;
            };
        }]);


});