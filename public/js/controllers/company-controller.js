angular.module('app')
  .controller( 'CompanyController', ['$rootScope', '$sce', '$scope', 'CompanyFactory', function( $rootScope, $sce, $scope, CompanyFactory ) {


    $scope.status = [];
    $scope.companyName;
    $scope.calendar = '';
    $scope.companies;


    $scope.statusParser = function(data) {
      console.log(data);
      $scope.companyName = data.name;
      var status = data.status;
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
      $scope.companyName = null;
      if (data) {
        $scope.statusParser(data);
      }
    });

  }]);