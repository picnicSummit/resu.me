angular.module('app')
  .factory( 'CompanyFactory', ['$rootScope', '$http', '$window', function($rootScope, $http, $window) {

    if ($window.localStorage['job-hunt-token']) {

    }

    var getAll = function() {
      var userId = JSON.parse($window.localStorage['job-hunt-token']);

      return $http({
        method: 'GET',
        url: '/api/companies/' + userId.userId,
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
      var userId = JSON.parse($window.localStorage['job-hunt-token']);
      console.log('inside addcompah', userId.userId);

      return $http({
        method: 'POST',
        url: '/api/companies',
        data: { 
          name: name,
          _creator: userId.userId,
          status: {
            applied: false,
            phone: false,
            onsite: false,
            offer: false,
            accepted: false 
          }
        }
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