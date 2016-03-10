angular.module('app')
  .controller('AuthController', [

    '$scope',
    '$state',
    'auth',

    function($scope, $state, auth) {
      $scope.user = {};

      $scope.register = function() {
        console.log('----------------inside register----------');
        auth.register($scope.user)
        .error(function(error) {
          $scope.error = error;
        })
        .then(function() {
          $state.go('companies');
        });
      };

      $scope.logIn = function() {
        auth.logIn($scope.user)
        .error(function(error) {
          $scope.error = error;
        })
        .then(function() {
          $state.go('companies');
        });
      };

    }]);