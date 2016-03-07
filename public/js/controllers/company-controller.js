angular.module('app')
  .controller( 'CompanyController', ['$rootScope', '$scope', 'CompanyFactory', function( $rootScope, $scope, CompanyFactory ) {

    $scope.company;

    $rootScope.$on('showCompany', function(event, data) {
      console.log(data[0].name);
      $scope.company = data[0].name;
    });

  }]);