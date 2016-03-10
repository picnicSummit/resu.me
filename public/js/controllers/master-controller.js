angular.module('app')
  .controller( 'MasterController', [ '$rootScope', '$scope', 'CompanyFactory', function( $rootScope, $scope, CompanyFactory ) {

    $scope.companies = {};

  }]);