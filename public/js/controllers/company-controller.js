angular.module('app')
  .controller( 'CompanyController', ['$rootScope', '$sce', '$scope', 'CompanyFactory', function( $rootScope, $sce, $scope, CompanyFactory ) {


    $scope.status = [];
    $scope.companyName;
    $scope.calendar;


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

    $scope.googleLogin = function() {
      CompanyFactory.googleLogin()
        .then(function(data) {
          var piece = encodeURIComponent(data.result.items[0].id);
          var url = "https://calendar.google.com/calendar/embed?src=" + piece;
          console.log(url);

          $scope.calendar = $sce.trustAsResourceUrl(url);

        });
    };

    $rootScope.$on('showCompany', function(event, data) {
      $scope.status = [];

      $scope.statusParser(data);
      $scope.companyName = data[0].name;
    });

    window.setTimeout($scope.googleLogin,1);

  }]);