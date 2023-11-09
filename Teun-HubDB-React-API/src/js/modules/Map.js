export default () => {
  /** Is there a map on the current page? */
  const mapElement = document.querySelector('.js-map');
  if (!mapElement) return;

  /**
   * Load the API and call the map.
   */

  if (mapElement.dataset.key === '') {
    console.log('API key is not set in module');
  }

  const apiKey = mapElement.dataset.key; //BRIGHT API KEY
  loadGoogleMapsAPI(apiKey);

  /**
   * Load google maps api
   */
  function loadGoogleMapsAPI(key) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${key}&callback=mapsCallback`;
    document.body.appendChild(script);
  }

  window.mapsCallback = () => {
    /**
     * Get coordinates from html data attributes.
     * Return early if values are missing.
     */
    let coordinates = getCoordinates(mapElement);
    if (!coordinates) {
      console.log('Missing coordinates. Fill all required fields in pageblock.');
      return;
    }

    displayMap(coordinates.lat, coordinates.lng, coordinates.zoom);

    /**
     * Build the map
     */
    function displayMap(lat, lng, zoom) {
      const styles = getSnazzyMapStyle();

      const coordinates = {
        lat: lat,
        lng: lng,
      };

      const options = {
        zoom: zoom,
        center: new window.google.maps.LatLng(coordinates.lat, coordinates.lng),
        scrollwheel: false,
        draggable: true,
        zoomControl: true,
        scaleControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        styles: styles,
      };

      // Show the map
      const map = new window.google.maps.Map(document.getElementById('map'), options);

      if (mapElement.dataset.marker) {
        createMarker(map, lat, lng, mapElement.dataset.marker, mapElement.dataset.width, mapElement.dataset.height);
      } else {
        createMarker(map, lat, lng, false);
      }
      // Show the marker
    }

    /**
     * Create a marker
     */
    function createMarker(map, lat, lng, img, width, height) {
      const icon = {
        url: img,
        scaledSize: img ? new window.google.maps.Size(width, height) : new window.google.maps.Size(65, 92), // scaled size
      };

      const marker = new window.google.maps.Marker({
        map,
        position: {
          lat: lat,
          lng: lng,
        },
        icon: img ? icon : false,
      });

      return marker;
    }

    /**
     * Get coordinates: lng, lat, zoom
     */
    function getCoordinates(el) {
      if (!el.dataset.lat || !el.dataset.lng || !el.dataset.zoom) {
        return false;
      }

      let lat = parseFloat(el.dataset.lat);
      let lng = parseFloat(el.dataset.lng);
      let zoom = parseFloat(el.dataset.zoom);

      return {
        lat: lat,
        lng: lng,
        zoom: zoom,
      };
    }

    /**
     * Google Maps styling
     * https://snazzymaps.com/style/253339/grayscale-simple
     */
    function getSnazzyMapStyle() {
      return [
        {
          featureType: 'administrative',
          elementType: 'all',
          stylers: [
            {
              visibility: 'on',
            },
            {
              lightness: 33,
            },
          ],
        },
        {
          featureType: 'administrative',
          elementType: 'labels',
          stylers: [
            {
              saturation: '-100',
            },
          ],
        },
        {
          featureType: 'administrative',
          elementType: 'labels.text',
          stylers: [
            {
              gamma: '0.75',
            },
          ],
        },
        {
          featureType: 'administrative.neighborhood',
          elementType: 'labels.text.fill',
          stylers: [
            {
              lightness: '-37',
            },
          ],
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f9f9f9',
            },
          ],
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry',
          stylers: [
            {
              saturation: '-100',
            },
            {
              lightness: '40',
            },
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'landscape.natural',
          elementType: 'labels.text.fill',
          stylers: [
            {
              saturation: '-100',
            },
            {
              lightness: '-37',
            },
          ],
        },
        {
          featureType: 'landscape.natural',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              saturation: '-100',
            },
            {
              lightness: '100',
            },
            {
              weight: '2',
            },
          ],
        },
        {
          featureType: 'landscape.natural',
          elementType: 'labels.icon',
          stylers: [
            {
              saturation: '-100',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              saturation: '-100',
            },
            {
              lightness: '80',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [
            {
              saturation: '-100',
            },
            {
              lightness: '0',
            },
          ],
        },
        {
          featureType: 'poi.attraction',
          elementType: 'geometry',
          stylers: [
            {
              lightness: '-4',
            },
            {
              saturation: '-100',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#c5dac6',
            },
            {
              visibility: 'on',
            },
            {
              saturation: '-95',
            },
            {
              lightness: '62',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'on',
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'all',
          stylers: [
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'labels',
          stylers: [
            {
              saturation: '-100',
            },
            {
              gamma: '1.00',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'labels.text',
          stylers: [
            {
              gamma: '0.50',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'labels.icon',
          stylers: [
            {
              saturation: '-100',
            },
            {
              gamma: '0.50',
            },
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            {
              color: '#c5c6c6',
            },
            {
              saturation: '-100',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              lightness: '-13',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.icon',
          stylers: [
            {
              lightness: '0',
            },
            {
              gamma: '1.09',
            },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e4d7c6',
            },
            {
              saturation: '-100',
            },
            {
              lightness: '47',
            },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry.stroke',
          stylers: [
            {
              lightness: '-12',
            },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.icon',
          stylers: [
            {
              saturation: '-100',
            },
          ],
        },
        {
          featureType: 'road.local',
          elementType: 'geometry',
          stylers: [
            {
              color: '#fbfaf7',
            },
            {
              lightness: '77',
            },
          ],
        },
        {
          featureType: 'road.local',
          elementType: 'geometry.fill',
          stylers: [
            {
              lightness: '-5',
            },
            {
              saturation: '-100',
            },
          ],
        },
        {
          featureType: 'road.local',
          elementType: 'geometry.stroke',
          stylers: [
            {
              saturation: '-100',
            },
            {
              lightness: '-15',
            },
          ],
        },
        {
          featureType: 'transit.station.airport',
          elementType: 'geometry',
          stylers: [
            {
              lightness: '47',
            },
            {
              saturation: '-100',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: [
            {
              visibility: 'on',
            },
            {
              color: '#acbcc9',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              saturation: '53',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
            {
              lightness: '-42',
            },
            {
              saturation: '17',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              lightness: '61',
            },
          ],
        },
      ];
    }
  };
};
