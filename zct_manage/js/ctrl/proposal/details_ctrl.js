/**
 * Created by admin on 2017/3/27.
 */
define(["app",'api/proposal_api','services/setting','services/common'], function (myapp) {
    myapp.controller('details_ctrl',['$scope','proposal_api','$state','setting','common',
        function (s,proposal_api,$state,setting,common) {
            s.setting=setting;
            s.common=common;
        var id = $state.params.id;
        var get_details = function () {
            proposal_api.proposa_detaile({id:id,getType:1})
                .success(function (data) {
                    console.log("12344");
                    console.log(data);
                    s.p_detaile = data.data.data;//审核详情
                    //技术交底书
                    s.getFile = function(id)
                    {
                        if(id){
                        proposal_api.getfiledatabyid(id).success(function (data) {
                            s.p_detaile.technology_book = data.data.name;
                        });
                        }
                    };
                    s.getFile(common.getImageID(s.p_detaile.technology_book));
                    //专利检索报告
                    s.getPatentFile = function(id)
                    {
                        if(id){
                        proposal_api.getfiledatabyid(id).success(function (data) {
                            s.p_detaile.patent_search_report = data.data.name;
                        });
                        }
                    };
                    s.getPatentFile(common.getImageID(s.p_detaile.patent_search_report));
                    //其他附件
                    s.getOtherFile = function(id)
                    {
                        if(id){
                        proposal_api.getfiledatabyid(id).success(function (data) {
                            s.p_detaile.other_attachments = data.data.name;
                        });
                        }
                    };
                    s.getOtherFile(common.getImageID(s.p_detaile.other_attachments));
                    //获取图片详情
                    s.p_detaile.technology_drawings=setting.url_href.down_img+"/"+common.getImageID(s.p_detaile.technology_drawings);
                    //审批人信息
                    s.p_approvallist = data.data.approvalList;
                    //s.approvaluser = s.p_approvallist.ApprovalUser;//审批用户
                    //s.approvaldate = s.p_approvallist.ApprovalDate;//审核日期
                    //s.approvaluserheadportrait = s.p_approvallist.ApprovalUserHeadPortrait;
                    //s.approvalsts = s.p_approvallist.approvalsts;//状态
                    //s.remark = s.p_approvallist.remark;//审核标记
                    //当前审批人后面的审批列表
                    s.approvalUserList = data.data.approvalUserList;
                    s.id = s.approvalUserList.id;//审批人id
                    s.name = s.approvalUserList.name;//审批人姓名
                    s.sort = s.approvalUserList.sort;//审批人顺序

                })
        };
        get_details();

    }]);
});
