angular.module('app')
  .controller( 'CompaniesController', [ '$scope', '$timeout', 'CompanyFactory', function( $scope, $timeout, CompanyFactory ) {

    $scope.companies;
    $scope.selection;
    $scope.index;

    $scope.getAll = function( pendingAdd ) {

      CompanyFactory.getAll()
        .then( function(data) {
          $scope.companies = data.companies;
          $scope.selectDefault( pendingAdd );
        })
        .catch( function(error) {
          console.error(error);
        });
    };

    // set selected company (list item)
    $scope.select = function( company ) {
      $scope.selection = company;
    };

    // first company selected by default unless a new
    // company has just been added (then select that)
    $scope.selectDefault = function( companyIndex ) {

      if ( companyIndex ) {
        $scope.selection = $scope.companies[ companyIndex ];
        $scope.index = companyIndex;
      } else {
        $scope.selection = $scope.companies[0];
      }
    };


    $scope.addCompany = function(name) {

      CompanyFactory.addCompany(name)
        .then( function (data) {
          $scope.getAll( $scope.companies.length );
        })
        .catch( function(error) {
          console.error(error);
        });
    };


    $scope.deleteCompany = function(id) {

      if ( !confirm('Are you sure you want to delete this company?') ) {
        return;
      }
      //console.log(id);
      CompanyFactory.deleteCompany(id)
        .catch( function(error) {
          console.error(error);
        });
        
      $scope.getAll();
    };

    
    /******************************************
    // Research if this is still used anywhere
    ******************************************/

    // HACK: forcing #defaultTask click event
    // inits nested view AND $scope.currentTask
    
    var selectDefaultTask = function () {
      $timeout( function() {
        var node = document.querySelector('#defaultTask');
        angular.element(node).triggerHandler('click');
      }, 100);
    };

    $scope.getAll();
    selectDefaultTask();

  }]);