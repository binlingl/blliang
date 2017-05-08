define(['app', 'webupload','jquery','services/setting','services/common'], function (myapp,WebUploader,jQuery) {
    myapp.factory('web_uploader', ['setting','common', function (config,common) {
        var web_uploader = {};
        console.log(WebUploader);
        var webUploaderFun = function () {
            WebUploader.Uploader.register({
                //s.webUploader.Uploader.register({
                'before-send': 'checkchunk',
                'before-send-file': 'preupload'
            }, {
                checkchunk: function (block) {
                    //console.log("checkchunk");
                    var owner = this.owner;
                    var deferred = $.Deferred();

                    owner.md5File(block.blob)
                        .then(function (val) {
                            //console.log('block md5:', val);
                            owner.options.formData.blockMd52 = val;
                            deferred.resolve();
                            //deferred.reject();
                        });

                    return $.when(deferred);
                },
                preupload: function (file) {
                    var me = this,
                        owner = this.owner;

                    return owner.md5File(file.source)
                        .then(function (md5) {
                            console.log('file md5:', md5);
                            owner.options.formData.fileMd52 = md5;
                        });
                }
            });
        };
        webUploaderFun();
        web_uploader.newUploader = function (options, func) {

            var defaultOptions = jQuery.extend(true, {}, config.Uploader.options.default);
            var myOptions = jQuery.extend(true, defaultOptions, options);
            //options.pick = pick;
            myOptions.formData = {fileid: WebUploader.Base.guid()}
            var uploader = WebUploader.create(myOptions);

            if (common.is_exist(func)) {
                if (common.is_exist(func.fileQueued)) {
                    uploader.on('fileQueued', func.fileQueued);
                }
                if (common.is_exist(func.uploadAccept)) {
                    uploader.on('uploadAccept', func.uploadAccept);
                }
                if (common.is_exist(func.uploadProgress)) {
                    uploader.on('uploadProgress', func.uploadProgress);
                }
                if (common.is_exist(func.uploadSuccess)) {
                    uploader.on('uploadSuccess', func.uploadSuccess);
                }
                if (common.is_exist(func.uploadError)) {
                    uploader.on('uploadError', func.uploadError);
                }
                if (common.is_exist(func.uploadComplete)) {
                    uploader.on('uploadComplete', func.uploadComplete);
                }
                if (common.is_exist(func.uploadBeforeSend)) {
                    uploader.on('uploadBeforeSend', func.uploadBeforeSend);
                }
            } else {
                uploader.on('fileQueued', function (file) {
                    //console.log("fileQueued");
                });
                uploader.on('uploadAccept', function (file, response) {
                    //console.log("uploadAccept:");
                });
                uploader.on('uploadProgress', function (file, percentage) {
                    //console.log(file.id + ":" + percentage);
                });
                uploader.on('uploadSuccess', function (file) {
                    //console.log("uploadSuccess:"+file.id);
                });
                uploader.on('uploadError', function (file) {
                    //console.log("uploadError:"+file.id);
                });
                uploader.on('uploadComplete', function (file) {
                    //console.log("uploadComplete:"+file.id);
                });
                uploader.on('uploadBeforeSend', function (block, data) {

                });
            }

            return uploader;
        };
        return web_uploader;
    }]);
});