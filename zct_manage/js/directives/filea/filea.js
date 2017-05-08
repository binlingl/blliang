define(['app'],function (myapp) {
    myapp.directive('filea', ['config', 'apis', function (config, apis) {
        return {
            scope: {},
            template: '<a href="{{filepath}}">{{filename}}<a/>&nbsp;&nbsp;&nbsp;&nbsp;',
            link: function (s, ele, attrs) {
                s.filepath = config.api_url + "/api/file/download_file/" + attrs.filea;
                apis.dictionary.get_file_info(attrs.filea).success(function (data) {
                    s.filename = "";
                    if (data.data != null)
                        s.filename = data.data.name;
                });
            }
        }
    }]);
});