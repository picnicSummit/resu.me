angular.module('app')
.controller('ContactsController', ['$rootScope', '$scope', 'CompanyFactory', function($rootScope, $scope, CompanyFactory) {

  $scope.newContact = {};
  console.log('hi');

  $scope.addContact = function() {
    this.name = $scope.name,
    this.email = $scope.email,
    this.socialmedia = $scope.socialmedia,
    this.title = $scope.title,
    console.log($scope.newContact);
    console.log('clicked');
  };
}]);