angular.module('app')
  .controller( 'CompaniesController', [ '$scope', 'CompanyFactory', function( $scope, CompanyFactory ) {

    $scope.companies = {};

    $scope.getAll = function () {

      CompanyFactory.getAll()
        .then( function(data) {
          $scope.companies = data;
        })
        .catch( function(error) {
          console.error(error);
        });
    };

    $scope.getCompany = function(name) {

      CompanyFactory.getCompany(name)
        .catch( function(error) {
          console.error(error);
        });
    };

    $scope.getAll();

  }]);