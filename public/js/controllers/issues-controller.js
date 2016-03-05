angular.module('app')
  .controller( "IssuesController", [ '$scope', 'issueFactory', function( $scope, issueFactory ) {

    $scope.issues = {};

    $scope.getData = function () {

      issueFactory.getAll()
        .then( function(data) {
          $scope.issues = data;
        })
        .catch( function(error) {
          console.error(error);
        });
    };

    $scope.getData();

  }]);