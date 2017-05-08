define(['app'],function (myapp) {
    myapp.directive('breadcrumbnav', [function () {
        return {
            templateUrl: '/js/directives/breadcrumbnav/breadcrumbnav.html',
            link: function (s, element, attrs) {
                if (attrs.navs.length == 0) {
                    attrs.navs = "{}";
                }
                var data = JSON.parse(attrs.navs);
                for (var k in  data) {
                    if (data[k].link != null) {
                        element.find('#breadcrumb-links').append('<span><a href="' + data[k].link + '">' + data[k].text + '</a></span><span> > </span>');
                    }
                    else {
                        element.find('#breadcrumb-links').append('<span>' + data[k].text + '</span>');
                    }
                }
            }
        }
    }]);

    myapp.directive('breadcrumbnavoverride', [function () {
        return {
            scope: {
                navs: '='
            },
            templateUrl: '/js/directives/breadcrumbnav/breadcrumbnav.html',
            link: function (s, element, attrs) {
                s.$watch("navs", function () {
                    if (s.navs.length == 0) {
                        s.navs = "{}";
                    }
                    //var data = JSON.parse(s.navs);
                    var data = s.navs;
                    element.find('#breadcrumb-links').empty();
                    for (var k in  data) {
                        if (data[k].link != null) {
                            element.find('#breadcrumb-links').append('<span><a href="' + data[k].link + '">' + data[k].text + '</a></span><span> > </span>');
                        }
                        else {
                            element.find('#breadcrumb-links').append('<span>' + data[k].text + '</span>');
                        }
                    }
                })

            }
        }
    }]);
});

