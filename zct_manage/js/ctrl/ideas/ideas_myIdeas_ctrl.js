//我的创意列表
define(["app","directives/sidebar/sidebar",'api/setting_api','api/ideas_api','services/zct_get_my_right','api/dictionary_api',
'services/create_fixed_files','services/setting','services/translate_tags_style'], function (myapp) {
    myapp.controller('ideas_myIdeas_ctrl',
        [
            '$scope',
            '$rootScope',
            '$state',
            'setting_api',
            'ideas_api',
            'myalert',
            'get_my_right',
            'dictionary_api',
            'create_fixed',
            'setting',
            'translate_tags_format',
            function (s, rs,$state,setting_api, ideas_api,myalert,getRight,dictionary_api,create_file,setting,tags_format) {
          console.log("ideas_myIdeas_ctrl");
         // debugger;
//tab 的切换
            rs.eval='myIdeas';
            //rs.tabChange("myIdeas");

//获取用户的权限

            console.log("---------------权限控制-------------------");
            s.idea_right=getRight.get_right(localStorage['permission']).ideas;
           //console.log(s.idea_right);

//--------分页---------------
            //uib-pagination分页参数
            s.pageParam = {
                maxSize: 10,//显示时的效果
                totalItems: 0,//总数
                currentPage: 1,//当前页
                perPageItems: 3 //每页显示数据条数(默认)
            }

            //初始化页面，获得待审批列表
            var get_list= {
                pageIndex: s.pageParam.currentPage,
                pageSize: s.pageParam.perPageItems,        //每页显示数据条数
            }

            //分页函数
            s.page_change = function () {
                // s.pageParam.currentPage = s.pageParam.currentPage;
                console.log(s.pageParam.currentPage);
                console.log(s.pageParam.totalItems);
                get_list.pageIndex=s.pageParam.currentPage;//每一次切换，都要，改变index
                s.getMy_ideasList();
            }

////获得我的创意

            s.hide_list=0;//用于显示图片（提示图片）

                s.asd=[];
                s.qwe={
                    title:[
                        {name:'提案名称',key:'name',wid:'199'},
                        {name:'创建人',key:'realname',wid:'128'},
                        {name:'创建日期',key:'created_at',wid:'90'},
                        {name:'部门',key:'depart_name',wid:'90'},
                        {name:'标签',key:'tags',wid:'90'},
                        {name:'操作',key:'pno',wid:'116'},
                    ]
                };


            s.getMy_ideasList=function(){
                console.log("getMy_ideasList");
                ideas_api
                    .get_my_ideas_list(get_list)
                    .success(function(dat){
                        if(!dat.data|| !dat.data.data){//如果没有创意
                            s.hide_list=1;
                        }
                        else{
                            s.hide_list=2;
                            s.pageParam.totalItems=dat.data.count;
                            s.myIdeasList=dat.data.data;
                            for(var i=0;i< s.myIdeasList.length;i++){
                                s.myIdeasList[i].name= s.myIdeasList[i].idea.name;
                                s.myIdeasList[i].realname= s.myIdeasList[i].user.realname;
                                s.myIdeasList[i].created_at= s.myIdeasList[i].idea.created_at;
                                //s.myIdeasList[i].depart_name= s.myIdeasList[i].depart.name;
                                s.myIdeasList[i].tags= s.myIdeasList[i].idea.tags;
                                //s.waitList[i].name=s.waitList[i].idea.name
                                //s.waitList[i].name=s.waitList[i].idea.name
                            }
                            s.asd= s.myIdeasList;
                            create_file.create_fix_file(s.myIdeasList);//生成附件
                            //try{
                            //        if(val.idea.tags){
                            //            val.idea.tags= JSON.parse(val.idea.tags); //s.allList[key].idea.tags.split(",");//将字符串变成   数组
                            //        }
                            //}
                            //catch(e){
                            //    console.log("存在问题");
                            //}
                            tags_format.translate_tag(s.myIdeasList,true);//tags的格式化
                            //console.log(s.myIdeasList[0].idea);
                        }
                    })
                    .error(function(data){
                        console.log(data);
                    });
            }
            s.getMy_ideasList();

//删除我的创意
            s.remove_ideas=function(inx){//返回待删除创意的ID
                console.log(inx);
               // var ideaID=inx;
                var data={
                    ideaID:inx,
                }
                myalert.message("删除创意！","是否删除！！",
                    function(){
                         return 0 ;
                    },
                    function(){
                        ideas_api
                            .remove_ideas(data)
                            .success(function(data){
                                //删除成功之后，要重新加载数据
                                data.state&&s.getMy_ideasList();
                            })
                            .error(function(data){
                                console.log(data);
                            })
                    }

                );
            }

//文件的下载
            var down_file_domain=setting.url_href.down_file;
            s.down_file=function(id){
                console.log(id);
                window.open(down_file_domain+'/'+id);
            }

        }])
});



