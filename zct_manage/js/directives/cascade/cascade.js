define(['app'], function (myapp) {
    myapp.directive('hcascade', function () {
        var currentdata = [];
        var layer = 0;
        var getTwoLevelDicData = function (p_dicData) {
            var newDicData = [];
            _.forEach(p_dicData, function (item) {
                    var newItem = item;
                    if (newItem.pno != '0') {
                        newItem.nextlayer = [];
                    } else {
                        if (angular.isDefined(newItem.nextlayer) && newItem.nextlayer.length == 1) {
                            if (newItem.name == newItem.nextlayer[0].name) {
                                newItem.nextlayer = [];
                            }
                        }
                        else if (angular.isDefined(newItem.nextlayer) && newItem.nextlayer.length > 1) {
                            _.forEach(newItem.nextlayer, function (secendItem, d) {
                                secendItem.nextlayer = [];
                            });
                        }
                    }
                    newDicData.push(newItem);
                }
            );
            return newDicData;
        }
        var getTwoLevelSelect = function (p_select) {
            var newSelect = []
            if (p_select.length > 1) {
                newSelect.push(p_select[0]);
                if (p_select[0].no != p_select[1].pno) return newSelect;
                else {
                    if (p_select[0].name == p_select[1].name)return newSelect;
                    else {
                        newSelect.push(p_select[1]);
                        return newSelect;
                    }
                }
            }
            return p_select;

            // else if(p_select.lenth)
        }
        var createcurrentdata = function (dicdata, select) {
            if (dicdata && select) {
                var data = dicdata;
                var newDicData = getTwoLevelDicData(data);
                select = getTwoLevelSelect(select);
                var cvalue = select[layer];
                var cobj = {};
                if (cvalue) {
                    cobj.select = select[layer].name;
                    cvalue = cobj.select;
                    cobj.data = newDicData;
                    currentdata.push(cobj);
                    //console.log(currentdata);
                } else {
                    if (newDicData[0]) {
                        cobj.select = newDicData[0].name;
                        cvalue = cobj.select;
                        cobj.data = newDicData;
                        select[layer] = newDicData[0];
                        currentdata.push(cobj);
                    }
                }

                var cindex = _.findIndex(newDicData, function (d) {
                    return d.name == cvalue;
                });

                layer++;
                if (cindex != -1) {
                    createcurrentdata(newDicData[cindex].nextlayer, select);
                }
            }
        };
        return {
            templateUrl: '/js/directives/cascade/h_cascade.html',
            scope: {
                data: '=',
                selectresult: '='
            },
            link: function (s, ele, attrs) {
                console.log('9999999999999');
                console.log(attrs.data);

            },
            controller: ["$scope", function ($scope) {
                this.reload = function () {
                    layer = 0;
                    currentdata = [];
                    createcurrentdata($scope.data, $scope.selectresult);
                    $scope.currentdata = currentdata;
                    $scope.$apply();
                };
                $scope.$watch('data', function (n_value) {
                    if (n_value) {
                        this.scope = $scope;
                        currentdata = [];
                        layer = 0;
                        createcurrentdata($scope.data, $scope.selectresult);
                        $scope.currentdata = currentdata;
                    }
                })
                this.set = function (index, data, layer) {
                    $scope.selectresult = getTwoLevelSelect($scope.selectresult);
                    $scope.selectresult[index] = data;
                    _.each($scope.selectresult, function (v, k) {
                        if (k > layer) {
                            _.remove($scope.selectresult, function (item) {
                                if (angular.isDefined($scope.selectresult[k])) {
                                    return item.name == $scope.selectresult[k].name;
                                }
                            })
                            //delete  $scope.selectresult[k]
                        }
                    })
                };
            }]
        }
    });

    myapp.directive('hcascadeitem', function () {
        return {
            require: '^?hcascade',
            templateUrl: '/js/directives/cascade/h_cascadeitem.html',
            scope: {
                currentlayerdata: '=',
                select: '=',
                index: '='
            },
            link: function (s, ele, attrs, pcon) {
                ele.find('select').on('change', function () {
                    var val = $(this).val();
                    console.log(s.index);
                    pcon.set(s.index, _.find(s.currentlayerdata, function (d) {
                        return d.name == val;

                    }), s.index);
                    pcon.reload();

                });
            }
        }
    });

    myapp.directive('cascade', function () {
        var currentdata = [];
        var layer = 0;
        var createcurrentdata = function (dicdata, select) {
            if (dicdata && select) {
                var cvalue = select[layer];
                var cobj = {};
                if (cvalue) {
                    cobj.select = select[layer].name;
                    cvalue = cobj.select;
                    cobj.data = dicdata;
                    currentdata.push(cobj);
                } else {
                    if (dicdata[0]) {
                        cobj.select = dicdata[0].name;
                        cvalue = cobj.select;
                        cobj.data = dicdata;
                        select[layer] = dicdata[0];
                        currentdata.push(cobj);
                    }
                }

                var cindex = _.findIndex(dicdata, function (d) {
                    return d.name == cvalue;
                });

                layer++;
                if (cindex != -1) {
                    createcurrentdata(dicdata[cindex].nextlayer, select);
                }
            }

        };
        return {
            templateUrl: '/js/directives/cascade/cascade.html',
            scope: {
                data: '=',
                selectresult: '='
            },
            link: function (s, ele, attrs) {

            },
            controller: ["$scope", function ($scope) {
                this.reload = function () {
                    layer = 0;
                    currentdata = [];
                    createcurrentdata($scope.data, $scope.selectresult);
                    $scope.currentdata = currentdata;
                    $scope.$apply();
                };
                this.scope = $scope;
                currentdata = [];
                layer = 0;
                createcurrentdata($scope.data, $scope.selectresult);
                $scope.currentdata = currentdata;
                this.set = function (index, data, layer) {
                    $scope.selectresult[index] = data;
                    _.each($scope.selectresult, function (v, k) {
                        if (k > layer) {
                            delete  $scope.selectresult[k]
                        }
                    })
                };
            }]
        }
    });

    myapp.directive('cascadeitem', function () {
        return {
            require: '^?cascade',
            templateUrl: '/js/directives/cascade/cascadeitem.html',
            scope: {
                currentlayerdata: '=',
                select: '=',
                index: '='

            },
            link: function (s, ele, attrs, pcon) {
                ele.find('select').on('change', function () {
                    var val = $(this).val();
                    console.log(s.index);
                    pcon.set(s.index, _.find(s.currentlayerdata, function (d) {
                        return d.name == val;
                    }), s.index);
                    pcon.reload();
                });
            }
        }
    });
});