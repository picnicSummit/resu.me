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
      views: {
        '': { templateUrl: '../views/companies.html' },
        'companyList@companies': {
          templateUrl: '../views/company-list.html',
          controller: 'CompaniesController'
        },
        'companyView@companies': {
          templateUrl: '../views/company-individual.html',
          controller: 'CompanyController'
        }
      }    
    });
        
});