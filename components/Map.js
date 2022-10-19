import { useEffect, useState, useRef } from "react"
import tw from "tailwind-styled-components"
import mapboxgl from "mapbox-gl"
import axios from "axios"

mapboxgl.accessToken = 'pk.eyJ1IjoibWVkYmVuZGFkaSIsImEiOiJjbDlhMTlhejkwbHAxM3dwOHkycHJ3cTNwIn0.HCITQvgNiGt3bn1DNbliww'


const Map = ({ fromCoordinates, toCoordinates, distance, type }) => {

   const [loading, setLoading] = useState(true)
   const mapRef = useRef(null)
   const map = useRef(null)
   useEffect(() => {
      // Setup the map 
      if (map.current) return;
      map.current = new mapboxgl.Map({
         container: mapRef.current,
         style: 'mapbox://styles/mapbox/dark-v10',
         center: [-7.603869, 33.589886],
         zoom: 4,
      })


      // Add locate User Location button
      map.current.addControl(
         new mapboxgl.GeolocateControl({
            positionOptions: {
               enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
         })
      );



   }, [])
   useEffect(() => {
      if (!(fromCoordinates && toCoordinates)) return;
      if (fromCoordinates.every(item => item === 0) || toCoordinates.every(item => item === 0)) return;
      addToMap(map.current, fromCoordinates, toCoordinates)
      map.current.fitBounds([
         fromCoordinates, toCoordinates
      ], {
         padding: 40,
      })

      getRoute(fromCoordinates, toCoordinates, map.current, type)


      setLoading(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [fromCoordinates, toCoordinates, map.current])

   // Add Marker
   const addToMap = (map, from, to) => {
      const el1 = document.createElement('div');
      el1.className = 'marker';


      // Add markers to the map
      const marker1 = new mapboxgl.Marker(el1)
         .setLngLat(from)
         .addTo(map);

      const el2 = document.createElement('div');
      el2.className = 'marker';


      // Add markers to the map
      const marker2 = new mapboxgl.Marker(el2)
         .setLngLat(to)
         .addTo(map);

   }


   function getRoute(start, end, map, type) {
      map.on('load', async () => {
         const query = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/${type}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`)
         if (query.status === 200) {
            console.log(query.data);
            const route = query.data.routes[0]?.geometry.coordinates;
            const geojson = {
               type: 'Feature',
               properties: {},
               geometry: {
                  type: 'LineString',
                  coordinates: route
               }
            };
            if (map.getSource('route')) {
               map.getSource('route').setData(geojson);
            }
            else {
               if (map) {
                  map.addLayer({
                     id: 'route',
                     type: 'line',
                     source: {
                        type: 'geojson',
                        data: geojson
                     },
                     layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                     },
                     paint: {
                        'line-color': '#C0ec4e',
                        'line-width': 5,
                        'line-opacity': 0.75
                     }
                  });
               }
            }
         }
      })
   }





   return (
      <Wrapper>
         <MapContainer id='map' ref={mapRef}></MapContainer>
         {
            (distance) && <DistanceContainer>Distance: {distance} Km</DistanceContainer>
         }
      </Wrapper>
   )
}

export default Map


const Wrapper = tw.div`
flex-1 sm:order-last relative h-1/2 sm:h-full sm:flex-3 grow
`
const MapContainer = tw.div`
h-full w-full
`

const DistanceContainer = tw.div`
absolute bg-graylight text-black w-48 h-12 rounded-xl p-2 top-5 left-3 text-center text-lg font-konit
`