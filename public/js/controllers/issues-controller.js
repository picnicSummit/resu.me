angular.module('app')
  .controller( "IssuesController", [ '$scope', 'issueFactory', function( $scope, issueFactory ) {

    $scope.companies = {};

    $scope.getData = function () {

      issueFactory.getAll()
        .then( function(data) {
          $scope.companies = data;
        })
        .catch( function(error) {
          console.error(error);
        });
    };

    $scope.getData();

  }]);