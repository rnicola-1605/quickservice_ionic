angular.module('starter.factories', [])

.factory('sessionFactory', function($http, $scope){
    return {
            sessionFact: function(id, nome, id_tipo){
                var idUser = null;
                var nomeUser = null;
                var id_tipo = null;
                idUser = id;
                nomeUser = nome;
                id_tipo = id_tipo;

                function getSession(){
                    return (idUser && idUser != null)?true:false;
                };

                function getId(){
                    return idUser;
                };

                function setIdUser(id){
                    idUser = id;
                };

                function getNomeUser(){
                    return nomeUser;
                };

                function setNomeUser(n){
                    nomeUser = n;
                };

                function getTipoUser(){
                    return id_tipo;
                };

                function setTipoUser(t){
                    id_tipo = t;
                }
            }
            getSession: function(){
                return (idUser && idUser != null)?true:false;
            },
            getId: function(){
                return idUser;
            },
            setIdUser: function(idUser){
                idUser = idUser;
            },
            getNomeUser: function(){
                return nomeUser;
            },
            setNomeUser: function(nome){
              nomeUser = nome;
            },
            setLocalStorage: function(id, nome, tipo){
                localStorage.setItem("idUser", id);
                localStorage.setItem("nomeUser", nome);
                localStorage.setItem("tipoUser", tipo);
            }
    }
});

.factory('userFactory', function($http) {
    return {
            getUsuarios: function(){
                return $http.get("https://quickservice.herokuapp.com/localiza/"+lat+"/"+longi);
            },
            getUsuario: function(){
                return null;
            }
    }
});