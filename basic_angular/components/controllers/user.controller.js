angular.module("BasicAngular")
	.controller("UsersCtrl", function ($scope, $rootScope, resource, users) {
	    var vm = this;
	    vm.users = users;
	          
	    vm.test = function() { resource.getAllAsync() }
	    vm.exampleVal = "\{\{MC.exampleVal\}\} versus \{\{UC.exampleVal\}\}"
	          
	})