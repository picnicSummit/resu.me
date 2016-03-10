angular.module('app')
  .factory( 'CompanyFactory', ['$rootScope', '$http', function($rootScope, $http) {

    var firstCompany;

    var getAll = function() {

      return $http({
        method: 'GET',
        url: '/api/companies'
      })
      .then( function (resp) {
        $rootScope.$emit('showCompany', resp.data);
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

    var addCompany = function(name) {
      return $http({
        method: 'POST',
        url: '/api/companies',
        data: { name }
      });
    };

    var getCalendar = function() {
      return gapi.client.request({
        path: 'https://www.googleapis.com/calendar/v3/users/me/calendarList'
      });
    };

    var deleteCompany = function(id) {
      console.log('------factory id-----', id);
      return $http({
        method: 'DELETE',
        url: '/api/companies/' + id
      });
    };

    return {
      getAll: getAll,
      addCompany: addCompany,
      getCalendar: getCalendar,
      deleteCompany: deleteCompany,
      getCompany: getCompany

    };

  }]);