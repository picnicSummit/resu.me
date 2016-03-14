angular.module('app')
  .controller( 'DatesController', ['$rootScope', '$scope', 'CompanyFactory', function( $rootScope, $scope, CompanyFactory ) {


    //Whenever the company selection changes, update the dates
    $scope.$watch('selection', function() {
      $scope.phoneDate = null;
      $scope.onsiteDate = null;

      if ($scope.selection.dates && $scope.selection.dates.phone) {
        var phone = new Date($scope.selection.dates.phone);
        $scope.phoneDate = phone;
      }

      if ($scope.selection.dates && $scope.selection.dates.onsite) {
        var onsite = new Date($scope.selection.dates.onsite);
        $scope.onsiteDate = onsite;
      }
    });

    $scope.setPhoneDate = function(date) {
      CompanyFactory.setPhoneDate(date, $scope.selection._id, 'phone', function() {
        $scope.getAll($scope.index);
      });
    };

    $scope.setOnsiteDate = function(date) {
      CompanyFactory.setOnsiteDate(date, $scope.selection._id, 'onsite');
      $scope.getAll($scope.index);
    };

  }]);