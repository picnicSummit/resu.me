angular.module('app')
  .controller( 'CompanyController', ['$rootScope', '$sce', '$scope', 'CompanyFactory', function( $rootScope, $sce, $scope, CompanyFactory ) {


    $scope.status = [];
    $scope.companyName;
    $scope.calendar = '';


    $scope.statusParser = function(data) {
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
    };


    $rootScope.$on('showCompany', function(event, data) {
      $scope.status = [];

      $scope.statusParser(data);
      $scope.companyName = data[0].name;
    });

  }]);