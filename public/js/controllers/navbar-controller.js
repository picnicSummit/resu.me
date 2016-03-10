angular.module('app')
  .controller( 'NavbarController', ['$scope', '$state', function( $scope, $state ) {

    $scope.setCompany = function() {
      $state.go('companies.view');
    };

    $scope.setCalendar = function() {
      $state.go('companies.calendar');
    };

    $scope.setCompany();
  }]);