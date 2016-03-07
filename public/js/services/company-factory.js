angular.module('app')
  .factory( 'CompanyFactory', ['$rootScope', '$http', function($rootScope, $http) {

    var companyData = {
      data: 'There'
    };

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

    var getCompany = function(name) {
      return $http({
        method: 'GET',
        url: '/api/companies/' + name
      })
      .then( function (resp) {
        $rootScope.$emit('showCompany', resp.data);
      })
      .catch( function(err) {
        console.log( 'CompanyFactory error:', err );
      });

    };

    return {
      getAll: getAll,
      getCompany: getCompany,
      companyData: companyData
    };

  }]);