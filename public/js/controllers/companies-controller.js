angular.module('app')
  .controller( 'CompaniesController', [ '$rootScope', '$scope', 'CompanyFactory', function( $rootScope, $scope, CompanyFactory ) {

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
      //console.log(name)// -- it worked
      CompanyFactory.getCompany(name)
        .catch( function(error) {
          console.error(error);
        });

    };

    $scope.addCompany = function(name) {
      CompanyFactory.addCompany(name)
        .catch( function(error) {
          console.error(error);
        });
    };
    
    $scope.getAll();

  }]);