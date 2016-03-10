angular.module('app')
  .controller( 'CalendarController', ['$rootScope', '$sce', '$scope', 'CompanyFactory', function( $rootScope, $sce, $scope, CompanyFactory ) {

    if ($rootScope.currentCompany) {
      var company = $rootScope.currentCompany;
      var phone = new Date(company.dates.phone);
      var onsite = new Date(company.dates.onsite);
      $scope.phoneDate = phone;
      $scope.onsiteDate = onsite;
    }

    $scope.setPhoneDate = function(date) {
      console.log(date);
      $scope.phoneDate = null;
    };

    $scope.setOnsiteDate = function(date) {
      console.log(date);
      $scope.onsiteDate = null;
    };

  }]);