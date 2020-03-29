import React, { useEffect, useState } from 'react';
import L from 'leaflet';

const MapComponent = ({ db }) => {

  const [mymapRef, setMap] = useState({});
  const [mapIsSet, setMapIsSet] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [dataIsLoaded, setLoaded] = useState(false);

  useEffect(() => {
    loadData(db)
    loadMap()
  }, [dataIsLoaded])



  const loadData = () => {
    if(!dataIsLoaded){
      console.log("holalala")
      return db.collection("hospitals")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            setHospitals(hospitals => [...hospitals, {...doc.data()}])
            })
          setLoaded(true)
        })
    }
  };

  const loadMap = () => {
    if (!mapIsSet){
      console.log("tittei")
      const mymap = L.map('mapid', {
        center: [54.070192, -3.869140],
        zoom: 5,
        layers: [
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }),
        ]
      })
      setMap(mymap)
      setMapIsSet(true)
    }

    hospitals.map((h) => {
      var popup6 = L.circleMarker([h.lat, h.lng], { radius: 10}).addTo(mymapRef);
      var inventoryInfo = "";
      h.equipment.map((x) => {
        var category = x.category;
        var available = x.available;
        var inuse = x.inUse;
        var reserved = x.reserved
        inventoryInfo = inventoryInfo + category + "<br>" + "Available: " + available + "<br>" + "In use: " + inuse +"<br>"+ "Reserved: " + reserved +"<br><br>";
      });
      popup6.bindPopup(inventoryInfo);
    })

    //var popup1 = L.circleMarker([51.497619, -2.590936], { radius: 15}).addTo(map);
    //var popup2 = L.circleMarker([51.468747, -2.516716], { radius: 15}).addTo(map);
    //var popup3 = L.circleMarker([51.412819, -2.583208], { radius: 15}).addTo(map);
    //var popup4 = L.circleMarker([51.457448, -2.622750], { radius: 15}).addTo(map);
    //var popup5 = L.circleMarker([51.458354, -2.593978], { radius: 15}).addTo(map);

    //popup1.bindPopup("<b>Hello world!</b><br>I am a popup.")
    //popup2.bindPopup("<b>Hello world!</b><br>I am a popup.")
    //popup3.bindPopup("<b>Hello world!</b><br>I am a popup.")
    //popup4.bindPopup("<b>Hello world!</b><br>I am a popup.")
    //popup5.bindPopup("<b>Hello world!</b><br>I am a popup.")
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
