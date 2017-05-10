/**
 * Created by admin on 2017/5/4.
 */
require.config({
    paths:{
        'angular':'../lib/angular',
        'ui-router':'../lib/angular-ui-router',
        'jquery':'../lib/jquery',
        'ng-bootstrap':'../lib/ui-bootstrap-tpls-1.3.2'
    },
    shim:{
        'angular':{
            exports:'angular',
            deps:['jquery']
        },
        'ui-router':{
            deps:['angular']
        }
    },
    /*requireJS的加载是异步机制，
    有默认的超时机制，当加载某个模块超过一定的时间，requireJs会向浏览器抛出异常就不会再加载该模块
     waiSeconds是指当js文件加载超时到放弃加载这个文件的等待事件，可以解决由于网速过慢而加载不到js的问题 */
    waitSeconds:15
});
require(["angular","app","router","ctrl/home_ctrl"],function(angular,app,router){
    angular.bootstrap(document,['myApp']);
});
