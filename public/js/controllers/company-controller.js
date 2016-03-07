angular.module('app')
  .controller( 'CompanyController', [ '$scope', 'CompanyFactory', function( $scope, CompanyFactory ) {

    $scope.company = {};

    $scope.getData = function (name) {
      console.log(name);
      CompanyFactory.getCompany(name)
        .then( function(data) {
          $scope.company = data;
        })
        .catch( function(error) {
          console.error(error);
        });
    };

  }]);