'use strict'
angular.module("BasicAngular")
  .factory("fauxDB", function() {
    var users = [
      {name:"James Kelly", email: "mrjamesfkelly@gmail.com"},
      {name:"Some Company", email: "company@work.com"},
      {name: "Test Name", email: 'test@gmail.com'}
    ];
    
    function insert(user) {
      users.push(user);
    }
    return {
      users: users,
      insert: insert
    }
  })