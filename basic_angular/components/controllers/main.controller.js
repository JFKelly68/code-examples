angular.module("BasicAngular")
  .controller("MainCtrl", function ($scope, resource) {
  // a main reason for 'vm' is preemptively avoiding 'this' scoping/binding issues
  // we also don't have to inject $scope except to use it's methods (.$on/.$watch)
  // seems to more preferential vs functional:
    // http://www.johnpapa.net/angularjss-controller-as-and-the-vm-variable/
    var vm = this;
    
    // this val used in child scope, Users
    vm.exampleVal = "Show the users / emails";
    
    vm.users = resource.getAll();
    
    vm.reset = function(form) {
      if(form){
        form.$setPristine();
        form.$setUntouched();
      }
      vm.user = {};
    }
    
    vm.submit = function(user){
      resource.post({
        name: user.name,
        email: user.email
      });
      
      vm.reset();
    }
    
    // This need for a function is a quirk/bug with the Controller As/vm syntax
    // it won't work if we simply pass in vm.user
    $scope.$watchCollection(function(){return vm.user}, function(newVal, oldVal){
      vm.watchObj = newVal;
    })
    
    
    // this is for the loader that is demostrating ui-router's 'resolve' fxn
    $scope.$on('$stateChangeStart', function(event, toState) {
      var elem = document.getElementById('child-view')
      angular.element(elem).html("<h4>Loading...</h4><div>Delaying to show 'resolve'...</div>")
    })
  })