import React, { useEffect, useState } from 'react';
import L from 'leaflet';

const MapComponent = ({ db }) => {

  const [faceMaskCount, setFaceMaskCount] = useState(0);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    loadData(db)
    console.log(hospitals)
    loadMap()
  }, [""])

  const loadData = () => {
    return db.collection("hospitals")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          setHospitals(hospitals => [...hospitals, {...doc.data()}])
        })
      })
  };

  const loadMap = () => {
    const myMap = L.map('mapid', {
      center: [51.454527, -2.587910],
      zoom: 11,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    })

    var popup1 = L.circleMarker([51.497619, -2.590936], { radius: 15}).addTo(myMap);
    var popup2 = L.circleMarker([51.468747, -2.516716], { radius: 15}).addTo(myMap);
    var popup3 = L.circleMarker([51.412819, -2.583208], { radius: 15}).addTo(myMap);
    var popup4 = L.circleMarker([51.457448, -2.622750], { radius: 15}).addTo(myMap);
    var popup5 = L.circleMarker([51.458354, -2.593978], { radius: 15}).addTo(myMap);

    popup1.bindPopup("<b>Hello world!</b><br>I am a popup.")
    popup2.bindPopup("<b>Hello world!</b><br>I am a popup.")
    popup3.bindPopup("<b>Hello world!</b><br>I am a popup.")
    popup4.bindPopup("<b>Hello world!</b><br>I am a popup.")
    popup5.bindPopup("<b>Hello world!</b><br>I am a popup.")
  };

  // 51.497619, -2.590936
  // 51.468747, -2.516716
  // 51.412819, -2.583208
  // 51.457448, -2.622750
  // 51.458354, -2.593978

  return (
    <div id="mapid"></div>
  )
}

export default MapComponent;
