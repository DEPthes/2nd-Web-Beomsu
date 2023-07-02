import React, { useState, useEffect } from "react";

function MapSearch() {
  const [map, setMap] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyATRX08oFQ5FoRPJccYy0zZWFnZd_2fDo8&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.addEventListener("load", initializeMap);

    return () => {
      script.removeEventListener("load", initializeMap);
    };
  }, []);

  const initializeMap = () => {
    const mapOptions = {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 12,
    };

    const mapElement = document.getElementById("map");

    const map = new window.google.maps.Map(mapElement, mapOptions);

    setMap(map);
  };

  const handleSearch = () => {
    if (map) {
      const placesService = new window.google.maps.places.PlacesService(map);
      const request = {
        query: searchValue,
        fields: ["name", "geometry"],
      };

      placesService.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
          renderPlaces(results);
        }
      });
    }
  };

  const renderPlaces = (places) => {
    const bounds = new window.google.maps.LatLngBounds();
  
    places.forEach((place) => {
      const marker = new window.google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
      });
  
      bounds.extend(place.geometry.location);
    });
  
    map.fitBounds(bounds);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div id="map" style={{ height: "800px" }}></div>
    </div>
  );
}

export default MapSearch;
