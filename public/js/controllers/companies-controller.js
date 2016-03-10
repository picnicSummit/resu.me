angular.module('app')
  .controller( 'CompaniesController', [ '$rootScope', '$scope', 'CompanyFactory', function( $rootScope, $scope, CompanyFactory ) {

    $scope.companies;

    $scope.getAll = function () {

      CompanyFactory.getAll()
        .then( function(data) {
          console.log(data);
          $scope.companies = data;
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

      if ( !confirm('Are you sure you want to delete this company?') ) {
        return;
      }
      //console.log(id);
      CompanyFactory.deleteCompany(id)
        .catch( function(error) {
          console.error(error);
        });
        
      $scope.getAll();

    };

    $scope.appliedToCompany = function() {

    };
    
    $scope.getAll();

  }]);