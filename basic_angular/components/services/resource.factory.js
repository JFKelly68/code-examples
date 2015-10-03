'use strict'
angular.module("BasicAngular")
  .factory("resource", function($timeout, fauxDB) {
    var users = fauxDB.users;
    
    function getAll() {
      return fauxDB.users;
    }
    
    function getOne(target) {
      for(var i=0, len=users.length; i<len;i++){
        if(target === users[i].email) return users[i];
      }
      return false;
    }
    
    function post(data) {
      if(inDb(data)){
        console.log("in post", data);
        fauxDB.insert(data);
      } else return "already exists";
    }
    
    function inDb(user) {
      for(var i=0, len=users.length; i<len;i++){
        if(user.email === users[i].email) return false;
      }
      return true;
    }
    return {
      getAll: getAll,
      getOne: getOne,
      post: post,
      check: inDb
    }
  })