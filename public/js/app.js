var app = angular.module( 'app', ['ui.router', 'ui.bootstrap'] );

app.config( function( $stateProvider, $urlRouterProvider ) {
    
  $urlRouterProvider.otherwise('/home');
    
  $stateProvider
        
    .state('home', {
      url: '/home',
      templateUrl: '../views/home.html'
    })

    // nested COMPANIES view
    
    .state('companies', {
      url: '/companies',
      views: {
        '': { 
          templateUrl: '../views/companies.html',
          controller: 'CompaniesController',
        },
        'company-details@companies': {
          templateUrl: '../views/company.html'
        }
      }    
    })


    // nested TASK views...

    .state('companies.resume', {
      templateUrl: '../views/tasks-resume.html'
    })

    .state('companies.cover-letter', {
      templateUrl: '../views/tasks-coverletter.html'
    })

    .state('companies.research', {
      templateUrl: '../views/tasks-research.html'
    })

    .state('companies.contacts', {
      templateUrl: '../views/tasks-contacts.html'
    })

    .state('companies.dates', {
      templateUrl: '../views/tasks-dates.html',
      controller: 'DatesController'
    })
    

    //LOGIN page
    .state('login', {
      url: '/login',
      templateUrl: '../views/login.html',
      controller: 'AuthController',
      onEnter: ['$state', 'auth', function($state, auth) {
        if (auth.isLoggedIn()) {
          $state.go('companies');
        }
      }]
    })

    //REGISTER page
    .state('register', {
      url: '/register',
      templateUrl: '../views/register.html',
      controller: 'AuthController',
      onEnter: ['$state', 'auth', function($state, auth) {
        if (auth.isLoggedIn()) {
          $state.go('companies');
        }
      }]
    });
    
});