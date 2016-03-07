angular.module('app')
  .controller( 'CompanyController', [ '$scope', 'CompanyFactory', function( $scope, CompanyFactory ) {

    $scope.companies = {};

    $scope.getData = function () {

      CompanyFactory.getAll()
        .then( function(data) {
          $scope.companies = data;
        })
        .catch( function(error) {
          console.error(error);
        });
    };

    $scope.getData();

  }]);