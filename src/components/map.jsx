import mapboxgl from 'mapbox-gl';
import { useRef, useState, useEffect } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoianVhbi1tb3Jlbm8iLCJhIjoiY2x4ZHczZngyMDUyZTJqb2hsMDUyMzJzZiJ9.iI0pPdUCk5tR9c1IflAVdA';

const INITIAL_COOR = {
  LNG: -74.0133,
  LAT: 40.7027,
  ZOOM: 15.13
}

export const Map = () => {
  const mapContainerRef = useRef(null)
  const mapContainerRef2 = useRef(null)
  const [lng, setLng] = useState(INITIAL_COOR.LNG);
  const [lat, setLat] = useState(INITIAL_COOR.LAT);
  const [zoom, setZoom] = useState(INITIAL_COOR.ZOOM);
  const [lng2, setLng2] = useState(INITIAL_COOR.LNG);
  const [lat2, setLat2] = useState(INITIAL_COOR.LAT);
  const [zoom2, setZoom2] = useState(INITIAL_COOR.ZOOM);
  const [mapResult, setMapResult] = useState(false)
  useEffect(() => {

    const map2 = new mapboxgl.Map({
      container: mapContainerRef2.current,
      style: 'mapbox://styles/juan-moreno/clxl6j9l701xp01qk4zrueabd',
      center: [lng, lat],
      zoom: zoom
    })

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/juan-moreno/clxdwfbm5009d01qo8lljfhhd',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map2.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      const zoom = map.getZoom()
      setZoom(zoom.toFixed(2));
      // if (mapResult) {
      //   console.log('2')
      //   map2.setZoom(zoom)
      //   const { lng, lat } = map.getCenter()
      //   map2.setCenter([lng, lat])
      // }
    });

    map2.on('move', () => {
      setLng2(map2.getCenter().lng.toFixed(4));
      setLat2(map2.getCenter().lat.toFixed(4));
      const zoom = map2.getZoom()
      setZoom2(zoom.toFixed(2));
      if (!mapResult) {
        map.setZoom(zoom)
        map.setCenter([map2.getCenter().lng, map2.getCenter().lat])
      }
    });

    // Clean up on unmount
    return () => {
      map.remove();
      map2.remove();
    }
  }, [])
  return (
    <>
      <div className="groupBtns">
        <button disabled={!mapResult} onClick={() => setMapResult(false)}>Map</button>
        <button disabled={mapResult} onClick={() => setMapResult(true)}>Result</button>
      </div>
      <div className='map'>
        <div className='shape' style={{
          background: `${!mapResult ? 'gray' : 'black'}`,
          opacity: `${!mapResult ? 0.4 : 1}`
        }} />
        <div className='map-container' ref={mapContainerRef}
        />
        <div className='map-container map2' ref={mapContainerRef2}
          style={{
            opacity: `${mapResult ? 0 : 1}`,
          }}
        />
      </div>
      <div className='values'>
        coor
        <span>lng: {lng2}</span>
        <span>lat: {lat2}</span>
        <span>zoom: {zoom2}</span>
      </div>
      {/* <div className='values'> */}
      {/*   map 2 */}
      {/*   <span>lng: {lng}</span> */}
      {/*   <span>lat: {lat}</span> */}
      {/*   <span>zoom: {zoom}</span> */}
      {/* </div> */}
    </>
  )
}
