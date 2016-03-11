angular.module('app')
  .controller('NavigationController', [
    '$scope',
    'auth',

    function($scope, auth) {
      $scope.isLoggedIn = auth.isLoggedIn;
      $scope.currentUser = auth.currentUser;
      $scope.logOut = auth.logOut;

    }]);