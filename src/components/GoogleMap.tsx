import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  locations: Array<{
    lat: number;
    lng: number;
    name: string;
  }>;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ locations }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { Marker } = await loader.importLibrary("marker");

      if (mapRef.current) {
        const map = new Map(mapRef.current, {
          center: { lat: 39.8283, lng: -98.5795 }, // Center of US
          zoom: 4,
        });

        locations.forEach((location) => {
          new Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name,
          });
        });
      }
    };

    initMap();
  }, [locations]);

  return <div ref={mapRef} className="w-full h-96" />;
};

export default GoogleMap;
