import React, { Component, useEffect } from 'react';
import ReactMapGl, {Marker}  from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {Source, Layer} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import { propertiesContainsFilter } from '@turf/turf';
import { useState } from 'react';
import axios from 'axios';


// A circle of 5 mile radius of the Empire State Building
const GEOFENCE = turf.circle([-74.0122106, 40.7467898], 5, {units: 'miles'});

const mapboxToken = 'pk.eyJ1IjoidG9wdGFsZW50IiwiYSI6ImNrenBqdW9mdjYxOW0yeHBycnNzYzEybjgifQ.fh70WgDAw5DUhXUnzhU99Q'

const geojson = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
  ]
};

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

function App(props) {
  const [viewState, setViewState] = React.useState({
    longitude: -90.95534916605851,
    latitude: 55.658012906351075,
    zoom: 1
  });
  const [selectedPos, setSelectedPos] = useState({
    longitude: -90.95534916605851,
    latitude: 55.658012906351075,
  });
  useEffect(() => {
    setSelectedPos(props.location)
    setViewState({...props.location, zoom: viewState.zoom}); 
  }, [props.location])
  const onMove = React.useCallback(({viewState}) => {
    const newCenter = [viewState.longitude, viewState.latitude];

    setViewState(viewState);
  }, [])
  const _onClickMap = async (map, evt) => {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${map.lngLat.lat},${map.lngLat.lng}.json?types=address&access_token=${mapboxToken}`)
    console.log(response);
    //https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?types=address&access_token=pk.eyJ1IjoianNjYXN0cm8iLCJhIjoiY2s2YzB6Z25kMDVhejNrbXNpcmtjNGtpbiJ9.28ynPf1Y5Q8EyB_moOHylw

    setSelectedPos({
      longitude: map.lngLat.lng,
      latitude: map.lngLat.lat
    });
    props.clickPosition({latitude: map.lngLat.lat, longitude: map.lngLat.lng})
  }
  return (
    <Map
      {...viewState}
      onMove={onMove}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      mapboxAccessToken={mapboxToken}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onClick={_onClickMap}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
      
      <Marker
        latitude= {selectedPos.latitude}
        longitude= {selectedPos.longitude}
      >
              <img src='imgs/pin.jpg' style={{width: '20px', height: '30px'}} alt="marker"/>
        </Marker>
      </Map>
    
  );
}

export default App;
