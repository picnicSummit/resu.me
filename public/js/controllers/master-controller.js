angular.module('app')
  .controller( 'MasterController', [ '$rootScope', '$scope', '$sce', 'CompanyFactory', function( $rootScope, $scope, $sce, CompanyFactory ) {

    $scope.companies = {};
    $scope.calendar;
    $scope.currentCompany;

  }]);