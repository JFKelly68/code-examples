angular.module("BasicAngular")
	.directive("userDisplay", function() {
		return {
			restrict: "EA",
			templateUrl: "/components/directives/user_display/user_display.html",
			scope: {
				user: "="
			}
		}
	})