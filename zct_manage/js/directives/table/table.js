define(['app'], function (myapp) {
    myapp
        .directive('dirtable', [function () {
            return {
                scope:{
                    "datasource": "=",
                    "option":"="
                },
                restrict: 'AE',
                templateUrl: 'js/directives/table/table.html',
                //replace:true,
                link: function (s, element, attrs) {

                    s.$watchGroup(['datasource','option'], function (n_value) {
                        if (n_value) {
                            s.add_item=n_value[0];
                            s.n_option=n_value[1];
                            console.log(n_value);

                        }
                    })


                }

            }
        }])

})