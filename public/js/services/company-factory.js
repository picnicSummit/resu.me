angular.module('app')
  .factory( 'CompanyFactory', ['$rootScope', '$http', '$window', function($rootScope, $http, $window) {

    var getAll = function() {
      var userId = JSON.parse($window.localStorage['job-hunt-token']);

      return $http({
        method: 'GET',
        url: '/api/' + userId.userId + '/companies/'
      })
      .then( function (resp) {
        return resp.data;
      })
      .catch( function(err) {
        console.log( 'CompanyFactory error:', err );
      });

    };
    var getCompany = function(name) {
      var userId = JSON.parse($window.localStorage['job-hunt-token']);
      return $http({
        method: 'GET',
        url: '/api/' + userId.userId + '/companies/' + name
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
        url: '/api/' + userId.userId + '/companies',
        data: { 
          name: name,
          status: {
            accepted: false,
            offer: false, 
            onsite: false,
            phone: false,
            applied: false
          }
        }
      });
    };

    var deleteCompany = function(id) {
      console.log('------factory id-----', id);
      var userId = JSON.parse($window.localStorage['job-hunt-token']);
      return $http({
        method: 'DELETE',
        url: '/api/' + userId.userId + '/companies/' + id
      });
    };

    var setPhoneDate = function(date, company, type) {
      var userId = JSON.parse($window.localStorage['job-hunt-token']);
      return $http({
        method: 'POST',
        url: '/api/' + userId.userId + '/companies/' + company + '/phone',
        data: {
          type: type,
          date: date
        }
      });
    };

    var setOnsiteDate = function(date, company, type) {
      var userId = JSON.parse($window.localStorage['job-hunt-token']);
      return $http({
        method: 'POST',
        url: '/api/' + userId.userId + '/companies/' + company + '/onsite',
        data: {
          type: type,
          date: date
        }
      });
    };

    var applied = function() {
      var userId = JSON.parse($window.localStorage['job-hunt-token']);
      var company = company.name.toString();
      return $http({
        method: 'POST',
        url: '/api/' + userId.userId + '/companies/' + company + '/applied',
      });
    };

    var appliedToCompany = function(id) {
      console.log('-----inside company Factory -------');
      var userId = JSON.parse($window.localStorage['job-hunt-token']);
      var companyName = company.name.toString();
      return $http({
        method: 'POST',
        url: '/api/' + userId.userId + '/companies/' + companyName + '/applied',
        data: { 
          status: {
            applied: true
          }
        }
      });
    };

    return {
      getAll: getAll,
      addCompany: addCompany,
      deleteCompany: deleteCompany,
      getCompany: getCompany,
      setPhoneDate: setPhoneDate,
      setOnsiteDate: setOnsiteDate,
      appliedToCompany: appliedToCompany,
      applied: applied

    };

  }]);