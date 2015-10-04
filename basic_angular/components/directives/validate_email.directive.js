angular.module("BasicAngular")
  .directive("emailValid", function(resource, $q, $timeout) {
    return {
      restrict: "A",
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl){
          ctrl.$asyncValidators.emailInvalid = function(mVal, vVal) {
            // empty mVal === valid
            if(ctrl.$isEmpty(mVal)) return $q.when();
            
            var test = $q.defer()
            
            // $timeout to simulate req/res loop
            $timeout(function() {
              if(resource.getOne(mVal)) {
                test.reject();
              }
              else test.resolve();
            }, 2000)
            return test.promise;
          }
        }
    }
  })