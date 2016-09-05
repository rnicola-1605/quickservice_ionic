// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngRoute', 'ngMessages'])

.constant('apiEndPoint', {
  url: 'http://localhost:8100/api'
})

.run(["$rootScope", "$location", "$ionicPlatform", function($rootScope, $location, $ionicPlatform) {

  $rootScope.dadosSession = {nome: localStorage.getItem("nomeUser"),
                             tipo_usuario: localStorage.getItem("tipoUser"),
                             id_usuario: localStorage.getItem("idUser")};

  $rootScope.$on("$routeChangeSuccess", function(userInfo) {
    console.log(userInfo);
  });

  $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
      if (eventObj.authenticated === false) {
          $location.path("/login");
      }
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

}])


.config(function($stateProvider, $urlRouterProvider, $routeProvider, $httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $routeProvider.when("/tab/dash", {
    templateUrl: "templates/tab-dash.html",
    controller: "DashCtrl",
    resolve: {
      auth: ["$q", "LoginService", function($q, LoginService) {
          var dadosUsuario = null;
          if (localStorage.getItem("dadosUsuario"))
              dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));
          if (dadosUsuario) {
              return $q.when(dadosUsuario);
          } else {
              return $q.reject({ authenticated: false });
          }
      }]
    }
  });

  $routeProvider.when("/tab/dash-cliente", {
    templateUrl: "templates/tab-dash-cliente.html",
    controller: "DashCtrl",
    resolve: {
      auth: ["$q", "LoginService", function($q, LoginService) {
          var dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));
          if (dadosUsuario) {
              return $q.when(dadosUsuario);
          } else {
              return $q.reject({ authenticated: false });
          }
      }]
    }
  });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('auth', {
    url: '/auth',
    templateUrl: 'templates/auth.html',
    abstract: true,
    controller: 'AuthController'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('auth.novo_cadastro', {
    url: '/novo_cadastro',
    templateUrl: 'templates/novo_cadastro.html',
    controller: 'cadastroController'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.dash-cliente', {
    url: '/dash-cliente',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-dash-cliente.html',
        controller: 'servicoDashCtrl'
      }
    }
  })

  .state('tab.mapa', {
    url: '/mapa',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-mapa.html',
        controller: 'MapaCtrl' 
        }
      }
  })

  .state('tab.cadastrar_servico', {
    url: '/cadastrar_servico',
    views: {
      'menuContent': {
        templateUrl: 'templates/cadastrar_servico.html',
        controller: 'cadastrarServicoCtrl'
      }
    }
  })

  .state('tab.meus_servicos', {
    url: '/meus_servicos',
    views: {
      'menuContent': {
        templateUrl: 'templates/meus_servicos.html',
        controller: 'servicosCtrl'
      }
    }
  })

  .state('tab.configuracao', {
    url: '/configuracao',
    views: {
      'menuContent': {
        templateUrl: 'templates/configuracao.html',
        controller: 'configuracaoCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
