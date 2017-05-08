//创意详情ctrl
define(["app"], function (myapp) {
    myapp.controller('idea_test_ctrl',
           [ '$scope',
            '$rootScope',
            '$state','$uibModal',
            function (s,rs,$state,$uibModal) {
                console.log(" 测试的Ctrl");
                s.open_modal = function (size) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'tpls/ideas/modal_test.html',
                        controller: 'modal_in_ctrl',
                        size:'lg',
                        resolve: {
                            fnitems: function(){
                                return "这是从原来控制器带来的值";
                            },
                            item2:456
                        }
                    });
                    modalInstance.result.then(function (data) {
                        console.log(data);
                    }, function (data) {
                        console.log(data);
                    });
                };
            }]
    )

    myapp.controller('modal_in_ctrl',["$scope","fnitems","$uibModalInstance",function(s,fnitems,$uibModalInstance){
        s.bbb=fnitems;

        s.ok_click=function(){
            $uibModalInstance.close(s.aaa);
        }
        s.cancle=function(){
            $uibModalInstance.dismiss('这是cancle');
        }

    }]);
});