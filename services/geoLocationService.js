(function(){
    "use strict";
    angular
        .module('app')
        .factory('geoLocationService', geoLocationService);

    function geoLocationService(){

        var service = {};
        var _location = {};

        var getLatLong = function() {
            var geolocation = navigator.geolocation;
            if(geolocation){
                geolocation.getCurrentPosition(saveResult, saveFailure);
            }
            else{
                logFailure();
            }
        };

        function saveResult(position){
            _location.latitude = position.coords.latitude;
            _location.longitude = position.coords.longitude;
        };

        function saveFailure(data){
            _location.latitude = null;
            _location.longitude = null;
            console.log("Geolocation failed", data);
        };

        service.getLocation = function(){
            if(angular.isDefined(_location.latitude)){
                return _location;
            }

            if(!angular.isDefined(_location.latitude)){
                getLatLong();
                return _location;
            }
        };

        return service;
    }

}());