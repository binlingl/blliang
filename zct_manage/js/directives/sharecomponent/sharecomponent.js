define(['app','sharejs'], function (app) {
    app.directive('sharecomponent', [function () {
        return {
            scope: {
                titletext: "=",
                summarytext: "=",
                contenttext: "=",
                imagepic: "="
            },
            templateUrl: '/js/directives/sharecomponent/share_component_page.html',
            link: function (s, ele, attr) {
                // s.$watch('titletext', function (newv) {
                //     if (newv) {
                //     }
                // })

            },
            controller: ['$scope', function (s) {

                s.$watch("titletext", function (newv) {
                    console.log(newv);
                    if (newv) {
                        share_qq();
                        share_qq_weibo();
                        share_sina_weibo();
                        console.log(s.contenttext);
                    }

                })
                var share_qq = function () {
                    var _width = 650;
                    var _height = 450;
                    var _url = document.location.href;
                    //_url="http://www.greatipr.cn/news_about/news_detaile/636130709484929409/%E5%B3%B0%E5%88%9B%E5%8A%A8%E6%80%81.html"
                    var _show_count = 1;
                    var _desc = s.titletext;
                    var _summary = s.summarytext;
                    var _title = s.titletext;
                    var _site = "";
                    var _pic = s.imagepic;
                    var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
                    _shareUrl += 'url=' + encodeURIComponent(_url);   //参数url设置分享的内容链接|默认当前页location
                    _shareUrl += '&showcount=' + _show_count || 0;      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
                    _shareUrl += '&desc=' + encodeURIComponent(_desc || '分享的描述');    //参数desc设置分享的描述，可选参数
                    _shareUrl += '&summary=' + encodeURIComponent(_summary || '分享摘要');    //参数summary设置分享摘要，可选参数
                    _shareUrl += '&title=' + encodeURIComponent(_title || document.title);    //参数title设置分享标题，可选参数
                    _shareUrl += '&site=' + encodeURIComponent(_site || '');   //参数site设置分享来源，可选参数
                    _shareUrl += '&pics=' + encodeURIComponent(_pic || '');   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
                    s.qq_share_url = _shareUrl;
                    //window.open(_shareUrl, '_blank');
                    //window.open(_shareUrl, '_blank', 'width=' + _width + ',height=' + _height + ',top=' + (screen.height - _height) / 2 + ',left=' + (screen.width - _width) / 2 + ',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
                };
                var share_qq_weibo = function () {
                    var _width = 650;
                    var _height = 450;
                    var _url = document.location.href;
                    //_url="http://www.greatipr.cn/news_about/news_detaile/636130709484929409/%E5%B3%B0%E5%88%9B%E5%8A%A8%E6%80%81.html"
                    var _show_count = 1;
                    var _desc = s.titletext;
                    var _summary = s.summarytext;
                    var _title = s.titletext+":"+_summary;
                    var _site = "";
                    var _pic = s.imagepic;
                    var _shareUrl = 'http://share.v.t.qq.com/index.php?c=share&a=index';
                    _shareUrl += '&url=' + encodeURIComponent(_url);   //参数url设置分享的内容链接|默认当前页location
                    _shareUrl += '&title=' + encodeURIComponent(_title || document.title);    //参数title设置分享标题，可选参数
                    _shareUrl += '&appkey=' + encodeURIComponent(_site || '');   //参数site设置分享来源，可选参数
                    _shareUrl += '&pic=' + encodeURIComponent(_pic || '');   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
                    s.qq__weibo_share_url = _shareUrl;
                    //window.open(_shareUrl, '_blank');
                    //window.open(_shareUrl, '_blank', 'width=' + _width + ',height=' + _height + ',top=' + (screen.height - _height) / 2 + ',left=' + (screen.width - _width) / 2 + ',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
                };
                var share_sina_weibo = function () {
                    var _width = 650;
                    var _height = 450;
                    var _url = document.location.href;
                    //_url="http://www.greatipr.cn/news_about/news_detaile/636130709484929409/%E5%B3%B0%E5%88%9B%E5%8A%A8%E6%80%81.html"
                    var _show_count = 1;
                    var _desc = s.titletext;
                    var _summary = s.summarytext;
                    var _title = s.titletext+":"+_summary;
                    var _site = "";
                    var _pic = s.imagepic;
                    var _shareUrl = 'http://service.weibo.com/share/share.php?';
                    _shareUrl += 'url=' + encodeURIComponent(_url);   //参数url设置分享的内容链接|默认当前页location
                    _shareUrl+="&count=1";//表示是否显示当前页面被分享数量(1显示)(可选，允许为空)
                    _shareUrl += '&title=' + encodeURIComponent(_title || document.title);    //参数title设置分享标题，可选参数
                    _shareUrl += '&appkey=' + encodeURIComponent(_site || '');   //参数site设置分享来源，可选参数
                    _shareUrl += '&pic=' + encodeURIComponent(_pic || '');   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
                    _shareUrl+="&language=zh_cn";//语言设置(zh_cn|zh_tw)(可选)
                    s.qq_weibo_share_url = _shareUrl;
                    //window.open(_shareUrl, '_blank');
                    //window.open(_shareUrl, '_blank', 'width=' + _width + ',height=' + _height + ',top=' + (screen.height - _height) / 2 + ',left=' + (screen.width - _width) / 2 + ',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
                };
            }],
        }
    }]);

})