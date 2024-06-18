import React, { useEffect, useRef, useState } from 'react';
import { PATHS } from '../../../utils/config';

const GOOGLE_MAPS_API_KEY = 'key';

const GoogleMapComponent = ({ onRouteCalculated }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [stopMarkers, setStopMarkers] = useState([]);
  const [stops, setStops] = useState([]);

  // Definir initMap en el contexto global
  const initMap = () => {
    const center = { lat: 4.570868, lng: -74.297333 }; // Coordenadas para centrar el mapa en Colombia
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 6, 
      center: center,
    });
    setMap(map);

    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    setDirectionsRenderer(directionsRenderer);

    const input = document.getElementById('stop-input');
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        return;
      }
      addStop(place.geometry.location, place.name);
      input.value = '';
    });

    addMarker(center, 'Punto Inicial', map);
  };

  useEffect(() => {
    // Definir la función global initMap
    window.initMap = initMap;

    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      window.document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initMap();
    }

    return () => {
      if (window.google && window.google.maps && window.google.maps.event) {
        window.google.maps.event.clearInstanceListeners(window);
      }
    };
  }, []);

  const addMarker = (location, title, map) => {
    return new window.google.maps.Marker({
      position: location,
      map: map,
      title: title,
    });
  };

  const addStop = (location, title) => {
    const newStop = { lat: location.lat(), lng: location.lng(), title };
    setStops((prevStops) => [...prevStops, newStop]);

    const marker = addMarker(location, title, map);
    setStopMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  const calculateRoute = async () => {
    const start = { lat: 4.570868, lng: -74.297333 }; // Coordenadas para el punto de inicio en Colombia
    try {
      const response = await fetch(`${PATHS.BASE_PATH}${PATHS.API_ROUTES.NEW_OPTIMIZED_ROUTE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ start, stops }),
      });

      const route = await response.json();
      directionsRenderer.setDirections(route);
      onRouteCalculated(route);
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  return (
    <div>
      <div id="stop-list">
        <input id="stop-input" type="text" placeholder="Añadir parada" />
        <ul>
          {stops.map((stop, index) => (
            <li key={index}>{stop.title}</li>
          ))}
        </ul>
        <button onClick={calculateRoute}>Calcular Ruta</button>
      </div>
      <div id="map" ref={mapRef} style={{ height: '100vh' }}></div>
    </div>
  );
};

export default GoogleMapComponent;
