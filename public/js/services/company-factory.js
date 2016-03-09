angular.module('app')
  .factory( 'CompanyFactory', ['$rootScope', '$http', function($rootScope, $http) {

    var calendar;

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

    var googleLogin = function() {
      return gapi.auth.authorize({
        client_id: '503303984200-f38p65l8hpn7jjhjojng1f2knss5unv0.apps.googleusercontent.com',
        immediate: false,
        scope: 'https://www.googleapis.com/auth/calendar'
      })
        .then(getCalendar)
        .then(function(data) {
          return data;
      });
    };

    return {
      getAll: getAll,
      getCompany: getCompany,
      addCompany: addCompany,
      getCalendar: getCalendar,
      googleLogin: googleLogin,
      calendar: calendar
    };

  }]);