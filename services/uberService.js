(function(){
   "use strict";

    angular.module('app')
        .factory('uberService', uberService);

    uberService.$inject  = ['AccessToken', '$timeout', 'Profile'];

    function uberService(AccessToken){
        var service = {};

        service.isLoggedIn = function(){
            return !!AccessToken.get();
        };



        return service;
    }
}());