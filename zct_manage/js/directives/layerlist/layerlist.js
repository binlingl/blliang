define(['app','jquery'],function (myapp) {

    myapp.directive('layerlist', [function () {
        return {
            templateUrl: '/js/directives/layerlist/layerlist.html',
            scope: {
                twolayerdata: '=',
                firstlayerdata: '=',
                secondlayerdata: '=',
                addfirstlayer: '&',
                addsecondlayer: '&',
                firstlayerclick: '&',
                deleteindustry: '&'
            },
            link: function (s, ele, attrs) {
                ele.on('click', '.firstLayer a', function (a) {
                    s.index = $(this).attr('index');
                    s.firsno = s.firstlayerdata[s.index].No;
                    //s.secondlayerdata= _.filter(s.twolayerdata,function(o){
                    //   return o.Pno == s.firsno;
                    //});
                    s.firstlayerclick({Pno: s.firsno});
                    s.$apply();
                });

                ele.on('click', '.secondLayer a', function (e) {
                    s.secondIndex = $(this).attr('index');
                    s.$apply();
                });
            }
        }
    }]);
});