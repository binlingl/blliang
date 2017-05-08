define(["app","directives/sidebar/sidebar",'api/setting_api','api/ideas_api'], function (myapp) {
    myapp.controller('ideas_waitPass_ctrl',
        ['$scope','$rootScope','setting_api', 'ideas_api', function (s,rs,setting_api, ideas_api) {

            rs.eval='waitList';
          //  rs.tabChange("waitList");
console.log("this is idea_waitPass ctrl");

//--------分页---------------
            //uib-pagination分页参数
            s.pageParam = {
                maxSize: 10,//显示时的效果
                totalItems: 100,//总数
                currentPage: 1,//当前页
                perPageItems: 10 //每页显示数据条数(默认)
            }

//初始化页面，获得待审批列表
            var get_list={
                //  pageIndex:1,//第一页
                pPageIndex:s.pageParam.currentPage,
                pPageSize:s.pageParam.perPageItems,        //每页显示数据条数
                //   pageSize:10//10条数据
            }

//分页函数
            s.page_change = function () {
                // s.pageParam.currentPage = s.pageParam.currentPage;
                console.log(s.pageParam.currentPage);
                console.log(s.pageParam.totalItems);
                get_list.pPageIndex=s.pageParam.currentPage;//每一次切换，都要，改变index
                s.get_wait_list();
            }

//0：为初始值 1：出现图片 2：列表
            s.hide_list=0;



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
            s.get_wait_list=function(){
                ideas_api
                    .get_wait_pass_list(get_list)
                    .success(function(dat){
                        console.log(dat);
                        console.log("--------------------");
                        if(!dat.data){//如果返回的对象为空
                            s.hide_list=1;
                        }
                        else{
                            s.hide_list=2;
                            s.pageParam.totalItems=dat.data.count;
                            s.waitList=dat.data.data;
                            for(var i=0;i<s.waitList.length;i++){
                                s.waitList[i].name=s.waitList[i].idea.name;
                                s.waitList[i].realname=s.waitList[i].user.realname;
                                s.waitList[i].created_at=s.waitList[i].idea.created_at;
                                s.waitList[i].depart_name=s.waitList[i].depart.name;
                                s.waitList[i].tags=s.waitList[i].idea.tags;
                                //s.waitList[i].name=s.waitList[i].idea.name
                                //s.waitList[i].name=s.waitList[i].idea.name
                            }
                            s.asd=s.waitList;

                            /*
                            try{
                                angular.forEach(s.waitList,function(item,key){
                                    item.idea.tags= JSON.parse(item.idea.tags);
                                });
                            }catch(e){
                                console.log("存在问题");

                            }
                            */

                           // console.log(s.waitList);//array
                        }
                    })
                    .error(function(data){
                        console.log(data);
                })
            };
            s.get_wait_list();

        }]
    )
})
