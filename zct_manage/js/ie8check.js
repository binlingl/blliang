var agent = window.navigator.userAgent.toLowerCase() ;
var regStr_ie = /(msie\s|trident.*rv:)([\w.]+)/;
var regStr_ff = /firefox\/[\d.]+/gi
var regStr_chrome = /chrome\/[\d.]+/gi ;
var regStr_saf = /safari\/[\d.]+/gi ;
//IE
if(!!window.ActiveXObject || "ActiveXObject" in window)
{
    //agent.match(regStr_ie)
    var  ie_array=regStr_ie.exec(agent);
    var ie_version =parseInt(ie_array[2]);
    //alert(ie_version);
    //alert(ie_version > 8);


    if(ie_version <= 8){
        //低于或等于8.0跳转
        //alert('www');
        window.location.href = '/common_tpls/errors/ie8.html';
    }
}
