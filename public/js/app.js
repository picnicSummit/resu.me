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
          controller: 'MasterController'
        },
        'companyList@companies': {
          templateUrl: '../views/company-list.html',
          controller: 'CompaniesController'
        },
        'navBar@companies': {
          templateUrl: '../views/navbar.html',
          controller: 'NavbarController'
        }
      }    
    })

    //nested CALENDAR state inside of COMPANIES
    .state('companies.calendar', {
      url: '/calendar',
      templateUrl: '../views/calendar.html',
      controller: 'CalendarController'
    })

    //nested COMPANY-VIEW state inside of companies
    //ndividual company with static template taskbar
    .state('companies.view', {
      url: '/company-view',
      views: {
        '': { 
          templateUrl: '../views/company-individual.html',
          controller: 'CompanyController'
        },
        'taskBar@companies.view': { templateUrl: '../views/taskbar.html'}
      },
    })
     // nested RESUME view with custom controller
    .state('companies.view.resume', {
      url: '/resume',
      templateUrl: '../views/resume.html',
      controller: function($scope) {
        $scope.data = 'this is our resume';
      }
    })

     // nested COVER LETTER view with custom controller
    .state('companies.view.cover-letter', {
      url: '/cover-letter',
      templateUrl: '../views/cover-letter.html',
      controller: function($scope) {
        $scope.data = 'this is our cover letter';
      }
    })

     // nested RESEARCH view with custom controller
    .state('companies.view.research', {
      url: '/research',
      templateUrl: '../views/research.html',
      controller: function($scope) {
        $scope.data = 'this is our research';
      }
    })

     // nested CONTACTS view with custom controller
    .state('companies.view.`contacts', {
      url: '/contacts',
      templateUrl: '../views/contacts.html',
      controller: function($scope) {
        $scope.data = 'these are our contacts';
      }
    });
        
});