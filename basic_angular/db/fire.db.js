'use strict'
angular.module("BasicAngular")
  .factory("fireDB", function ($firebaseArray) {

    var ref = new Firebase("https://radiant-torch-6857.firebaseio.com/api/users");

    return $firebaseArray(ref);
  })