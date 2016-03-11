angular.module('app')
  .controller('AuthController', [

    '$scope',
    '$state',
    'auth',

    function($scope, $state, auth) {
      $scope.user = {};

      $scope.register = function() {
        console.log('----------------inside register----------', $scope.user);
        auth.register($scope.user)
        .error(function(error) {
          $scope.error = error;
        })
        .then(function() {
          $state.go('companies');
        });
      };

      $scope.login = function() {
        auth.login($scope.user)
        .error(function(error) {
          $scope.error = error;
        })
        .then(function() {
          $state.go('companies');
        });
      };

    }]);