describe("GeoLocationService", function(){
    var _service,
        $window;


    beforeEach(function(){
        module("app")
    });
    beforeEach(inject(function ($injector) {
        _service = $injector.get('geoLocationService');
    }));

    describe("initialization", function(){
       it("should create the geoLocationService", function(){
           expect(_service).not.toBe(null);
           expect(_service).not.toBe(undefined);
       });
    });


    it("should call to navigator.geolocation when _location has not been set", function() {
        spyOn(navigator.geolocation, "getCurrentPosition");
        var location = _service.getLocation();
        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });

    it("should return geolocation data when navigator.geolocation returns it", function(){
        var testLat = 32.8569;
        var testLong =  -96.9628;

        spyOn(navigator.geolocation, "getCurrentPosition").and.callFake(function(){
            var position = {
                coords: {
                    latitude: testLat,
                    longitude: testLong }
            };
            arguments[0](position);
        });

        var location = _service.getLocation();

        expect(location.latitude).toBe(testLat);
        expect(location.longitude).toBe(testLong);
    });

    it("should not call out to navigator.geolocation when location is already set", function(){
        var testLat = 32.8569;
        var testLong =  -96.9628;

        spyOn(navigator.geolocation, "getCurrentPosition").and.callFake(function(){
            var position = {
                coords: {
                    latitude: testLat,
                    longitude: testLong }
            };
            arguments[0](position);
        });

        //we expect a call to geolocation here
        var location = _service.getLocation();

        //but since it's already set now, we shouldn't call it again
        location = _service.getLocation();

        expect(navigator.geolocation.getCurrentPosition.calls.count()).toBe(1);
        expect(location.latitude).toBe(testLat);
        expect(location.longitude).toBe(testLong);
    });

    it("should return null when failing to get location from navigator.geolocation", function(){
        spyOn(navigator.geolocation, "getCurrentPosition").and.callFake(function(){
            arguments[1]();
        });

        var location = _service.getLocation();

        expect(location.latitude).toBe(null);
        expect(location.longitude).toBe(null);
    });

    it("should not attempt to get location again after a failure", function(){
        spyOn(navigator.geolocation, "getCurrentPosition").and.callFake(function(){
            arguments[1]();
        });

        //we expect a call to geolocation here
        var location = _service.getLocation();

        //but since it's already failed once, we shouldn't call it again
        location = _service.getLocation();

        expect(navigator.geolocation.getCurrentPosition.calls.count()).toBe(1);

        expect(location.latitude).toBe(null);
        expect(location.longitude).toBe(null);
    });
});