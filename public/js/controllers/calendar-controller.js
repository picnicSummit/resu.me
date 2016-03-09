angular.module('app')
  .controller( 'CalendarController', ['$rootScope', '$sce', '$scope', 'CompanyFactory', function( $rootScope, $sce, $scope, CompanyFactory ) {

  	$scope.calendar;
	$scope.googleLogin = function() {
      CompanyFactory.googleLogin()
        .then(function(data) {
          var piece = encodeURIComponent(data.result.items[0].id);
          var url = "https://calendar.google.com/calendar/embed?src=" + piece;
          console.log(url);

          $scope.calendar = $sce.trustAsResourceUrl(url);

        });
    };
    window.setTimeout($scope.googleLogin,100);

  }]);