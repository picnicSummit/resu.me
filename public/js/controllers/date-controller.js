angular.module('app')
  .controller( 'DateController', ['$rootScope', '$scope', 'CompanyFactory', function( $rootScope, $scope, CompanyFactory ) {

    $scope.companyId;

    $rootScope.$on('showCompany', function(event, data) {
      $scope.companyId = data._id;
      $scope.applied = null;
      $scope.phoneDate = null;
      $scope.onsiteDate = null;
      if (data && data.status.applied) {
        $scope.applied = true;
      }
      if (data && data.dates) {
        if (data.dates.phone) {
          var phone = new Date(data.dates.phone);
          $scope.phoneDate = phone;
        }
        if (data.dates.onsite) {
          var onsite = new Date(data.dates.onsite);
          $scope.onsiteDate = onsite;
        }
      }
    });

    $scope.setPhoneDate = function(date) {
      CompanyFactory.setPhoneDate(date, $scope.companyId, 'phone');
    };

    $scope.setOnsiteDate = function(date) {
      CompanyFactory.setOnsiteDate(date, $scope.companyId, 'onsite');
    };

    $scope.applied = function() {
      console.log('hi');
      CompanyFactory.applied();
    };

  }]);