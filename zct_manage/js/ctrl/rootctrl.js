define(['app',
    'ctrl/setting/setting_ctrl',
    'ctrl/home/home_ctrl',
    'ctrl/proposal/proposal_ctrl',
    //'ctrl/account/account_ctrl',
    'ctrl/scene/apply_ctrl',
    'ctrl/scene/new_ctrl',

    'ctrl/patent/patent_ctrl',  //专利
    'ctrl/ideas/ideas_ctrl',     //创意
    'ctrl/workspace/mainscene_ctrl',//工作台
    'ctrl/proposal/proposal_export_ctrl',//导出提案
    'ctrl/patent/patent_export_ctrl',//导出专利
    'services/permission'


    /*  "ctrl/account/account_login_ctrl",
      "ctrl/account/account_register_ctrl"*/

],function (myapp) {
    //加载字典数据到本地存储
    myapp.controller('root_controller',
        ['$scope', 'patent_api', function (s, patent_api) {
            console.log('root_controller')

        }])
});