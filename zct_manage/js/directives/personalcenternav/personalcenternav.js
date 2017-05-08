define(['app'],function (myapp) {
    myapp.directive('personalcenternav', [function () {
        return {
            link: function (s, element, attrs) {
                element.find('.title:not(.active)').parent('.level-1').find('.level-2s').hide();
                element.find('.title.active').parent('.level-1').find('.level-2s').show();

                element.find('.title').on('click', function () {
                    if ($(this).parent('.level-1').find('.level-2s').is(":visible")) {
                        $(this).parent('.level-1').find('.level-2s').slideUp(200);
                        $(this).removeClass("active");
                    } else {
                        $(this).parent('.level-1').find('.level-2s').slideDown(200);
                        $(this).addClass("active");
                    }
                });
                //此时文档未生成，所以无法找到“.level-2”元素，时间绑定失败
                /*element.find('.level-2').on('click',function(){
                 if($(this).is(":hidden")){
                 var thisTitle = $(this).parent().parent().find('.title');
                 thisTitle.click();
                 console.log(1);
                 };
                 element.find('.level-2').removeClass("active");
                 $(this).addClass("active");
                 console.log(2);
                 });*/
                //通过冒泡机制将事件绑定在父节点，通过事件的target对象也就是点击事件的对象体提取出来进行操作
                element.find('.level-2s').on('click', function (e) {
                    var obj = e.target;
                    if ($(obj).is(":hidden")) {
                        var thisTitle = $(obj).parent().parent().find('.title');
                        thisTitle.click();
                        console.log(1);
                    }
                    ;
                    element.find('.level-2').removeClass("active");
                    $(obj).addClass("active");
                    console.log(2);
                });

            }
        }
    }]);

});