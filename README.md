JS Proxy
=======

#Goal

Call object's methods from another object

```javascript
 return new Proxy({
    // closure for creating object for proxing
    $create: function(){
      ...
    },

    // array of the methods that should be proxied
    $methods: [...],

    // additional methods
    cancel: function(){
      ...
    }
  });
```


Example:
Proxy methods from angularjs $http service and add custom `cancel` method:

```javascript

var canceler = $q.defer();

var p = new Proxy({
  $create: function(){
    return $http({
      ...
      timeout: canceler.promise
    });
  },

  $methods: ['then', 'catch', 'finally'],

  cancel: function(){
    return canceler.resolve();
  }
});

// methods form $http service
p.then(...)
p.catch(...)
p.finally(...)

// custom method
p.cancel()
```
