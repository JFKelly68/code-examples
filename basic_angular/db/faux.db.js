'use strict'
angular.module("BasicAngular")
  .factory("fauxDB", function ($firebaseArray) {
    var users = [
      {name:"James Kelly", email: "mrjamesfkelly@gmail.com"},
      {name:"Some Company", email: "company@work.com"},
      {name: "Test Name", email: 'test@gmail.com'}
    ];

    var ref = new Firebase("https://radiant-torch-6857.firebaseio.com/api/users");
    
    // function insert(user) {
    //   users.push(user);
    // }
    // return {
    //   users: users,
    //   insert: insert
    // }

    return $firebaseArray(ref);
  })