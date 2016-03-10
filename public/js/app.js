var app = angular.module( 'app', ['ui.router', 'ui.bootstrap'] );

app.config( function( $stateProvider, $urlRouterProvider ) {
    
  $urlRouterProvider.otherwise('/home');
    
  $stateProvider
        
    .state('home', {
      url: '/home',
      templateUrl: '../views/home.html'
    })

    //declare COMPANIES page state with static templates navbar & companylist    
    .state('companies', {
      url: '/companies',
      views: {
        '': { 
          templateUrl: '../views/companies.html',
        },
        'companyList@companies': {
          templateUrl: '../views/company-list.html',
          controller: 'CompaniesController'
        },
        'navBar@companies': {
          templateUrl: '../views/navbar.html',
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
        $scope.data = 'resume';
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
    })

    //nested DATES view with custom controller
    .state('companies.dates', {
      url: '/dates',
      templateUrl: '../views/dates.html',
      controller: 'CalendarController'
    }) 

    //LOGIN page
    .state('login', {
      url: '/login',
      templateUrl: '../views/login.html',
      controller: 'AuthController'
      // onEnter: ['$state', 'auth', function($state, auth) {
      //   if (auth.isLoggedIn()) {
      //     $state.go('companies');
      //   }
      // }]
    })

    //REGISTER page
    .state('register', {
      url: '/register',
      templateUrl: '../views/register.html',
      controller: 'AuthController'
      // onEnter: ['$state', 'auth', function($state, auth){
      //   if (auth.isLoggedIn()) {
      //     $state.go('companies');
      //   }
      // }]
    });
});