(function(){
    "use strict";

    angular.module('app', ['oauth']);

    angular.module('app').config(function($locationProvider){
       $locationProvider.html5Mode(true).hashPrefix('!');
    });

    angular.module('app').directive('oauthEcho', oauthEcho);

    oauthEcho.$inject = ['uberService', '$timeout'];

    function oauthEcho(uberService){
        return{
            restrict: 'E',
            templateUrl: 'oauthEcho.html',
            bindToController: true,
            controllerAs: "oe",
            controller: function($scope, $timeout){
                var vm = this;
                $timeout(function(){
                    vm.logged = uberService.isLoggedIn();
                }, 0);
                uberService.getMe().then(function(me){
                    console.log(me);
                });
                uberService.getHistory(0,50).then(function(history){
                    console.log(history);
                })
            }
        }
    }
}());