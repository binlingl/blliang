//全部创意

define(["app","directives/sidebar/sidebar",'api/setting_api','api/ideas_api','services/zct_get_my_right',
        'api/dictionary_api','services/create_fixed_files','services/setting','services/translate_tags_style',
    'directives/tab/tab','directives/search_input/search_input'
],function (myapp) {
    myapp.controller('ideas_allIdeas_ctrl',
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
            function (s,rs,$state,setting_api,ideas_api,myalert,getRight,dictionary_api,create_file,setting,tags_format) {
         console.log("this is ideas_allIdeas_ctrl");
         s.hide_list=0;//用于显示图片（提示图片）

//搜索框的指令运用(传递参数)
         s.search_input=[
             //类型一:name+输入框
             {
                 key_names:[
                     {
                         keyname:'关键字',
                         v:0,
                     },
                     //{
                     //    keyname:'类别2',
                     //    v:1
                     //}
                 ],//标签的名字
                 value_type:"input",//input 输入的   select 下拉的  range 区间
                  wid:'200px',//宽度
             },

             //类型四：名字+下拉框
             {
                 key_names:[
                     {
                         keyname:'部门',
                         v:0,
                         values:[{name:'全部',v:'全部'},{name:'总经办',v:"总经办"},{name:'产品研发部',v:'产品研发部'},{name:'研发部',v:'研发部'}]
                     },
                     {
                         keyname:'创意状态',
                         v:1,
                         values:[{name:'全部',v:'全部'},{name:'审核中',v:"审核中"},{name:'通过',v:'通过'},{name:'未通过',v:'未通过'}]
                     },
                     {
                         keyname:'标签',
                         v:1,
                         values:[{name:'全部',v:'全部'},{name:'专利',v:"专利"},{name:'商标',v:'商标'},{name:'版权',v:'版权'},{name:'域名',v:'域名'}]
                     },
                 ],
                 value_type:"single_name",
                 wid:'',//宽度
             },

         ];

      //  s.subdata={};//定义一个对象
        s.testSubData_click=function() {
            console.log(s.subdata);
        }

//tab 的切换
            rs.eval="allIdeas";

//权限的控制(利用user_right存储用户的全部权限)
                //var my_right=localStorage['permission'];
           console.log("---------------权限控制-------------------");
           s.idea_right=getRight.get_right(localStorage['permission']).ideas;

//获取“部门名”
            var get_department_name=function(){
                setting_api
                    .getDepartmentAndRoleList()
                    .success(
                        function(data){
                            s.departments=data.data.DepartmentList;
                        }
                    )
                    .error(
                        function(data){
                            console.log(data)
                        }
                    );
            };
            get_department_name();

//--------分页---------------
                //uib-pagination分页参数
            s.pageParam = {
                    maxSize: 10,//显示时的效果
                    totalItems:0,//总数
                    currentPage: 1,//当前页
                    perPageItems: 3 //每页显示数据条数(默认)
                }

//管理员用户：可以查看全部创意，普通用户获得我的创意
//获得所有创意
            s.getIdeas={
                depart:'',//部门
                iState:'',//状态
                keyWord:'',//关键字
                label:'',//标签
                pageIndex:s.pageParam.currentPage,//页码
                pageSize:s.pageParam.perPageItems //数据
            };
            //分页函数
            s.page_change = function () {
                s.getIdeas.pageIndex=s.pageParam.currentPage;//每一次切换，都要，改变index
                s.getAll_ideasList();
            }

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
            s.getAll_ideasList=function(){
            console.log(s.subdata,"参数传来了--------------------------");
                ideas_api
                    . get_all_list(s.getIdeas)
                    .success(function(dat){
                        if(!dat.data){//如果没有创意
                            s.hide_list=1;
                        }
                        else{
                            s.hide_list=2;
                            s.pageParam.totalItems=dat.data.count;
                            s.allList=dat.data.data;//获得列表


                            for(var i=0;i< s.allList.length;i++){
                                s.allList[i].name= s.allList[i].idea.name;
                                s.allList[i].realname=s.allList[i].user.realname;
                                s.allList[i].created_at= s.allList[i].idea.created_at;
                                //s.myIdeasList[i].depart_name= s.myIdeasList[i].depart.name;
                                s.allList[i].tags= s.allList[i].idea.tags;
                                //s.waitList[i].name=s.waitList[i].idea.name
                                //s.waitList[i].name=s.waitList[i].idea.name
                            }
                            s.asd= s.allList;


                            create_file.create_fix_file(s.allList);//生成附件
                            tags_format.translate_tag(s.allList,true);//tags的格式化
                            console.log(s.allList);
                            /*
                            angular.forEach( s.allList,function(val,i){
                                try
                                {
                                    if(val.idea.tags){
                                        console.log(val.idea.tags);
                                        val.idea.tags= JSON.parse(val.idea.tags); //s.allList[key].idea.tags.split(",");//将字符串变成   数组
                                    }

                                }
                                catch (e)
                                {
                                    console.log("无数据，没用返回tags");
                                    //throw new Error(e.Message);
                                }
                            });
                            */


                            console.log(s.allList);
                        }
                    })
                    .error(function(data){
                        console.log(data);
                    })
            }

            s.getAll_ideasList();

//删除创意（remove_ideas）
            s.remove_ideas=function(id){
                var idx={
                    ideaID:id,
                };
                ideas_api.remove_ideas(idx)
                    .success(function(data){
                        console.log(data);
                        data.state&&myalert.alert("删除成功！","点击完成",function(){
                            s.getAll_ideasList();
                        })
                    })
                    .error(function(data){
                        console.log(data);
                    });
            }

//文件的下载
            var down_file_domain=setting.url_href.down_file;
            s.down_file=function(id){
               console.log(id);
                window.open(down_file_domain+'/'+id);
                //window.location=down_file_domain+"/"+id;
            }
        }]
    )
});


