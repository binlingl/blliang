({
    appDir: '.',
    baseUrl: 'js',
    dir: './r7-built',
    paths: {
        'angular': '../lib/angular',
        'ui-router': '../lib/angular-ui-router',
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
        'webupload': '../lib/webuploader',
        'statehelper': '../lib/statehelper',
        'map_china': '../lib/echarts/map/china',
        "ng-require": '../lib/angular-require',
        'sharejs':'../lib/share'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        //'kindeditor-all':{
        //   exports: 'kindeditor-all'
        //},
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
            deps: ['angular']
        },
        'rap': {
            deps: ['angular']
        },
        'nganimate': {
            deps: ['angular']
        },
        'statehelper': {
            deps: ['ui-router']
        }
    },
    removeCombined: true,
    fileExclusionRegExp: /^(r|build|gulpfile)\.js|.*\.scss|.*\.coffee|^node_modules|^\.|^img|^fonts/,
    modules: [
        {
            name: 'start'
        }
    ]
})
