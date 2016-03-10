app.controller("controller", ["$scope", "messagesFun","getUsuari","getTweets","getFollow",

    function($scope, messagesFun,getUsuari,getTweets,getFollow) {

        $scope.messagesFuncio = messagesFun; //sincron
        $scope.usuari = getUsuari('sandra');
        $scope.messageUsuari = getTweets('sandra');
        $scope.following=getFollow('sandra');


        $scope.usuariCanvi = function(usuario){
            $scope.usuari = getUsuari(usuario);
            $scope.messageUsuari = getTweets(usuario);
            $scope.nick =usuario;
        };
        $scope.addTweet = function(){
            $scope.messageUsuari.$add({
                text: $scope.text
            });
            $scope.text='';
        };
        $scope.addFollow = function(){
            $scope.following.$add({
                idUser: $scope.idUser
            });
            $scope.idUser='';
        };

    }
]);

//funció que retorna un array amb el que hi ha al firebase.
//factory crida a funcions ja existents funcions de "fabrica"
app.factory("messagesFun", ["$firebaseArray",
    function($firebaseArray) {
        var ref = new Firebase("https://ecaibtweet.firebaseio.com/tweets");
        return $firebaseArray(ref);
    }
]);

app.factory("getUsuari", ["$firebaseObject",
    function($firebaseObject) {
        return function(usuari) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            var usuario =ref.child(usuari);//busco el usuari que l'hi dic.
            return $firebaseObject(usuario);
        };
    }
]);
app.factory("getTweets", ["$firebaseArray",
    function($firebaseArray) {
        return function(usuari) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(usuari).child("tweets"));//busco el "child del ususari que l'hi dic
        };
    }
]);

app.factory("getFollow", ["$firebaseArray",
    function($firebaseArray) {
        return function(usuari) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(usuari).child("following"));
        };
    }
]);

