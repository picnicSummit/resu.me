angular.module('app')
  .controller( 'CompanyController', ['$rootScope', '$scope', 'CompanyFactory', function( $rootScope, $scope, CompanyFactory ) {

    $scope.company;

    $scope.status = [];

    $rootScope.$on('showCompany', function(event, data) {
      $scope.company = data[0].name;
      var status = data[0].status;

      for (var key in status) {
        if (status[key] === true) {
          $scope.status.push({
            value: key,
            type: 'success'
          });
        } else {
          $scope.status.push({
            value: key,
            type: 'danger'
          });
        }
      }
      console.log($scope.status);
    });

  }]);