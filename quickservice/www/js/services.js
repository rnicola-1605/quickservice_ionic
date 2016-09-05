angular.module('starter.services', [])

.service('CadastroService', function($q, $http){
    console.log('servico de cadastro');
    return {
        cadastro: function(dados, latitude, longitude) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                url: "http://localhost:5000/cadastra",
                headers: {"Content-Type": 'application/json'},
                data: {id_tipo_usuario: dados.id_tipo_usuario,
                       nome: dados.nome,
                       email: dados.email,
                       ddd_telefone: dados.ddd_1,
                       telefone: dados.telefone_1,
                       senha: dados.senha,
                       latitude: -10.0,
                       longitude: 10.0},
                method: "POST"
            }).success(function(data, status, headers, config){
                var dados = eval(data);
                console.log(dados);
                if (dados.status == 0){
                    deferred.reject(dados.msg);
                }else{
                    deferred.resolve('Cadastro realizado com sucesso!');
                }
            })
            .error(function(data, status, headers, config){
                deferred.reject('Erro ao cadastrar!');
            });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.service('LoginService', function($q, $http, $window) {
    var dadosUsuario;
    return {
        getDadosUsuario: function(){
            return dadosUsuario;
        },
        loginUser: function(email, senha) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                url: "http://localhost:5000/busca_credenciais/"+email+"/"+senha,
                headers: {
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": 'GET, PUT, POST, DELETE'},
                method: "GET"
             }).success(function(data, status, headers, config){
                var usuario = eval(data);
                console.log(usuario);
                if (usuario.status == 0){
                    deferred.reject(usuario.msg);
                }else{
                    dadosUsuario = {
                        idUser: usuario.dados.id_usuario,
                        nomeUser: usuario.dados.nome,
                        tipoUser: usuario.dados.id_tipo_usuario
                    };

                    $window.sessionStorage["dadosUsuario"] = JSON.stringify(dadosUsuario);

                    localStorage.setItem("idUser", usuario.dados.id_usuario);
                    localStorage.setItem("nomeUser", usuario.dados.nome);
                    localStorage.setItem("tipoUser", usuario.dados.id_tipo_usuario);
                    localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
                    deferred.resolve('Bem-vindo ' + usuario.dados.nome + '!');
                }
            })
             .error(function(data, status, headers, config){
                deferred.reject('Credenciais inválidas.');
             });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        deslogarUser: function(){
            var deferred = $q.defer();
            $window.sessionStorage["dadosUsuario"] = null;
            localStorage.setItem("idUser", "");
            localStorage.setItem("nomeUser", "");
            localStorage.setItem("tipoUser", "");
            localStorage.setItem("dadosUsuario", "");
        }
    }
})
