var app = angular.module( 'app', ['ui.router', 'ui.bootstrap'] );

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
    })

     // nested RESUME view with custom controller
    .state('companies.resume', {
      url: '/resume',
      templateUrl: '../views/resume.html',
      controller: function($scope) {
        $scope.data = 'this is our resume';
      }
    })

     // nested COVER LETTER view with custom controller
    .state('companies.cover-letter', {
      url: '/cover-letter',
      templateUrl: '../views/cover-letter.html',
      controller: function($scope) {
        $scope.data = 'this is our cover letter';
      }
    })

     // nested RESEARCH view with custom controller
    .state('companies.research', {
      url: '/research',
      templateUrl: '../views/research.html',
      controller: function($scope) {
        $scope.data = 'this is our research';
      }
    })

     // nested CONTACTS view with custom controller
    .state('companies.contacts', {
      url: '/contacts',
      templateUrl: '../views/contacts.html',
      controller: function($scope) {
        $scope.data = 'these are our contacts';
      }
    });
        
});