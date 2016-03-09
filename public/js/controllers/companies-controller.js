angular.module('app')
  .controller( 'CompaniesController', [ '$rootScope', '$scope', 'CompanyFactory', function( $rootScope, $scope, CompanyFactory ) {

    $scope.companies = {};

    $scope.getAll = function () {

      CompanyFactory.getAll()
        .then( function(data) {
          $scope.companies = data;
          console.log($scope.companies);
        })
        .catch( function(error) {
          console.error(error);
        });
    };

    $scope.getCompany = function(name) {
      // console.log(name);// -- it worked
      CompanyFactory.getCompany(name)
        .catch( function(error) {
          console.error(error);
        });

    };

    $scope.addCompany = function(name) {
      // console.log(name);
      if ( name === '') {
        return;
      }

      CompanyFactory.addCompany(name)
        .then( function (data) {
          $scope.name = '';
        })
        .catch( function(error) {
          console.error(error);
        });
      $scope.getAll();
    };

    $scope.deleteCompany = function(id) {
      console.log('---------Company Factory--------', id);
      CompanyFactory.deleteCompany(id)
        .catch( function(error) {
          console.error(error);
        });
      $scope.getAll();
    };

    $scope.getAll();

  }]);