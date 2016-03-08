angular.module('app')
  .controller( 'CompanyController', ['$rootScope', '$scope', 'CompanyFactory', function( $rootScope, $scope, CompanyFactory ) {

    $scope.company;

    $scope.index = [];

    $rootScope.$on('showCompany', function(event, data) {
      console.log(data[0].name);
      $scope.company = data[0].name;
      for (var key in data[0]) {
        if (key !== 'company') {
          
        }
      }
    });

  }]);