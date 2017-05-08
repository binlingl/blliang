try {
    require.config({
        baseUrl: "js",
        paths: {
            'angular': '../lib/angular',
            'ui-router': '../lib/angular-ui-router',
           // 'angular-messages':'../lib/angular-messages.js',//_____________________
            'jquery': '../lib/jquery',
            'lodash': '../lib/lodash',
            'ng-bootstrap': '../lib/ui-bootstrap-tpls-1.3.2',
            'angular-locale_zh-cn': "../lib/angular-locale_zh-cn",
            'webupload': '../lib/webuploader',
            'rap': "../lib/ngrap",
            'nganimate': '../lib/angular-animate',
            'kindeditor-all': '../lib/kindeditor/kindeditor-all',
            'zh-cn': '../lib/kindeditor/lang/zh-CN',
            'pingpp': '../lib/pingpp',
            'echarts': '../lib/echarts',
            'statehelper': '../lib/statehelper',
            'map_china': '../lib/echarts/map/china',
            'thenjs': '../lib/then',
            "ng-require": '../lib/angular-require',
            'sharejs':'../lib/share'
        },
        shim: {
            'angular': {
                exports: 'angular',
                deps:['jquery']
            },


            'zh-cn': {
                deps: 'kindeditor-all'
            },
            'ui-router': {
                deps: ['angular']
            },
            'angular-locale_zh-cn': {
                deps: ['angular']
            },
            'ng-bootstrap': {
                deps: ['angular','angular-locale_zh-cn']
            },
            'rap': {
                deps: ['angular']
            },
            'nganimate': {
                deps: ['angular']
            },
            'statehelper': {
                deps: ['ui-router']
            },
            'ng-require': {
                deps: ["angular"]
            }
        },
        waitSeconds: 15
    });


    require(['angular', 'env','app','router',"ctrl/rootctrl"], function (angular, env,app,router) {
        if (env == "dev") {
            document.domain = "localhost";
        } else if (env == 'test') {
            document.domain = "greatipr.cn";

        } else if (env == "production") {
            document.domain = "greatipr.com";
        }

        angular.bootstrap(document, ['myapp']);

    });
} catch (e) {
    window.location.href = "/errors/ie8.html";
}


