'use strict'
angular.module("BasicAngular")
  .factory("resource", function($timeout, fireDB) {

    var users; 

    fireDB.$loaded()
    .then(function(list) {
      users = list;
    })
    .catch(function(e) {
      console.log("Error: ", e)
    });
    
    function getAll() {
      return fireDB;
    }
    
    function getOne(target) {
      return fireDB.$getRecord(target);
    }
    
    function post(data) {
      return fireDB.$add(data)
      .then(function(ref) {
        console.log("User added");
        return ref.key();
      });
    }
    
    function put(target) {
      return fireDB.$save(target)
      .then(function(ref) {
        return ref.key();
      })
      .catch(function(e) {
        return e;
      })
    }

    function destroy(target) {
      return fireDB.$remove(target)
      .then(function(ref) {
        console.log("Deleted")
      })
      .catch(function(e) {
        return e;
      });
    }
    

    return {
      getAll: getAll,
      getOne: getOne,
      post: post,
      put: put,
      destroy: destroy
      // check: inDb
    }
  })