//createby tom 2017 3 21
define(["app", "directives/sidebar/sidebar", 'api/setting_api', 'lodash','services/myalert/myalert'], function (myapp) {
    myapp.controller('role_add_ctrl', ['$scope', 'setting_api', '$state','myalert', function (s, setting_api, $state,myalert) {
            console.log("role_add_ctrl");
            s.ideas_item = [
                {module: 10, operate: 10, m_name: '创意', name: '发布创意', select: false},
                {module: 10, operate: 11, m_name: '创意', name: '查看创意', select: false},
                {module: 10, operate: 12, m_name: '创意', name: '修改创意', select: false},
                {module: 10, operate: 13, m_name: '创意', name: '删除创意', select: false},
            ]
            s.proposal_item = [
                {module: 11, operate: 20, m_name: '提案', name: '新增提案', select: false},
                {module: 11, operate: 21, m_name: '提案', name: '查看提案', select: false},
                {module: 11, operate: 22, m_name: '提案', name: '修改提案', select: false},
                {module: 11, operate: 23, m_name: '提案', name: '删除提案', select: false},
            ]
            s.patent_item = [
                {module: 12, operate: 30, m_name: '专利', name: '新增专利', select: false},
                {module: 12, operate: 31, m_name: '专利', name: '查看专利', select: false},
                {module: 12, operate: 32, m_name: '专利', name: '修改专利', select: false},
                {module: 12, operate: 33, m_name: '专利', name: '删除专利', select: false},
                {module: 12, operate: 34, m_name: '专利', name: '编辑专利', select: false},
            ]
            s.trademark_item = [
                {module: 13, operate: 40, m_name: '商标', name: '新增商标', select: false},
                {module: 13, operate: 41, m_name: '商标', name: '查看商标', select: false},
                {module: 13, operate: 42, m_name: '商标', name: '修改商标', select: false},
                {module: 13, operate: 43, m_name: '商标', name: '删除商标', select: false},
                {module: 13, operate: 44, m_name: '商标', name: '编辑费用', select: false},
            ]
            s.copyright_item = [
                {module: 14, operate: 50, m_name: '版权', name: '新增版权', select: false},
                {module: 14, operate: 51, m_name: '版权', name: '查看版权', select: false},
                {module: 14, operate: 52, m_name: '版权', name: '修改版权', select: false},
                {module: 14, operate: 53, m_name: '版权', name: '删除版权', select: false},
                {module: 14, operate: 54, m_name: '版权', name: '编辑费用', select: false},
            ]
            s.domain_item = [
                {module: 15, operate: 60, m_name: '域名', name: '新增域名', select: false},
                {module: 15, operate: 61, m_name: '域名', name: '查看域名', select: false},
                {module: 15, operate: 62, m_name: '域名', name: '修改域名', select: false},
                {module: 15, operate: 63, m_name: '域名', name: '删除域名', select: false},
                {module: 15, operate: 64, m_name: '域名', name: '编辑域名', select: false},
            ]
            s.setting_item = [
                {module: 16, operate: 70, m_name: '设置', name: '新增企业用户', select: false},
                {module: 16, operate: 71, m_name: '设置', name: '编辑企业用户', select: false},
                {module: 16, operate: 72, m_name: '设置', name: '删除企业用户', select: false},
                {module: 16, operate: 74, m_name: '设置', name: '编辑部门', select: false},
                {module: 16, operate: 75, m_name: '设置', name: '删除部门', select: false},
                {module: 16, operate: 76, m_name: '设置', name: '新增角色', select: false},
                {module: 16, operate: 77, m_name: '设置', name: '删除角色', select: false},
                {module: 16, operate: 78, m_name: '设置', name: '修改流程设置', select: false},
            ]
            s.ideas_item.forEach(function () {

            })
            s.proposal_item.forEach(function () {

            })
            s.patent_item.forEach(function () {
            })
            s.trademark_item.forEach(function () {
            })
            s.copyright_item.forEach(function () {
            })
            s.domain_item.forEach(function () {
            })
            s.setting_item.forEach(function () {
            })
            //前端页面的选中效果
            s.select_active = function (p_item) {
                switch (p_item.module) {
                    case 10:
                        isSelect(s.ideas_item,p_item);
                        console.log(s.ideas_item);
                        for(var i=0;i<s.ideas_item.length;i++){
                            if(s.ideas_item[i].select==true){
                                var single_arr={
                                    module:s.ideas_item[i].module,
                                    operate:s.ideas_item[i].operate,
                                    isSelect:s.ideas_item[i].select,
                                }
                                console.log(single_arr);
                            }
                        }
                        break;
                    case 11:
                        isSelect(s.proposal_item,p_item);
                        break;
                    case 12:
                        isSelect(s.patent_item,p_item);
                        break;
                    case 13:
                        isSelect(s.trademark_item,p_item);
                        break;
                    case 14:
                        isSelect(s.copyright_item,p_item);
                        break;
                    case 15:
                        isSelect(s.domain_item,p_item);
                        break;
                    case 16:
                        isSelect(s.setting_item,p_item);
                        break;
                }
            }
            var isSelect=function(item_data,p_item){
                _.each(item_data, function (item) {
                    if (item.operate == p_item.operate) {
                        item.select = !p_item.select;
                        return;
                    }
                });
            }


            //提交增加角色
            s.add_role_save=function(){
                //给list绑值
                var select_arr=[];
                var component_arr=function(item_data){
                    _.forEach(item_data,function(item){
                        var single_arr={
                            module:item.module,
                            operate:item.operate
                        };
                        if(item.select==true){
                            select_arr.push(single_arr)
                        }
                    })
                }
                component_arr(s.ideas_item);
                component_arr(s.proposal_item);
                component_arr(s.patent_item);
                component_arr(s.trademark_item);
                component_arr(s.copyright_item);
                component_arr(s.domain_item);
                component_arr(s.setting_item);
                if(select_arr.length==0){
                    myalert.alert('','角色没有选择','')
                    console.log(select_arr);
                }else{
                var form_data={
                    name: s.role_name,
                    List: select_arr
                }
                console.log(form_data);
                setting_api.addRole(form_data)
                    .success(function(data){
                    console.log(data);
                        $state.go('home.setting.role_permission');
                })
                    .error(function(){
                        console.log('调取失败');
                    })
            }}
        }]
    )
});
