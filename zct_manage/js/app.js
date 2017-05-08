/**
 * Created by awei on 2015/12/23.
 */

define(['angular','ng-require','rap','ng-bootstrap','ui-router'], function (angular) {
    var myapp = angular.module('myapp', ['ui.router', 'ui.bootstrap', 'ngRap','ngRequire']);

    myapp.config(['$httpProvider', 'ngRapProvider', function (httpProvider, ngRapProvider) {
       /* ngRapProvider.script = 'http://rap.taobao.org/rap.plugin.js?projectId=15265';// replce your host and project id
       /* ngRapProvider.script = 'http://rap.taobao.org/rap.plugin.js?projectId=15265'; // replce your host and project id
        ngRapProvider.enable({
           mode:2,
           domain:['http://10.0.3.217','http://api.greatipr.cn:81']
        });
        httpProvider.interceptors.push('rapMockInterceptor');*/
    }]);
    return myapp;
});
