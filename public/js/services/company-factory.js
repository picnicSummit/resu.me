angular.module('app')
  .factory( 'CompanyFactory', [ '$http', function($http) {

    var getAll = function() {

      return $http({
        method: 'GET',
        url: '/api/companies'
      })
      .then( function (resp) {
        return resp.data;
      })
      .catch( function(err) {
        console.log( 'CompanyFactory error:', err );
      });

    };

    return {
      getAll: getAll
    };

  }]);