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
    /*requireJS�ļ������첽���ƣ�
    ��Ĭ�ϵĳ�ʱ���ƣ�������ĳ��ģ�鳬��һ����ʱ�䣬requireJs����������׳��쳣�Ͳ����ټ��ظ�ģ��
     waiSeconds��ָ��js�ļ����س�ʱ��������������ļ��ĵȴ��¼������Խ���������ٹ��������ز���js������ */
    waitSeconds:15
});
require(["angular","app","router","ctrl/home_ctrl"],function(angular,app,router){
    angular.bootstrap(document,['myApp']);
});
