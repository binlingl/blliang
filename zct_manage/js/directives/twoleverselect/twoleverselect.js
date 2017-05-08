define(["app",'services/myalert/myalert'], function (app) {
    app.directive("twoleverselect", ['$uibModal', function ($uibModal) {
        return {
            scope: {
                "datasource": "=",
                "selectresult": "=",
                "selectresulttree":"=",
                selectresultcallback: "&"
            },
            templateUrl: '/js/directives/twoleverselect/select_form.html',
            link: function (s, ele, attrs) {
                var items = [];
                s.$watch('datasource', function (newv) {
                    items = newv;
                    if (items) {
                        ele.find('.select-trigger').on('click', function () {
                            var modalInstance = $uibModal.open({
                                animation: true,
                                templateUrl: '/js/directives/twoleverselect/select_mode.html',
                                controller: 'ModalInstanceTwoLeverSelectCtrl',
                                size: 'auto',
                                backdrop: 'static',
                                scope: s,
                                resolve: {
                                    resolveobject: function () {
                                        return {
                                            items: items,
                                            okcallback: s.selectresultcallback,
                                            selectresult: s.selectresult,
                                            selectresulttree: s.selectresulttree
                                        }
                                    }
                                }
                            });
                            modalInstance.result.then(function (item) {
                                //console.log(item);
                            }, function () {
                                //console.log(item);
                                //$log.info('Modal dismissed at: ' + new Date());
                            });
                        });
                    }
                })
            }
        };
    }]);
    app.controller('ModalInstanceTwoLeverSelectCtrl', ['$scope', '$uibModalInstance', 'resolveobject','myalert', function (s, $uibModalInstance, resolveobject,myalert) {

        //两级数据源
        s.data_source = [];
        //第二级数据源
        s.data_source_two = [];
        //选择结果，树形结构
        var temp_select_result=new Array();
        _.forEach(resolveobject.selectresulttree,function(item){
            temp_select_result.push(item);
        });
        s.select_result = temp_select_result;
        //选择结果，用于页面展示
        var temp_select_show_result=new Array();
        _.forEach(resolveobject.selectresult,function(item){
            temp_select_show_result.push(item);
        });
        s.select_show_result = temp_select_show_result;
        console.log(resolveobject.selectresult);
        var items = resolveobject.items;
        //过滤掉第三级数据
        var getTwoLevelData=function(){
            _.forEach(items, function (item) {
                if (angular.isDefined(item.nextlayer) && item.nextlayer.length > 0) {
                    _.forEach(item.nextlayer, function (item_level) {
                        if (angular.isDefined(item_level.nextlayer)) {
                            item_level.nextlayer = [];
                        }
                    });
                }
                s.data_source.push(item);
            });
            console.log( s.data_source);
        }
        getTwoLevelData();
        //level First选择
        s.select_item = function (select_item) {
            s.data_source_two = select_item.nextlayer;
        };
        //level Second 选择
        s.select_item_two = function (select_item) {
            if(s.select_show_result.length>=3){
                myalert.alert('温馨提示！','最多只能选择三个哦！',function(){});
                return;
            }
            if (s.select_result.length > 0) {
                var parentNodeIsHave=false;
                _.forEach(s.select_result, function (item) {
                    if (item.no == select_item.pno) {
                        parentNodeIsHave=true;
                        if (!is_have(item.nextlayer, select_item))
                            item.nextlayer.push(select_item);
                        return;
                    }
                });
                if(!parentNodeIsHave){
                    var select_result_item = get_level_data(select_item);
                    s.select_result.push(select_result_item);
                }
            }
            else {
                var select_result_item = get_level_data(select_item);
                s.select_result.push(select_result_item);
            }
            get_select_show_result();
            console.log(s.select_result);
        }
        //删除结果级中的项
        s.delete_item = function (select_item) {
            _.remove(s.select_result, function (item) {
                if (item.nextlayer) {
                    if (item.nextlayer.length > 0) {
                        //删除二级数据节点
                        _.remove(item.nextlayer, function (second_item) {
                            return second_item.pno == select_item.pno && second_item.no == select_item.no;
                        });
                        //二级数据不存在则删除当前数据节点
                        if (item.nextlayer.length <= 0) {
                            return select_item.pno == item.no;
                        }
                    } else {//二级数据不存在则删除当前数据节点
                        return select_item.pno == item.no;
                    }
                } else {//二级数据不存在则删除当前数据节点
                    return select_item.pno == item.no;
                }
            });
            get_select_show_result();
        }
        s.ok = function () {
            //回调选择完成后回传数据
            resolveobject.okcallback({select: s.select_result});
            s.select_result=new Array();
            s.select_show_result=new Array();
            $uibModalInstance.close();
        };
        s.cancel = function () {
            s.select_result=new Array();
            s.select_show_result=new Array();
            $uibModalInstance.dismiss('cancel');
        };
        //获取单条数据记录包括一级和二级
        var get_level_data = function (select_item) {
            var select_result_item = {
                name: "",
                no: "",
                pno: "",
                nextlayer: []
            };
            _.forEach(items, function (item) {
                if (select_item.pno == item.no) {
                    //另起变量select_result_item，是为了不污染数据源items
                    select_result_item.name = item.name;
                    select_result_item.no = item.no;
                    select_result_item.pno = item.pno;
                    select_result_item.nextlayer.push(select_item)
                    return;
                }
            });
            return select_result_item;
        }
        //获取用于页面展示选择的结果
        var get_select_show_result = function () {
            s.select_show_result = [];
            _.forEach(s.select_result, function (item) {
                _.forEach(item.nextlayer, function (second_item) {
                    s.select_show_result.push(second_item);
                });
            });
        }
        var is_have = function (arrayData, itemData) {
            var isHave = false;
            _.forEach(arrayData, function (item) {
                if (item.no == itemData.no) {
                    isHave = true;
                    return;
                }
            });
            return isHave;
        }
    }]);
});