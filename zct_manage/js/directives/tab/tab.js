define(["app"],function(myapp){

    myapp.directive('mytab',["$state",function($state){

        return {
            scope:{
                data:"="
            },
            templateUrl:'js/directives/tab/tab.html',
            link:function(s,ele,attrs){
                s.current_state=$state.current.name;
                s.tab_click=function(cstate){
                    s.current_state=cstate;
                }
              s.$watch("data",function(n_data){
                s.tab_list=n_data;
              })
            }
        };
    }]);
});