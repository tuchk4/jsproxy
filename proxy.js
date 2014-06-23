(function(root, factory) {
    if(typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if(typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function() {
            return(root.Boop = factory());
        });
    } else {
        // Browser globals
        root.Boop = factory();
    }
}(this, function() {
  
  var Proxy = function(obj){
  
    if (!obj.hasOwnProperty('$methods')
      || !obj.hasOwnProperty('$create')){
  
      throw new Error('Invalid proxy config');
    }
  
    function createProxyMethod(method){
      return function(){
        return obj.$object[method].apply(obj.$object, arguments);
      }
    }
  
    function createProxyMethods(methods){
  
      for (var i = 0, size = methods.length; i < size; i++){
        var method = methods[i];
        obj[method] = createProxyMethod(method);
      }
    }
  
    createProxyMethods(obj.$methods);
  
    obj.$object = obj.$create();
  
    return obj;
  };
  
  return Proxy;
}));
