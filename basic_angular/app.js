'use strict'
angular.module("BasicAngular", 
  [
    "ui.router",
    "firebase"
  ])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(true);
    
    $stateProvider
      .state("main", {
        url: "/",
        templateUrl: "components/views/user_signup.html",
        controller: "MainCtrl",
        controllerAs: "MC"
      })

      .state("main.users", {
        url: "",
        templateUrl: 'components/views/user_list.html',
        resolve: {
          users: function(resource, $q, $timeout) {
            var userAsync = $q.defer();
            
            $timeout(function() {
              var u = resource.getAll()
              if(u) userAsync.resolve(u);
              else userAsync.reject();
            }, 1000);
            
            return userAsync.promise
          }
        },
        controller: 'UsersCtrl',
        controllerAs: "UC"
      })

      .state("main.else", {
        url: "",
        template: '<h1>Other view</h1><div ng-repeat="thing in things">{{thing}}</div>',
        controller: function($scope) {
          $scope.things = ["These", "are", "things"];
        }
      })
  })
  