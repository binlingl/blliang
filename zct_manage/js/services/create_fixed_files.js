define(['app','jquery','api/dictionary_api'], function (myapp) {
    myapp.factory('create_fixed', ['dictionary_api',function (dictionary_api) {
        console.log("create_fixed");
        var fix_file={};
        ////得到用户的权限
        //get_my_right.get_right=function(obj){
        //    return(JSON.parse(JSON.parse(obj)));
        //
        //
        //
        //}

          fix_file.create_fix_file=function(obj){
            angular.forEach(obj,function(val,key){
                if(val.idea.attachments){
                    var attachments=JSON.parse(val.idea.attachments);
                    val.idea.attachments_array=[];
                    attachments.forEach(function (a_item) {
                        dictionary_api.get_file_info(a_item).success(function (a_data) {
                            val.idea.attachments_array.push(a_data.data);
                        })
                    })
                    //val.idea.attachments=JSON.parse(val.idea.attachments);
                }
            });
        }
        return fix_file;
    }])
})
