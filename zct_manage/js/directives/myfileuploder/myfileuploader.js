define(['app', 'jquery', 'services/web_uploader', 'services/common', 'services/setting',
    'api/dictionary_api', 'services/myalert/myalert'], function (myapp) {
    myapp.directive('myfileuploder', ['web_uploader', function (web_uploader) {
        return {
            scope: {
                uploadcomplete: '&'
            },
            templateUrl: '/js/directives/myfileuploder/myuploader.html',
            link: function (s, element, attrs) {
                var ele = $(element);
                var uploadOptions = {
                    auto: false,
                    pick: '#' + attrs.id + ' #changchangdezhantai'
                };

                var fileids = [];
                var uploader = web_uploader.newUploader(uploadOptions)
                uploader.on('fileQueued', function (file) {
                    //console.log(file);
                    ele.find('.filelist').append("<p>" + file.name + "</p>");
                });

                uploader.on('uploadAccept', function (a, b) {
                    fileids.push(b.data.fileid);
                });

                uploader.on('uploadComplete', function () {
                    if (uploader.getStats().progressNum == 0) {
                        //uploader.reset();
                        ele.find('.filelist').empty();
                        s.uploadcomplete({fileids: fileids});
                        fileids = [];
                    }
                });

                ele.find('.btnstartupload').on('click', function () {
                    _.each(uploader.getFiles(), function (file) {
                        uploader.upload(file);
                    })
                });
            }
        }
    }]);
    /*
     * 图片文件处理*/
    myapp.directive('myfileupdown', ['common', 'setting', '$timeout', 'web_uploader', 'dictionary_api',
        function (common, config, $timeout, web_uploader, dictionary_api) {
            return {
                scope: {
                    uploadcomplete: '&'
                },
                templateUrl: '/js/directives/myfileuploder/myfileoperate.html',
                link: function (s, element, attrs) {
                    var ele = $(element);
                    s.pickbuttonid = attrs.pickid + "zheshizifuchuan";
                    var uploadOptions;

                    //定义变量
                    s.old_file_array = [];
                    var value_array = [];
                    var fileids = [];//文件上传返回新文件id
                    var file_str = [];//返回新旧文件id总数
                    var newfile = [];//新文件集合
                    var file_file = [];
                    $timeout(function () {
                        //记载已有的数据
                        (function init() {
                            if (attrs.filesvalue != null && attrs.filesvalue != "") {
                                console.log(attrs.filesvalue);
                                if ((attrs.filesvalue + "").indexOf('[') >= 0 && (attrs.filesvalue + "").indexOf(']') > 1)
                                    value_array = JSON.parse(attrs.filesvalue);
                                else  value_array.push(attrs.filesvalue);
                            }
                            _.each(value_array, function (item) {
                                var filepath = config.api_url + "/api/file/download_file/" + item;
                                var filename = "";
                                // apis.dictionary.get_file_info(item).success(function (data) {
                                dictionary_api.get_file_info(item).success(function (data) {
                                    if (data.data != null) {
                                        filename = data.data.name;
                                        var file_str = {id: item, path: filepath, name: filename}
                                        s.old_file_array.push(file_str);
                                        ele.find('.filelist').append("<span id='" + item + "' class='filespandirective'>" +
                                            "<span>" + filename + "</span>" +
                                            "<button type='button' class='" + item + "' name='" + item + "'>x</button>" +
                                            "</span>");
                                        ele.find("." + item).on("click", function () {
                                            ele.find('#' + this.name).detach();
                                            value_array.splice($.inArray(this.name, value_array), 1);
                                            s.uploadcomplete({fileids: value_array});
                                        });
                                    }
                                });
                            });

                        })();

                        //初始化上传组件配置
                        if (attrs.filetype != null && attrs.filetype != "") {
                            uploadOptions = {
                                auto: false,
                                pick: '#' + attrs.pickid + " .filebutton",
                                accept: {
                                    title: "file",
                                    extensions: attrs.filetype,
                                    mimeTypes: "application/pdfapplication/x-ppt,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-works,application/vnd.ms-powerpoint,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                }
                            };
                        } else {
                            uploadOptions = {
                                auto: false,
                                pick: '#' + attrs.pickid + " .filebutton"
                            };
                        }
                        var uploader = web_uploader.newUploader(uploadOptions);

                        uploader.on('fileQueued', function (file) {
                            uploader.upload(file);
                            file_file.push(file);
                            var file_str = {id: "", path: "", name: file.name}
                            newfile.push(file_str);

                        });

                        uploader.on('uploadAccept', function (a, b) {
                            fileids.push(b.data.fileid);
                        });
                        uploader.on('uploadComplete', function () {
                            if (uploader.getStats().progressNum == 0) {
                                for (var i = 0; i < fileids.length; i++) {
                                    var filepath = config.api_url + "/api/file/download_file/" + fileids[i];
                                    newfile[i].id = fileids[i];
                                    newfile[i].path = filepath;
                                }
                                _.each(newfile, function (item) {
                                    ele.find('#' + item.id).detach();
                                    ele.find('.filelist').append("<span class='filespandirective' id='" + item.id + "'>" +
                                        "<span>" + item.name + "</span>" +
                                        "<button type='button' class='filebuttondirective' name='" + item.id + "'>x</button>" +
                                        "</span>");
                                });
                                ele.find('.filelist button').on("click", function () {
                                    var file_name = ele.find('#' + this.name).attr("name")
                                    ele.find('#' + this.name).detach();
                                    file_str.splice($.inArray(this.name, file_str), 1);
                                    newfile.splice($.inArray(this.name, newfile), 1);
                                    value_array.splice($.inArray(this.name, value_array), 1);
                                    fileids.splice($.inArray(this.name, fileids), 1);
                                    _.each(file_file, function (item) {
                                        if (item.name == file_name) {
                                            uploader.removeFile(item, true);
                                        }
                                    })
                                    file_str = fileids.concat(value_array);
                                    s.uploadcomplete({fileids: file_str});
                                });
                                file_str = fileids.concat(value_array);
                                s.uploadcomplete({fileids: file_str});
                            }
                        });
                    }, 300, false);

                    /*ele.find(".filebutton").on("click", function () {
                     $('#' + attrs.pickid + ' input').trigger("click");
                     uploader.reset();
                     })*/
                }
            }
        }]);
    /*图片文件个数处理*/
    myapp.directive('myfileupdownp', ['common', 'setting', 'dictionary_api', 'myalert', 'web_uploader',
        function (common, config, dictionary_api, myalert, web_uploader) {
            return {
                scope: {
                    uploadcomplete: '&'
                },
                templateUrl: '/js/directives/myfileuploder/myfileoperate.html',
                link: function (s, element, attrs) {
                    var ele = $(element);
                    var fileType = attrs.filetype;
                    var cid = attrs.filecount;
                    console.log(fileType);
                    console.log(cid);
                    s.pickbuttonid = attrs.pickid + "changchangdezhantai";
                    var uploadOptions;
                    if (cid == 1) {
                        uploadOptions = {
                            auto: false,
                            pick: {id: '#' + attrs.pickid + " .filebutton", multiple: false} // + '#changchangdezhantai'
                        };
                    } else {
                        uploadOptions = {
                            auto: false,
                            pick: '#' + attrs.pickid + " .filebutton" // + '#changchangdezhantai'
                        };
                    }
                    if (fileType != null && fileType != "" && angular.isDefined(fileType)) {
                        var mimeTypes = common.getMimeTypes(attrs.filetype);
                        uploadOptions.accept = {
                            title: "file",
                            extensions: attrs.filetype,
                            mimeTypes: mimeTypes
                        }
                    }
                    s.old_file_array = [];
                    var value_array;
                    if (attrs.filesvalue != null && attrs.filesvalue != "") {
                        value_array = JSON.parse(attrs.filesvalue);
                    } else {
                        value_array = [];
                    }
                    //定义变量
                    var fileids = [];//文件上传返回新文件id
                    var file_str = [];//返回新旧文件id总数
                    var newfile = [];//新文件集合
                    var file_file = [];
                    var duoyude = [];
                    //记载已有的数据
                    (function init() {
                        _.each(value_array, function (item) {
                            var filepath = config.api_url + "/api/file/download_file/" + item;
                            var filename = "";
                            dictionary_api.get_file_info(item).success(function (data) {
                                if (data.data != null) {
                                    filename = data.data.name;
                                    var file_str = {id: item, path: filepath, name: filename}
                                    s.old_file_array.push(file_str);
                                    ele.find('.filelist').append("<span id='" + item + "' class='filespandirective'>" +
                                        "<span>" + filename + "</span>" +
                                        "<button type='button' class='" + item + "' name='" + item + "'>x</button>" +
                                        "</span>");
                                    ele.find("." + item).on("click", function () {
                                        ele.find('#' + this.name).detach();
                                        value_array.splice($.inArray(this.name, value_array), 1);
                                        s.uploadcomplete({fileids: value_array});
                                    });
                                }
                            });
                        });

                    })();

                    var uploader;
                    setTimeout(function () {
                        uploader = web_uploader.newUploader(uploadOptions);
                        uploader.on('fileQueued', function (file) {
                            if (newfile.length + value_array.length < cid) {
                                uploader.upload(file);
                                file_file.push(file);
                                var file_str = {id: "", path: "", name: file.name}
                                newfile.push(file_str);
                            }
                            else if (newfile.length + value_array.length == cid) {
                                duoyude.push(file);
                                if (duoyude.length == 1) {
                                    // duoyude = [];
                                    alert("最多可以上传" + cid + "个文件")
                                }

                                uploader.removeFile(file);

                            }
                            else {
                                duoyude.push(file);
                                uploader.removeFile(file);
                            }
                        });
                        uploader.on('uploadError', function (a) {
                            console.log(a);
                        });
                        uploader.on('error', function (a) {
                            if (a == 'Q_TYPE_DENIED') {
                                myalert.alert('温馨提示！', "当前只支持以" + fileType + "为后缀名的文件哦，重新选择文件呗！", function () {
                                    console.log(a);
                                });
                            }
                        });
                        uploader.on('uploadAccept', function (a, b) {
                            if (duoyude.length > 0) {
                                //alert("最多可以上传"+cid+"个文件")
                                _.each(duoyude, function (item) {
                                    uploader.removeFile(item, true);
                                });
                                fileids.push(b.data.fileid);
                                duoyude = [];
                            } else {
                                fileids.push(b.data.fileid);
                            }

                        });
                        uploader.on('uploadComplete', function () {
                            console.log(newfile);
                            if (uploader.getStats().progressNum == 0) {
                                for (var i = 0; i < fileids.length; i++) {
                                    var filepath = config.api_url + "/api/file/download_file/" + fileids[i];
                                    newfile[i].id = fileids[i];
                                    newfile[i].path = filepath;
                                }
                                _.each(newfile, function (item) {
                                    ele.find('#' + item.id).detach();
                                    ele.find('.filelist').append("<span class='filespandirective' id='" + item.id + "' name='" + item.name + "'>" +
                                        "<span>" + item.name + "</span>" +
                                        "<button type='button' class='filebuttondirective' name='" + item.id + "'>x</button>" +
                                        "</span>");
                                });
                                file_str = fileids.concat(value_array);
                                s.uploadcomplete({fileids: file_str});
                                //删除按钮事件
                                ele.find('.filelist button').on("click", function () {
                                    var thisele = this;
                                    var file_name = ele.find('#' + this.name).attr("name")
                                    ele.find('#' + this.name).detach();
                                    //file_str.splice($.inArray(this.name, file_str), 1);
                                    _.remove(file_str, function (p) {
                                        if (p == thisele.name) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    //newfile.splice($.inArray(this.name, newfile), 1);
                                    _.remove(newfile, function (p) {
                                        return p.id == thisele.name;
                                    });
                                    //value_array.splice($.inArray(this.name, value_array), 1);
                                    _.remove(value_array, function (p) {
                                        return p == thisele.name;
                                    });
                                    //fileids.splice($.inArray(this.name, fileids), 1);
                                    _.remove(fileids, function (p) {
                                        return p == thisele.name;
                                    });
                                    _.each(file_file, function (item) {
                                        if (item.name == file_name) {
                                            uploader.removeFile(item, true);
                                        }
                                    })
                                    _.each(duoyude, function (item) {
                                        uploader.removeFile(item, true);
                                    })
                                    duoyude = [];
                                    file_str = fileids.concat(value_array);
                                    ;
                                    s.uploadcomplete({fileids: file_str});
                                });

                            }
                        });
                    }, 300);


                    //ele.find(".filebutton").on("click", function () {
                    //    $('#' + attrs.pickid + ' input').trigger("click");
                    //    uploader.reset();
                    //})
                }
            }
        }]);

    myapp.directive('filepush', ['common', 'setting', 'dictionary_api', function (common, config, dictionary_api) {
        return {
            scope: {
                uploadcomplete: '&'
            },
            templateUrl: '/js/directives/myfileuploder/myfileoperate.html',
            link: function (s, ele, attrs) {
                var uploadOptions = {};
                var cid = attrs.filecount;
                if (cid == 1) {
                    uploadOptions = {
                        auto: false,
                        pick: {id: '#' + attrs.pickid, multiple: false}
                    };
                } else if (attrs.filetype != null && attrs.filetype != "") {
                    uploadOptions = {
                        auto: false,
                        pick: '#' + attrs.pickid,
                        accept: {
                            title: "file",
                            extensions: attrs.filetype,
                            mimeTypes: "application/pdfapplication/x-ppt,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-works,application/vnd.ms-powerpoint,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                        }
                    };

                }
                else {
                    uploadOptions = {
                        auto: false,
                        pick: '#' + attrs.pickid
                    };
                }

                s.old_file_array = [];
                var value_array;
                if (attrs.filesvalue != null && attrs.filesvalue != "") {
                    value_array = JSON.parse(attrs.filesvalue);
                } else {
                    value_array = [];
                }
                //定义变量
                var fileids = [];//文件上传返回新文件id
                var file_str = [];//返回新旧文件id总数
                var newfile = [];//新文件集合
                var file_file = [];
                var duoyude = [];
                //记载已有的数据
                (function init() {
                    _.each(value_array, function (item) {
                        var filepath = config.api_url + "/api/file/download_file/" + item;
                        var filename = "";
                        dictionary_api.get_file_info(item).success(function (data) {
                            if (data.data != null) {
                                filename = data.data.name;
                                var file_str = {id: item, path: filepath, name: filename}
                                s.old_file_array.push(file_str);
                                ele.find('.filelist').append("<span id='" + item + "' class='filespandirective'>" +
                                    "<span>" + filename + "</span>" +
                                    "<button type='button' class='" + item + "' name='" + item + "'>x</button>" +
                                    "</span>");
                                ele.find("." + item).on("click", function () {
                                    ele.find('#' + this.name).detach();
                                    value_array.splice($.inArray(this.name, value_array), 1);
                                    s.uploadcomplete({fileids: value_array});
                                });
                            }
                        });
                    });

                })();

                var uploader = common.newUploader(uploadOptions);
                uploader.on('fileQueued', function (file) {
                    if (newfile.length + value_array.length < cid) {
                        uploader.upload(file);
                        file_file.push(file);
                        var file_str = {id: "", path: "", name: file.name}
                        newfile.push(file_str);
                    } else if (newfile.length + value_array.length == cid) {
                        duoyude.push(file);
                        if (duoyude.length == 1) {
                            alert("最多可以上传" + cid + "个文件")
                        }
                        uploader.removeFile(file);
                    } else {
                        duoyude.push(file);
                        uploader.removeFile(file);
                    }
                });

                uploader.on('uploadAccept', function (a, b) {
                    if (duoyude.length > 0) {
                        //alert("最多可以上传"+cid+"个文件")
                        _.each(duoyude, function (item) {
                            uploader.removeFile(item, true);
                        });
                        fileids.push(b.data.fileid);
                        duoyude = [];
                    } else {
                        fileids.push(b.data.fileid);
                    }

                });
                uploader.on('uploadComplete', function () {
                    if (uploader.getStats().progressNum == 0) {
                        for (var i = 0; i < fileids.length; i++) {
                            var filepath = config.api_url + "/api/file/download_file/" + fileids[i];
                            newfile[i].id = fileids[i];
                            newfile[i].path = filepath;
                        }
                        _.each(newfile, function (item) {
                            ele.find('#' + item.id).detach();
                            ele.find('.filelist').append("<span class='filespandirective' id='" + item.id + "' name='" + item.name + "'>" +
                                "<span>" + item.name + "</span>" +
                                "<button type='button' class='filebuttondirective' name='" + item.id + "'>x</button>" +
                                "</span>");
                        });
                        file_str = fileids.concat(value_array);
                        s.uploadcomplete({fileids: file_str});
                        //删除按钮事件
                        ele.find('.filelist button').on("click", function () {
                            var file_name = ele.find('#' + this.name).attr("name")
                            ele.find('#' + this.name).detach();
                            file_str.splice($.inArray(this.name, file_str), 1);
                            newfile.splice($.inArray(this.name, newfile), 1);
                            value_array.splice($.inArray(this.name, value_array), 1);
                            fileids.splice($.inArray(this.name, fileids), 1);
                            _.each(file_file, function (item) {
                                if (item.name == file_name) {
                                    uploader.removeFile(item, true);
                                }
                            })
                            _.each(duoyude, function (item) {
                                uploader.removeFile(item, true);
                            })
                            duoyude = [];
                            file_str = fileids.concat(value_array);
                            ;
                            s.uploadcomplete({fileids: file_str});
                        });

                    }
                });
                ele.find(".filebutton").on("click", function () {
                    $('#' + attrs.pickid + ' input').trigger("click");
                    uploader.reset();
                })
            }
        }
    }])

    myapp.directive('myimguploader', ['common', function (common) {
        return {
            scope: {
                uploadcomplete: '&'
            },
            templateUrl: '/js/directives/myfileuploder/myimguploader.html',
            link: function (s, ele, attrs) {
                var uploadOptions = {
                    auto: false,
                    pick: '#' + attrs.id + ' #changchangdezhantaiimg',
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    }
                };

                var fileids = [];
                var uploader;
                setTimeout(function () {
                    uploader = common.newUploader(uploadOptions);
                    uploader.on('fileQueued', function (file) {
                        uploader.makeThumb(file, function (error, src) {
                            if (error) {
                                ele.find('.filelist').append("<p>" + 不能预览 + "</p>");
                                return;
                            }

                            ele.find('.filelist').append("<img src='" + src + "'/>");
                        }, 200, 200);
                        ele.find('.filelist').append("<p>" + file.name + "</p>");
                    });

                    uploader.on('uploadAccept', function (a, b) {
                        fileids.push(b.data.fileid);
                    });

                    uploader.on('uploadComplete', function () {
                        if (uploader.getStats().progressNum == 0) {
                            //uploader.reset();
                            ele.find('.filelist').empty();
                            s.uploadcomplete({fileids: fileids});
                            fileids = [];
                        }
                    });
                    s.$apply();
                }, 300)


                ele.find('.btnstartupload').on('click', function () {
                    _.each(uploader.getFiles(), function (file) {
                        uploader.upload(file);
                    })
                });
            }
        }
    }]);

    myapp.directive('myimguploaderp', ['common', 'web_uploader', function (common, web_uploader) {
        return {
            scope: {
                uploadcomplete: '&'
            },
            templateUrl: '/js/directives/myfileuploder/myimguploaderp.html',
            link: function (s, ele, attrs) {
                var uploadOptions = {
                    auto: true,
                    pick: '#' + attrs.pickid,
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    }
                };

                var fileids = [];
                var uploader;

                setTimeout(function () {
                    uploader = web_uploader.newUploader(uploadOptions);
                    uploader.on('fileQueued', function (file) {
                        //正常的图片预览
                        if (attrs.imgid) {
                            uploader.makeThumb(file, function (error, src) {
                                if (error) {
                                    ele.find('.filelist').append("<p>" + 不能预览 + "</p>");
                                    return;
                                }
                                var function_ele = function (ele1, cc) {
                                    var ele = $(ele1);
                                    var ph = ele.height();
                                    var pw = ele.width();

                                    var blp = ph / pw;
                                    var blc = file._info.height / file._info.width;
                                    //ele.attr('src', config.api_url + '/api/file/download_img/' + newv);


                                    if (blc > blp) {
                                        $('#' + attrs.imgid).css("height", ph);
                                        $('#' + attrs.imgid).css('width', ph / blc);
                                    } else {
                                        //$(cc).css("height", "100%");
                                        $('#' + attrs.imgid).css("width", pw);
                                        $('#' + attrs.imgid).css('height', pw * blc);
                                    }

                                };
                                var imgdom = $('#' + attrs.imgid)[0];
                                imgdom.src = src;
                                function_ele($('#' + attrs.pickid))

                            }, 1, 1);
                        }
                        //背景图片的形式的圆形预览
                        else {
                            uploader.makeThumb(file, function (error, src) {
                                var myele = $("#" + attrs.circledivid);
                                myele.css("background-image", "url(" + src + ")");
                                myele.css("border-radius", "50%");
                                myele.css("background-position", "center");
                                myele.css("background-size", "cover");
                            }, 1, 1)
                        }


                    });

                    uploader.on('uploadAccept', function (a, b) {
                        fileids.push(b.data.fileid);
                    });

                    uploader.on('uploadComplete', function () {
                        if (uploader.getStats().progressNum == 0) {
                            //uploader.reset();
                            ele.find('.filelist').empty();
                            s.uploadcomplete({fileids: fileids});
                            fileids = [];
                        }
                    });
                    s.$apply();
                }, 300)

                ele.find('.btnstartupload').on('click', function () {
                    _.each(uploader.getFiles(), function (file) {
                        uploader.upload(file);
                    })
                });
            }
        }
    }]);

    /*横向排列文件*/
    myapp.directive('myfileuploaderhorizontal', ['web_uploader', 'common', 'setting', 'dictionary_api', 'myalert',
        function (web_uploader, common, config, dictionary_api, myalert) {
            return {
                scope: {
                    filecount: '@',
                    filetype: '@',
                    filesvalue: '=',
                    uploadcomplete: '&'
                },
                templateUrl: '/js/directives/myfileuploder/myfileuploaderhorizontal.html',
                link: function (s, element, attrs) {
                    var ele = $(element);
                    //允许上传的文件后缀名
                    var fileType = s.filetype;
                    //允许上传的文件个数
                    var filecount = s.filecount;
                    //初始数据来源
                    var files_sorce = [];
                    //唯一标识
                    var pickbuttonid = "myfileuploaderhorizontal";
                    //webuploa参数对象
                    var uploadOptions;
                    //文件上传返回新文件id
                    var fileids = [];
                    //超出限制个数的集合
                    var duoyude = [];
                    //用于在指令显示的所有文件
                    s.file_array_show = [];
                    //文件详情数据集合
                    s.data_filemodel_array = [];
                    // 初始化uploader所需参数
                    if (filecount == 1) {
                        uploadOptions = {
                            auto: false,
                            pick: {id: '#' + pickbuttonid, multiple: false}
                        };
                    } else {
                        uploadOptions = {
                            auto: false,
                            pick: '#' + pickbuttonid
                        };
                    }

                    //从配置文件读取文件后缀名对应的文件类型
                    if (fileType) {
                        var mimeTypes = common.getMimeTypes(attrs.filetype);
                        uploadOptions.accept = {
                            title: "file",
                            extensions: attrs.filetype,
                            mimeTypes: mimeTypes
                        }
                    }

                    //加载已有数据
                    s.$watch('filesvalue', function (n_value) {

                        if (files_sorce.length<=0&&n_value&&n_value.length>0) {
                            files_sorce = JSON.parse(n_value);
                            _.each(files_sorce, function (item) {
                                dictionary_api.get_file_info(item).success(function (data) {
                                    if (data.data != null) {
                                        s.file_array_show.push(data.data);
                                    }
                                });
                            });
                        }
                    })

                    var uploader;
                    setTimeout(function () {
                        uploader = web_uploader.newUploader(uploadOptions);
                        var new_file_array = [];
                        uploader.on('fileQueued', function (file) {
                            if (new_file_array.length + files_sorce.length < filecount) {
                                uploader.upload(file);
                                new_file_array.push({id: "", path: "", name: file.name});
                            }
                            else if (new_file_array.length + files_sorce.length == filecount) {
                                duoyude.push(file);
                                if (duoyude.length == 1) {
                                    alert("最多可以上传" + filecount + "个文件")
                                }
                                uploader.removeFile(file);
                            }
                            else {
                                duoyude.push(file);
                                uploader.removeFile(file);
                            }
                        });
                        uploader.on('uploadError', function (a) {
                            console.log(a);
                        });
                        uploader.on('error', function (a) {
                            if (a == 'Q_TYPE_DENIED') {
                                myalert.alert('温馨提示！', "当前只支持以" + fileType + "为后缀名的文件哦，重新选择文件呗！", function () {
                                    console.log(a);
                                });
                            }
                        });
                        uploader.on('uploadAccept', function (a, b) {
                            if (duoyude.length > 0) {
                                _.each(duoyude, function (item) {
                                    uploader.removeFile(item, true);
                                });
                                fileids.push(b.data.fileid);
                                duoyude = [];
                            } else {
                                fileids.push(b.data.fileid);
                            }

                        });
                        uploader.on('uploadComplete', function () {
                            if (uploader.getStats().progressNum == 0) {
                                for (var i = 0; i < fileids.length; i++) {
                                    var filepath = config.api_url + "/api/file/download_file/" + fileids[i];
                                    new_file_array[i].id = fileids[i];
                                    new_file_array[i].path = filepath;
                                }
                                _.each(new_file_array, function (item) {
                                    dictionary_api.get_file_info(item.id).success(function (data) {
                                        s.file_array_show.push(data.data);
                                        //s.$apply();
                                    })

                                    files_sorce.push(item.id);
                                });
                                s.uploadcomplete({fileids: files_sorce});
                                //删除按钮事件
                                /*ele.find('.filelist button').on("click", function () {
                                    var thisele = this;
                                    // var file_name = ele.find('#' + this.name).attr("name")
                                    // ele.find('#' + this.name).detach();
                                    //file_str.splice($.inArray(this.name, file_str), 1);
                                    /!* _.remove(file_str, function (p) {
                                     if (p == thisele.name) {
                                     return true;
                                     } else {
                                     return false;
                                     }
                                     });*!/
                                    //newfile.splice($.inArray(this.name, newfile), 1);
                                    _.remove(new_file_array, function (p) {
                                        return p.id == thisele.name;
                                    });
                                    //value_array.splice($.inArray(this.name, value_array), 1);
                                    _.remove(files_sorce, function (p) {
                                        return p == thisele.name;
                                    });
                                    //fileids.splice($.inArray(this.name, fileids), 1);
                                    _.remove(fileids, function (p) {
                                        return p == thisele.name;
                                    });
                                    _.each(duoyude, function (item) {
                                        uploader.removeFile(item, true);
                                    })

                                    duoyude = [];

                                    var fileids_str = fileids.concat(files_sorce);
                                    s.uploadcomplete({fileids: fileids_str});
                                });*/

                            }
                            new_file_array=[];
                            fileids=[];
                        });
                    }, 300);

                    s.del_click=function (p_item) {
                        _.remove(s.file_array_show, function (p) {
                            return p_item.name == p.name;
                        });
                        _.remove(files_sorce, function (p) {
                            return  p_item.name == p.name;
                        });
                        _.remove(fileids, function (p) {
                            return  p_item.name == p.name;
                        });
                        _.each(duoyude, function (item) {
                            uploader.removeFile(item, true);
                        })

                        duoyude = [];

                       // var fileids_str = fileids.concat(files_sorce);
                        s.uploadcomplete({fileids: files_sorce});
                    }
                }
            }
        }])
});