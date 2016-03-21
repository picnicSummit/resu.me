angular.module('app')
.controller('ContactsController', ['$rootScope', '$scope', 'CompanyFactory', function($rootScope, $scope, CompanyFactory) {

  $scope.contacts = {};

  // $scope.selection.name;
  console.log('ID', $scope.selection._id);
  console.log('NAME', $scope.selection.name);

  // $scope.createContact = function(contacts, company) {
  //   console.log('inside contacts controller here');
  //   CompanyFactory.createContact(contacts, company)
  //     .then( function (data) {
  //       $scope.createContact( $scope.contacts.length );
  //       // selectDefaultTask(); 
  //     })
  //     .catch( function(error) {
  //       console.error(error);
  //     });
  // };
  $scope.createContact = function(contacts, company) {
    this.name = $scope.name,
    this.email = $scope.email,
    this.phoneNumber = $scope.phoneNumber,
    this.socialMedia = $scope.socialMedia,
    // this.title = $scope.title,
    // this.website = $scope.website
    console.log('clicked');
    console.log($scope.contacts);
    CompanyFactory.createContact($scope.contacts, $scope.selection.name, $scope.selection.email, $scope.selection.phoneNumber, $scope.selection.socialMedia);
  };
}]);