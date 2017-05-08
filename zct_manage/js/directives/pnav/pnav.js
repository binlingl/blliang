define(['app'],function (myapp) {
    myapp.directive('pnav', [function () {
        return {
            templateUrl: '/directives/pnav/p_nav.html',
            link: function (s, ele, attrs) {
                ele.find('a').removeClass('active');
                var flag = true;
                var flag1 = true;
                var animatetime = 500;
                $(ele).on("mouseenter", '.p-nav-show', function () {
                    if (flag) {
                        flag = false;
                        $('.p-nav').animate({left: "0"}, animatetime, function () {
                            setTimeout(function () {
                                flag = true;
                            }, animatetime)
                        })
                    }
                }).on("mouseleave", '.p-nav', function () {
                    if (flag1) {
                        flag1 = false;
                        $('.p-nav').animate({left: "-8%"}, animatetime, function () {
                            flag1 = true;
                        })
                    }

                })

                var pname = localStorage.getItem('platform_name');

                if (pname == 'pdeal') {
                    $('.transation-link').addClass('active');
                } else if (pname == 'service') {
                    $('.agent-link').addClass('active');
                }
                else if (pname == 'papp_center') {
                    $('.software-link').addClass('active');
                }
                else if (pname == 'phr') {
                    $('.hr-link').addClass('active');
                } else if (pname == 'pacademic') {
                    $('.academic-link').addClass('active');
                } else if (pname == 'psearch') {
                    $('.information-link').addClass('active');
                }
            }
        }
    }]);
});