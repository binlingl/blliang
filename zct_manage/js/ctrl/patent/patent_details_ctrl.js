define(["app", "echarts", "directives/sidebar/sidebar", 'api/patent_api'], function (myapp, echarts) {
    myapp.controller('patent_details_ctrl',
        ['$scope', 'patent_api', '$state', function (s, patent_api, $state) {
            console.log('patent_details_ctrl');
            var id = $state.params.id;
            console.log(id);
            var get_patent_detail = function () {
                var form_data = {
                    id: id
                }
                patent_api.getPatentDetailById(form_data)
                    .success(function (data) {
                        console.log(data);
                        s.patent_detail = data.data.patent;
                        console.log(s.patent_detail);
                    })
                    .error(function () {
                        console.log('调取失败');
                    })
            }
            get_patent_detail();
            //删除专利
            s.delete_single_list = function (id) {
                ids.push(id);
                console.log(ids);
                var form_data = {
                    ids: ids
                }
                patent_api.deletePatent(form_data)
                    .success(function (data) {
                        console.log('删除专利成功');
                        get_patent_list();
                    })
                    .error(function () {
                        console.log('调取失败');
                    })
            }

        }])
})