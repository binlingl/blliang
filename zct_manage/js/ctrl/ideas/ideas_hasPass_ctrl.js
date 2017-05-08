//已经申批的创意控制器
define(["app","directives/sidebar/sidebar",'api/setting_api','api/ideas_api'], function (myapp) {
    myapp.controller('ideas_hasPass_ctrl',
        ['$scope','$rootScope','setting_api', 'ideas_api', function (s,rs,setting_api, ideas_api) {
console.log("this is idea_hasApproval ctrl");

            rs.eval='hasApproval';
           // rs.tabChange("hasApproval");
            console.log(rs.eval);
//--------分页---------------
            //uib-pagination分页参数
            s.pageParam = {
                maxSize: 10,//显示时的效果
                totalItems: 0,//总数
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
                s.get_list();//重新获得数据
            }

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
            s.approval_list=function(){
                ideas_api
                    .get_has_pass_list(get_list)
                    .success(function(dat){
                        if(dat.data==null){//如果没有返回数据（就隐藏）
                            s.hide_list=1;
                        }
                        else{
                            s.pageParam.totalItems=dat.data.count;
                            s.approList=dat.data.data;


                            for(var i=0;i< s.approList.length;i++){
                                s.approList[i].name= s.approList[i].idea.name;
                                s.approList[i].realname= s.approList[i].user.realname;
                                s.approList[i].created_at= s.approList[i].idea.created_at;
                                s.approList[i].depart_name= s.approList[i].depart.name;
                                s.approList[i].tags= s.approList[i].idea.tags;
                                //s.waitList[i].name=s.waitList[i].idea.name
                                //s.waitList[i].name=s.waitList[i].idea.name
                            }
                            s.asd= s.approList;

                            try{
                                s.approList.forEach(function(item){
                                    item.idea.tags=JSON.parse( item.idea.tags);
                                    //  console.log(item.idea.tags);
                                });
                            }
                            catch(e){
                                console.log("存在问题");
                            }

                            s.hide_list=2;
                        }
                    })
                    .error(function(dat){
                        console.log(dat);
                    })

            }
            s.approval_list();

        }]
    )})
