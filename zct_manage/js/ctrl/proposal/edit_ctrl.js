/**
 * Created by admin on 2017/3/21.
 */
define(["app", 'echarts', 'api/proposal_api', 'services/myalert/myalert', 'api/side_bar_api','services/common'], function (myapp, echarts) {
    myapp.controller('edit_ctrl', ['$scope', 'proposal_api', '$state', 'myalert', 'side_bar_api','common', function (s, proposal_api, $state, myalert, side_bar_api,common) {
        var id = $state.params.id;
        s.nameempty = false;
        s.typeempty = false;

        //获取提案详情
        s.get_detaile = function () {
            proposal_api.proposa_detaile({id: id})
                .success(function (data) {
                    s.htmlObj = data.data.data;

                   console.log("&&&&&&&&&&&&&&&&&&&&&&",s.htmlObj.technology_drawings);

                    //根据文件id获取技术交底书详情
                   /* s.getTechnology = function(id){
                        if(id){
                        proposal_api.getfiledatabyid(id).success(function(data){
                            s.htmlObj.technology_book = data.data.name;
                            console.log("jjjjjjjjjjjjjjj",s.technology_book);
                        })
                        }
                    };
                    s.getTechnology(common.getImageID(s.htmlObj.technology_book));*/
                })
        };
        s.get_detaile();
            //提案部门
            var get_pat_list = function () {
                proposal_api.GetDepartmentlist()
                    .success(function (data) {
                        if (data.data) {
                            s.partmentoption = data.data.DepartmentList;
                        }
                    })
        }
        get_pat_list();
        s.setpartment = function (partments) {
            s.partments = partments;
            s.departmentid = partments.id;
        };
        //上传技术交底书
        s.upload_file_attachment = function (fileids) {
            s.technology_book = JSON.stringify(fileids);
        }
        //技术交底附图
        s.uploadcom_patent_drawing = function (fileids) {
            s.technology_drawings = fileids;
        };
        //专利检索报告
        s.upload_search_report = function (fileids) {
            s.patent_search_report = fileids;
        }
        //其他附件
        s.upload_file_otherattachment = function (fileids) {
            s.other_attachments = fileids;
        }
        s.alltypes = ['发明', '实用新型', '外观设计'];
        //编辑提案

        s.editProposal = function () {
            s.send_obj = {
                proposal:{
                    casenumber: s.htmlObj.casenumber,
                    contractor: s.htmlObj.contractor,
                    createduser:s.htmlObj.createduser,
                    departmentid:s.htmlObj.departmentid,
                    first_inventor_idcard: s.htmlObj.first_inventor_idcard,
                    id: s.htmlObj.id,
                    inventor: s.htmlObj.inventor,
                    keyword: s.htmlObj.keyword,
                    name: s.htmlObj.name,
                    other_attachments: s.htmlObj.other_attachments,
                    patent_search_report:s.htmlObj.patent_search_report,
                    products: s.htmlObj.products,
                    remark: s.htmlObj.remark,
                    summary: s.htmlObj.summary,
                    summary_invention: s.htmlObj.summary_invention,
                    technical_field: s.htmlObj.technical_field,
                    technology_book:s.htmlObj.technology_book,
                    technology_drawings: s.htmlObj.technology_drawings,
                    type: s.htmlObj.type
                }
            };
            if (!s.htmlObj.name && !s.htmlObj.type) {
                myalert.alert("提案名称和类型不能为空");
            } else if (!s.htmlObj.name) {
                myalert.alert("提案名称不能为空");
            } else if (!s.htmlObj.type) {
                myalert.alert("提案类型不能为空");
            } else {
                proposal_api.editProposal(s.send_obj).success(function (data) {
                    if (data.state == 'false') {
                        myalert.content(data.msg);
                    } else {
                        myalert.alert('保存成功！','查看我的提案',function(){
                            $state.go('home.proposal.list');
                        });
                        s.item = data.data;
                    }
                });
            }
        };
    }]);
});
