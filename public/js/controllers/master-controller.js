angular.module('app')
  .controller( 'MasterController', [ '$rootScope', '$scope', '$sce', 'CompanyFactory', function( $rootScope, $scope, $sce, CompanyFactory ) {

    $scope.companies = {};
    $scope.calendar;
    $scope.googleLogin = function() {
      CompanyFactory.googleLogin()
        .then(function(data) {
          var piece = encodeURIComponent(data.result.items[0].id);
          var url = 'https://calendar.google.com/calendar/embed?src=' + piece;

          $scope.calendar = $sce.trustAsResourceUrl(url);

        });
    };

    $scope.googleLogin();
  }]);