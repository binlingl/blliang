define(["app", "lodash"], function (myapp) {
  myapp.factory("zctlocal", [function() {
    var mylocal = {};
    /*添加localStorage
     * key:key
     * value:尽支持json对象,请保持json
     * */
    mylocal.setlocal = function (key, value) {
      //设置local
      localStorage.setItem(key, JSON.stringify(value));
    };

    /*改变localStorage对象的值
     * key:需要改变的对象
     * name:需要改变的对象(key)的键
     * value:新值
     * */
    mylocal.updatelocal = function (key, name, value) {
      //获取的localStorage对象
      var getKey = mylocal.getlocal(key);
      //改变指定的值
      if (getKey != {} || getKey != undefined) {
        _.set(getKey, name, value);
      }
      //保存localStorage对象
      localStorage.setItem(key, JSON.stringify(getKey));
    };

    /*改变localStorage整个对象
     * key:需要改变的对象
     * value:新值
     *
     * */
    mylocal.updateAlllocal = function (key,value) {
      //删除localStorage对象
      localStorage.removeItem(key);
      //保存localStorage对象
      localStorage.setItem(key, JSON.stringify(value));
    };

    /*获取localStorage对象
     * key:指定的localStorage对象
     * */
    mylocal.getlocal = function (key) {
      //获取localStorage字符串
      var localdata = localStorage.getItem(key);
      //将localStorage字符串转json对象
      if (localdata == undefined) {
        return {};
      } else {
        try {
          return JSON.parse(localdata);
        } catch (e) {
          console.log(e.message);
          return {};
        }
      }
    };

    /*删除localStorage对象
     * key:指定的localStorage对象
     * */
    mylocal.removelocal = function (key) {
      localStorage.removeItem(key);
    };

    /*localStorage对象是否存在
     * key:指定的localStorage对象
     * */
    mylocal.islocal = function (key) {
      var localData = localStorage.getItem(key);
      if (localData == undefined || localData == null || localData == "") {
        return false;
      } else {
        return true;
      }
    };

    /*获取localStorage对象中属性的值
     * k:localStorage对象
     * attr:对象的某一个属性
     * */
    mylocal.getlocalByAttr = function (key, attr) {
      var localData = localStorage.getItem(key);
      var result = "";
      if (localData != undefined || localData != null || localData != "") {
        var local_ = JSON.parse(localData);
        result = _.result(local_, attr)
      } else {
        result = "";
      }
      return result;
    };
    return mylocal;
  }]);
})
