angular.module("BasicAngular")
	.directive("userDisplay", function (resource) {
		return {
			restrict: "EA",
			templateUrl: "/components/directives/user_display/user_display.html",
			scope: {
				user: "=",
			},
			link: function(scope, elem, attrs) {
				
				scope.editable = false;

				scope.remove = function(target) {
					resource.destroy(target);
				};

				scope.edit = function() {
					scope.editable = true;
				};

				scope.save = function(update) {
					resource.put(update)
					.then(function(res) {
						console.log("Updated");
						scope.editable = false;
					});
				}
			}
		}
	})