angular.module('app')
  .factory( 'CompanyFactory', ['$rootScope', '$http', '$window', function($rootScope, $http, $window) {

    var getAll = function() {
      console.log($window.localStorage['job-hunt-token']);
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

    var setPhoneDate = function(date, company, type, cb) {
      var userId = JSON.parse($window.localStorage['job-hunt-token']);
      console.log('hello');
      return $http({
        method: 'POST',
        url: '/api/' + userId.userId + '/companies/' + company + '/phone',
        data: {
          type: type,
          date: date
        }
      }).then(cb());
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

    var applyToCompany = function(id) {
      var userId = JSON.parse($window.localStorage['job-hunt-token']);
      return $http({
        method: 'POST',
        url: '/api/' + userId.userId + '/companies/' + id + '/applied',
      });
    };

    return {
      getAll: getAll,
      addCompany: addCompany,
      deleteCompany: deleteCompany,
      setPhoneDate: setPhoneDate,
      setOnsiteDate: setOnsiteDate,
      applyToCompany: applyToCompany
    };

  }]);