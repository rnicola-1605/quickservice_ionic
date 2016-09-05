angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.user = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.user.email, $scope.user.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Credenciais invalidas!',
                template: 'Tente novamente!'
            });
        });
    }
})

.controller('cadastroController', function($http, $scope, CadastroService, LoginService, $ionicPopup, $state){
    $scope.cadastro = {passo: 1, id_tipo_usuario: null, nome: null,
                       sobrenome: null, email: null, ddd_1: null,
                       telefone_1: null, ddd_2: null, celular_2: null,
                       senha:null, confirma_senha: null};

    $scope.passo_anterior = function(){
      if (!($scope.cadastro.passo <= 1))
          $scope.cadastro.passo -= 1;
    };

    $scope.proximo_passo = function(){
        $scope.cadastro.passo += 1;
    };

    $scope.cadastrar = function(){
        CadastroService.cadastro($scope.cadastro).success(function(data) {
            LoginService.loginUser($scope.cadastro.email, $scope.cadastro.senha).success(function(data) {
                $state.go('tab.dash');
            }).error(function(data){
                var alertPopup = $ionicPopup.alert({
                    title: 'Credenciais invalidas!',
                    template: 'Tente novamente!'
                });
            });
        }).error(function(mensagem){
            var msg_erro = "Tente novamente.";
            if (mensagem && mensagem != null){
                msg_erro = mensagem;
            }
            var alertPopup = $ionicPopup.alert({
                title: 'Erro ao cadastrar usuário.',
                template: msg_erro
            });
        });
    };
})

.controller('cadastrarServicoCtrl', function($http, $scope, $ionicConfig, $ionicLoading, $ionicActionSheet){
    console.log('cadastro_servico controller');
    $scope.lista_servicos = [];

    $ionicLoading.show({
      template: 'Buscando...'
    });

    $http.get('/json/tipos-servicos.json').success(function(response) {
      $scope.lista_servicos = response;
    }).then(function(){
      $ionicLoading.hide();
    });

    $scope.gerenciarCadastroServico = function(idServico, tituloServico, descricaoServico){
        console.log(idServico);
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
          buttons: [
            { text: 'Show Banner' },
            { text: 'Show Interstitial' }
          ],
          destructiveText: 'Remove Ads',
          titleText: 'Choose the ad to show',
          cancelText: 'Cancelar',
          cancel: function() {
            // add cancel code..
          },
          destructiveButtonClicked: function() {
            console.log("removing ads");
            AdMob.removeAds();
            return true;
          },
          buttonClicked: function(index, button) {
            if(button.text == 'Show Banner')
            {
              console.log("show banner");
              AdMob.showBanner();
            }

            if(button.text == 'Show Interstitial')
            {
              console.log("show interstitial");
              AdMob.showInterstitial();
            }

            return true;
          }
        });
    }
})

.controller('servicosCtrl', function($http, $scope){
    console.log('servico controller');
    $scope.servicos = {lista: []};
})

.controller('servicoDashCtrl', function($http, $scope, $ionicConfig) {
    console.log('dash_servico controller');
    $scope.lista_servicos = [];

    $http.get('/json/tipos-servicos.json').success(function(response) {
      $scope.lista_servicos = response;
    });
})

.controller('AuthController', function($scope, $ionicConfig) {
    console.log('auth cntroller');
})

.controller('DashCtrl', function($scope) {
    console.log('uau');
})

.controller('configuracaoCtrl',  function($scope, $location, $ionicConfig, $ionicLoading,
                                          $ionicActionSheet, LoginService, $state){
  // Triggered on a the logOut button click
  $scope.showDeslogarPopup = function() {
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        destructiveText: 'Deslogar',
        titleText: 'Tem certeza que deseja se deslogar do sistema?',
        cancelText: 'Cancelar',
        cancel: function() {
          return true;
        },
        buttonClicked: function(index) {
          //Called when one of the non-destructive buttons is clicked,
          //with the index of the button that was clicked and the button object.
          //Return true to close the action sheet, or false to keep it opened.
          return true;
        },
        destructiveButtonClicked: function(){
          //Called when the destructive button is clicked.
          //Return true to close the action sheet, or false to keep it opened.
          $ionicLoading.show({
            template: 'Deslogando...'
          });
          LoginService.deslogarUser();
          $ionicLoading.hide();
          $location.path("/login");
        }
      });
    };
})

.controller('MapController', function($scope, $cordovaGeolocation, $ionicLoading){
  ionic.Platform.ready(function(){
      $ionicLoading.show({
          template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Adquirindo localizacao!'
      });
       
      var posOptions = {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0
      };

      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
          var lat  = position.coords.latitude;
          var long = position.coords.longitude;
           
          var myLatlng = new google.maps.LatLng(lat, long);
           
          var mapOptions = {
              center: myLatlng,
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          };          
           
          var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
           
          $scope.map = map;   
          $ionicLoading.hide();           
           
      }, function(err) {
          $ionicLoading.hide();
          console.log(err);
      });
  });
})

.controller('MapaCtrl', function($scope, $cordovaGeolocation, $ionicLoading){
  ionic.Platform.ready(function(){
      $ionicLoading.show({
          template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Adquirindo localizacao!'
      });
       
      var posOptions = {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0
      };

      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
          var lat  = position.coords.latitude;
          var long = position.coords.longitude;
           
          var myLatlng = new google.maps.LatLng(lat, long);
           
          var mapOptions = {
              center: myLatlng,
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          };          
           
          var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
           
          $scope.map = map;   
          $ionicLoading.hide();           
           
      }, function(err) {
          $ionicLoading.hide();
          console.log(err);
      });
  });
})