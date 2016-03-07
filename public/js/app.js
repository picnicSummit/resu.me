var app = angular.module( 'app', ['ui.router'] );

app.config( function( $stateProvider, $urlRouterProvider ) {
    
  $urlRouterProvider.otherwise('/home');
    
  $stateProvider
        
    .state('home', {
      url: '/home',
      templateUrl: '../views/home.html'
    })
        
    .state('companies', {
      url: '/companies',
      templateUrl: '../views/companies.html'      
    });
        
});
