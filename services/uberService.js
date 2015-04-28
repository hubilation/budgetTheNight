(function(){
   "use strict";

    angular.module('app')
        .factory('uberService', uberService);

    uberService.$inject  = ['AccessToken', '$timeout', '$http'];

    function uberService(AccessToken, $timeout, $http){
        var service = {};
        var authToken = null;

        var baseUrl = 'https://api.uber.com/';

        service.isLoggedIn = function(){
            return !!AccessToken.get();
        };

        service.getMe = function(){
            var config = getAuthTokenHeader();
            return $http.get(baseUrl + 'v1/me', config)
                .then(function(data){
                    return data;
                });
        };

        service.getHistory = function(offset, limit){
            var req = {
                method: 'GET',
                url: baseUrl + 'v1.2/history?offset=' + (offset || 0) + '&limit=' + (limit || 5),
                headers: {
                    'Authorization': 'Bearer ' + getAuthTokenFromCache().access_token
                },
                data: {'offset': offset || 0, 'limit': limit || 5}
            };

            return $http(req)
                .then(function(data){
                    return data;
                });
        };

        var getAuthTokenFromCache = function(){
            if(authToken === null){
                authToken = AccessToken.get();
            }
            return authToken;
        };

        var getAuthTokenHeader = function(){
            return {headers:{'Authorization': 'Bearer ' + getAuthTokenFromCache().access_token}};
        };

        return service;
    }
}());