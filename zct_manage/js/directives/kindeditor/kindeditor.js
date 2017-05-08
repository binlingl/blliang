define(['app','env','kindeditor-all'],function (myapp,env) {
    myapp.directive('kindedit', ["setting", function (setting) {

        var linkFn = function (scope, elm, attr) {

            setTimeout(function () {
                var img_upload_path = '';
                if (env == 'test') {
                    img_upload_path = "http://operate.greatipr.cn/api/common/kindeditorimageupload";
                } else if (env == "production") {
                    img_upload_path = "http://operate.greatipr.com/api/common/kindeditorimageupload";
                }
                var _config = {
                    width: '100%',
                    autoHeightMode: true,
                    afterCreate: function () {
                        this.loadPlugin('autoheight');
                    },
                    uploadJson: img_upload_path,
                    fileManagerJson: '../asp.net/file_manager_json.ashx',
                    allowFileManager: false
                };

                var editorId = elm[0];

                var count = 0;
                _config.afterChange = function () {
                    var that = this;
                    if (count > 2) {
                        var afterContent = that.html();
                        var afterText = that.text();
                        scope.uecontextobj = that.html();
                        scope.afterchange({fileids: afterContent, aftertext: afterText});
                    }
                    count++;
                };

                KindEditor.ready(function () {
                    console.log('DOM loaded');
                });

                KindEditor.create(editorId, _config);

                scope.$watch("uecontextobj", function () {

                    KindEditor.html(editorId, scope.uecontextobj);

                });
            }, 300);

        };

        return {
            restrict: 'AC',
            templateUrl: '/js/directives/kindeditor/kindeditor.html',
            scope: {
                afterchange: '&',
                ueid: '@',
                uecontextobj: '='
            },
            link: linkFn
        };
    }]);

});