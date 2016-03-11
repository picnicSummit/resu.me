angular.module('app')
  .factory('auth', ['$http', '$window', function($http, $window) {

    var auth = {};
    
    auth.saveToken = function(token) {
      console.log(token);
      $window.localStorage['job-hunt-token'] = JSON.stringify(token);
    };

    auth.getToken = function() {
      return $window.localStorage['job-hunt-token'];
    };

    auth.isLoggedIn = function() {
      var token = auth.getToken();
      if (token) {
        var payload = JSON.parse( $window.atob( token.split('.')[1]) );
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    auth.currentUser = function() {
      if ( auth.isLoggedIn() ) {
        var token = auth.getToken();
        var payload = JSON.parse( $window.atob( token.split('.')[1]) );
        return payload.username;
      }
    };

    auth.register = function(user) {
      return $http.post( '/register', user )
        .success(function(data) {
          auth.saveToken(data);
        });
    };

    auth.login = function(user) {
      return $http.post( '/login', user )
        .success(function(data) {
          auth.saveToken(data);
        });
    };

    auth.logOut = function() {
      $window.localStorage.removeItem('job-hunt-token');
    };

    return auth;

  }]);
