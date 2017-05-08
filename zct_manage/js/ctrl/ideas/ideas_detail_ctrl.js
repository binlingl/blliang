//创意详情ctrl

define(["app","directives/sidebar/sidebar",'api/setting_api','api/ideas_api','services/translate_tags_style'], function (myapp) {
    myapp.controller('ideas_detail_ctrl',
        [
            '$scope',
            '$rootScope',
            '$state',
            'setting_api',
            'ideas_api',
            'translate_tags_format',
            function (s,rs,$state, setting_api,ideas_api,tags_format) {
            console.log("创意详情的Ctrl");

            //s.getImageID=function(fileid){//格式化tag
            //    if(!fileid) return "";
            //    if(fileid&&(fileid+"").indexOf('[')>=0&&(fileid+"").indexOf(']')>1){
            //        var filedData=JSON.parse(fileid);
            //        return filedData[0];
            //    }
            //    return "";
            //};

//-------创意详情----------
            s.get_detail=function() {
                var idx={
                    ideaID:$state.params.id
                };
                ideas_api
                    .get_idea_detail(idx)
                    .success(function (dat) {
                        console.log("---------this is ideas_detail dat--------");
                        s.detailIdeas = dat.data.data[0];
                        if(s.detailIdeas.idea_approval.length!=0){
                             var sug_list=[];
                            angular.forEach(s.detailIdeas.idea_approval,function(item,key){
                                item.approval.approvalsts!=0 && sug_list.push(item);
                            });
                            sug_list.length==0?s.hide_next_sug=0:s.hide_next_sug=1;
                        }
                        tags_format.translate_tag(s.detailIdeas,false);//tags的格式化，false 表示是详情页面
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            };
            s.get_detail();

////删除创意（remove_ideas）
//            s.remove_ideas=function(){
//                var idx={
//                   ideaID:$state.params.id,
//                };
//                ideas_api.remove_ideas(idx)
//                    .success(function(data){
//                       console.log(data);
//                    })
//                    .error(function(data){
//                        console.log(data);
//                });
//            }

        }]
    )
});