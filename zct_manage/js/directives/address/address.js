define(['app'],function (myapp) {
    myapp.directive('address', ['$uibModal', 'apis', function ($uibModal, apis) {
        return {
            template: '<button>地址</button>',
            scope: {
                selectcomplete: '&',
                selectresult: '='
            },
            link: function (s, ele, attrs) {
                //s.fok = function (ok) {
                //    //ok();
                //    //s.selectcomplete(s.arearesult);
                //    console.log(s);
                //};
                //s.cc = function (cc) {
                //    cc();
                //};
                ele.on('click', function () {
                    apis.dictionary.get_area_t().success(function (data) {
                        s.areadata = data.data;
                        $uibModal.open({
                            //templateUrl: '/directive_tpls/area_select.html',
                            templateUrl: '/js/directives/address/area_select.html',
                            controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                                $scope.areadata = data.data;

                                $scope.selectresult = s.selectresult;

                                $scope.ok = function () {
                                    $uibModalInstance.close();
                                    //console.log($scope.selectresult);
                                    s.selectcomplete({result: $scope.selectresult});
                                    //try{
                                    //    s.$apply();
                                    //}catch(e){
                                    //
                                    //}
                                };

                                $scope.cc = function () {
                                    $uibModalInstance.close();
                                };
                            }]
                        });
                    });

                });
            }
        }
    }]);
});