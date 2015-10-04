'use strict'
angular.module("BasicAngular")
  .factory("resource", function($timeout, fauxDB) {

    var users; 

    fauxDB.$loaded()
    .then(function(list) {
      users = list;
    })
    .catch(function(e) {
      console.log("Error: ", e)
    });
    
    function getAll() {
      return fauxDB;
    }
    
    function getOne(target) {
      // for(var i=0, len=users.length; i<len;i++){
      //   if(target === users[i].email) return users[i];
      // }
      // return false;
      return fauxDB.$getRecord(target);
    }
    
    function post(data) {
      // if(inDb(data)){
      //   console.log("in post", data);
      //   fauxDB.insert(data);
      // } else return "already exists";

      return fauxDB.$add(data)
      .then(function(ref) {
        var id = ref.key()
        console.log("User added with ID ", id);
        return id;
      });
    }
    
    function put(target, data) {
      var user = getOne(target);
      user.save(data)
      .then(function(ref) {
        return ref.key();
      })
    }
    // function inDb(user) {
    //   for(var i=0, len=users.length; i<len;i++){
    //     if(user.email === users[i].email) return false;
    //   }
    //   return true;
    // }

    return {
      getAll: getAll,
      getOne: getOne,
      post: post,
      put: put
      // check: inDb
    }
  })