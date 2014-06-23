JS Proxy
=======

Goal: proxy mehtods form one object to another

```javascript
 return new Proxy({
    // closure for creating object for proxing
    $create: function(){
      ...
    },

    // what methods should be peoxied
    $methods: [...],

    // additional methods
    cancel: function(){
      ...
    }
  });
```


Example:
Proxy angularjs $http methods and added cancel mehtod

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
