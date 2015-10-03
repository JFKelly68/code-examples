angular.module("BasicAngular")
	.directive('passVerify', function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			scope: {
			  passVerify: '='
			},
			link: function(scope, elem, attrs, ctrl) {
				scope.$watch(function() {
					return scope.passVerify + "_" + ctrl.$viewValue;
				}, function(value) {
					
					if(value){
						ctrl.$parsers.unshift(function(viewValue) {
							var pass = scope.passVerify;
							
							if (pass !== viewValue) {
							    ctrl.$setValidity("verify", false);
							    // "undefined" prevents the viewVal from interpolating to the model
							    return undefined;
							} 
							else {
							    ctrl.$setValidity("verify", true);
							    return viewValue;
							}
						});
					}
				})
			}
		}
	});