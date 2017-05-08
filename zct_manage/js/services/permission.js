define(['app', 'env', 'jquery', 'api/permission_api','services/zctlocal_storage'], function (myapp, env) {

    myapp.factory('permission', ['permission_api','zctlocal', function (permission_api,zctlocal) {
        console.log('permission');
        var permission = {
            get_permission: function () {
                var perData={
                    ideas:{add:false,edit:false,del:false,view:false},//创意
                    proposal:{add:false,edit:false,del:false,view:false},//提案
                    patent:{add:false,edit:false,del:false,view:false,update:false},//专利
                    trademark:{add:false,edit:false,del:false,view:false,update:false},//商标
                    copyright:{add:false,edit:false,del:false,view:false,update:false},//版权
                    domain:{add:false,edit:false,del:false,view:false,update:false},//域名
                    setting:{add_company:false,edit_company:false,del_company:false,
                        edit_depart:false,del_depart:false,add_role:false,del_role:false,update_progress:false}//设置
                }
                permission_api.getUserPermission().success(function (data) {
                    console.log(data);
                    if (data.data) {
                        data.data.forEach(function (item) {
                            switch (item.module) {
                                case '10'://创意
                                    item.OperateList.forEach(function (single_item) {
                                        switch (single_item) {
                                            case '10'://新增商标
                                                perData.ideas.add=true;
                                                console.log('发布创意');
                                                break;
                                            case '11':
                                                perData.ideas.view=true;
                                                console.log('查看创意');
                                                break;
                                            case '12':
                                                perData.ideas.edit=true;
                                                console.log('修改创意');
                                                break;
                                            case '13':
                                                perData.ideas.del=true;
                                                console.log('删除创意');
                                                break;
                                        }
                                    });
                                    break;
                                case '11'://提案
                                    console.log('提案');
                                    item.OperateList.forEach(function (single_item) {
                                        switch (single_item) {
                                            case '20':
                                                perData.proposal.add=true;
                                                console.log('新增提案');
                                                break;
                                            case '21':
                                                perData.proposal.view=true;
                                                console.log('查看提案');
                                                break;
                                            case '22':
                                                perData.proposal.edit=true;
                                                console.log('修改提案');
                                                break;
                                            case '23':
                                                perData.proposal.del=true;
                                                console.log('删除提案');
                                                break;
                                        }
                                    });
                                    break;
                                case '12'://专利
                                    _.each(item.OperateList, function (single_item) {
                                        switch (single_item) {
                                            case '30':
                                                perData.patent.add=true;
                                                console.log('新增专利');
                                                break;
                                            case '31':
                                                perData.patent.view=true;
                                                console.log('查看专利');
                                                break;
                                            case '32':
                                                perData.patent.update=true;
                                                console.log('修改专利');
                                                break;
                                            case '33':
                                                perData.patent.del=true;
                                                console.log('删除专利');
                                                break;
                                            case '34':
                                                perData.patent.edit=true;
                                                console.log('编辑专利');
                                                break;
                                        }
                                    })
                                    break;
                                case '13'://商标
                                    _.each(item.OperateList, function (single_item) {
                                        switch (single_item) {
                                            case '40':
                                                perData.trademark.add=true;
                                                console.log('新增商标');
                                                break;
                                            case '41':
                                                perData.trademark.view=true;
                                                console.log('查看商标');
                                                break;

                                            case '42':
                                                perData.trademark.update=true;
                                                console.log('修改商标');
                                                break;
                                            case '43':
                                                perData.trademark.del=true;
                                                console.log('删除商标');
                                                break;
                                            case '44':
                                                perData.trademark.edit=true;
                                                console.log('编辑费用');
                                                break;
                                        }
                                    })
                                    break;
                                case '14'://版权
                                    _.each(item.OperateList, function (single_item) {
                                        switch (single_item) {
                                            case '50':
                                                perData.copyright.add=true;
                                                console.log('新增版权');
                                                console.log(perData.copyright.add);
                                                break;
                                            case '51':
                                                perData.copyright.view=true;
                                                console.log('查看版权');
                                                break;
                                            case '52':
                                                perData.copyright.update=true;
                                                console.log('修改版权');
                                                break;
                                            case '53':
                                                perData.copyright.del=true;
                                                console.log('删除版权');
                                                break;
                                            case '54':
                                                perData.copyright.edit=true;
                                                console.log('编辑费用');
                                                break;
                                        }
                                    })
                                    break;
                                case '15':
                                    _.each(item.OperateList, function (single_item) {
                                        switch (single_item) {
                                            case '60':
                                                perData.domain.add=true;
                                                console.log('新增域名');
                                                break;
                                            case '61':
                                                perData.domain.view=true;
                                                console.log('查看域名');
                                                break;

                                            case '62':
                                                perData.domain.update=true;
                                                console.log('修改域名');
                                                break;
                                            case '63':
                                                perData.domain.del=true;
                                                console.log('删除域名');
                                                break;
                                            case '64':
                                                perData.domain.edit=true;
                                                console.log('编辑域名');
                                                break;
                                        }
                                    })
                                    break;
                                case '16':
                                    _.each(item.OperateList, function (single_item) {
                                        switch (single_item) {
                                            case '70':
                                                perData.setting.add_company=true;
                                                console.log('新增企业用户');
                                                break;
                                            case '71':
                                                perData.setting.edit_company=true;
                                                console.log('编辑企业用户');
                                                break;

                                            case '72':
                                                perData.setting.del_company=true;
                                                console.log('删除企业用户');
                                                break;
                                            case '73':
                                                perData.setting.edit_depart=true;
                                                console.log('编辑部门');
                                                break;
                                            case '74':
                                                perData.setting.del_depart=true;
                                                console.log('删除部门');
                                                break;
                                            case '75':
                                                perData.setting.add_role=true;
                                                console.log('新增角色');
                                                break;
                                            case '76':
                                                perData.setting.del_role=true;
                                                console.log('删除角色');
                                                break;
                                            case '78':
                                                perData.setting.update_progress=true;
                                                console.log('修改流程设置');
                                                break;
                                        }
                                    });
                                    break;
                            }
                        })
                        zctlocal.removelocal('permission');
                        zctlocal.setlocal('permission',JSON.stringify(perData));
                    }
                })

            }
        }
        return permission;
    }
    ]);
});

