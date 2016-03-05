angular.module('app')
  .factory( 'issueFactory', [ '$http', function($http) {

    var getAll = function() {

      return $http({
        method: 'GET',
        url: '/api/issues'
      })
      .then( function (resp) {
        return resp.data;
      })
      .catch( function(err) {
        console.log( "issueFactory error:", err );
      });

    };

    return {
      getAll: getAll
    }

  }]);