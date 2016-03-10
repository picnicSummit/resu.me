angular.module('app')
  .controller( 'CompanyController', ['$rootScope', '$sce', '$scope', 'CompanyFactory', function( $rootScope, $sce, $scope, CompanyFactory ) {

    $scope.status = [];
    $scope.companyName;

    $scope.statusParser = function(data) {
      $scope.companyName = data.name;
      $rootScope.currentCompany = data;
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

    $rootScope.$on('showCompany', function(event, name) {
      $scope.status = [];
      for (var i = 0; i < $rootScope.companies.length; i++) {
        if ($rootScope.companies[i].name === name) {
          $scope.statusParser($rootScope.companies[i]);
        }
      }
      $scope.companyName = name;
    });

    $scope.statusParser($rootScope.companies[0]);

  }]);