angular.module('app')
  .controller( 'NavbarController', ['$scope', '$state', function( $scope, $state ) {

    $scope.setCompany = function() {
      $state.transitionTo('view');
    };

    $scope.setCalendar = function() {
      $state.transitionTo('calendar');
    };
  }]);