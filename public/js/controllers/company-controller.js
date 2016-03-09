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


    $scope.googleLogin = function() {
      CompanyFactory.googleLogin()
        .then(function(data) {
          $scope.calendar = 'bleargh';
          console.log(data);
        });
    };

    // $rootScope.$on('showCalendar', function(event, data) {
    //   $scope.calendar = 'poopypants'; 
    //  //  $sce.trustAsResourceUrl("https://calendar.google.com/calendar/embed?src=telegraphacademy.com_sjdmvde3rdbc1b2kli4c2hb864%40group.calendar.google.com&ctz=America/Los_Angeles");
    //  // // console.log($scope.calendar);
    // });

    $rootScope.$on('showCompany', function(event, data) {
      $scope.status = [];

      $scope.statusParser(data);
      $scope.companyName = data[0].name;
    });

  }]);