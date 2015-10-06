angular.module("BasicAngular")
  .controller("MainCtrl", function ($scope, resource) {

    // models
    angular.extend(this, {
      exampleVal: "Show the users / emails",
      users: resource.getAll(),
    });

    // methods
    angular.extend(this, {
      reset: reset,
      submit: submit
    })


    // This need for a function (vs just "this.user") is a quirk/bug with the Controller As syntax
    // I like the .extend pattern, but these "special" cases where binding to "this" becomes a hassle. 
    // Might be better/easier in these cases to use the "var vm = this".
    $scope.$watch(angular.bind(this, function() {
        return this.user
      }), 
      angular.bind(this, function(newVal, oldVal){
        // simply shows how the $watch works with controllerAs
        // the result can be seen in the "under the hood" <pre> box
        this.watchObj = newVal;
      })
    );
    
    
    // this is for the loader that is demostrating ui-router's 'resolve' fxn
    $scope.$on('$stateChangeStart', function(event, toState) {
      var elem = document.getElementById('child-view')
      angular.element(elem).html("<h4>Loading state:" + toState.name + "...</h4>"
                                +"<div>Delaying to show 'resolve'...</div>")
    })
  });


  /*** PRIVATE ***/
    function reset (form) {
      if(form){
        form.$setPristine();
        form.$setUntouched();
      }

      this.user = {};
    }

    function submit (user){
      resource.post({
        name: user.name,
        email: user.email
      });

      this.reset();
    };


