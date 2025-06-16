
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyAoPW59hu_weki8hI6kAFI3jm02rotUMVw',
        version: 'weekly',
        libraries: ['places']
      });

      try {
        await loader.load();
        
        if (mapRef.current && !mapInstanceRef.current) {
          mapInstanceRef.current = new google.maps.Map(mapRef.current, {
            center: { lat: 39.8283, lng: -98.5795 }, // Center of US
            zoom: 4,
            styles: [
              {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "weight": "2.00"
                  }
                ]
              },
              {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#9c9c9c"
                  }
                ]
              },
              {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [
                  {
                    "visibility": "on"
                  }
                ]
              },
              {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                  {
                    "color": "#f2f2f2"
                  }
                ]
              },
              {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#ffffff"
                  }
                ]
              },
              {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#ffffff"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                  {
                    "saturation": -100
                  },
                  {
                    "lightness": 45
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#eeeeee"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#7b7b7b"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#ffffff"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                  {
                    "visibility": "simplified"
                  }
                ]
              },
              {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                  {
                    "color": "#46bcec"
                  },
                  {
                    "visibility": "on"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#c8d7d4"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#070707"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#ffffff"
                  }
                ]
              }
            ],
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-96 rounded-lg"
      style={{ minHeight: '384px' }}
    />
  );
};

export default GoogleMap;
