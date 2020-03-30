import React, { useEffect, useState } from 'react';
import DropdownSimple from '../Common/DropdownSimple';
import { Button } from 'react-bootstrap';
import L from 'leaflet';

const MapComponent = ({ db }) => {

  const [mymapRef, setMap] = useState({});
  const [mapIsSet, setMapIsSet] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [dataIsLoaded, setLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [filter, setFilter] = useState("");

  const initializeMap = () => {
    let container = L.DomUtil.get('mapid');
    if(container != null) {
      container._leaflet_id = null;
    }
  };


  useEffect(() => {
    loadData(db)
    loadMap()
  }, [dataIsLoaded, filter])

  const loadData = () => {
    if(!dataIsLoaded){
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

    updateMarkers()
  };


  const updateMarkers = () => {
    setMarkers([])
    var inFilter = false;
    hospitals.map((h) => {
      var red = false;
      var orange = false;
      var green = true;
      var options = {radius: 12};
      var inventoryInfo = "";
      var filtered = h.equipment;
      if (filter !== ""){
        filtered = h.equipment.filter((x) => x.category.toLowerCase() == filter.toLowerCase())
        {(filtered.length === 0) ? (inFilter = false) : (inFilter = true)}
      } else {
        inFilter = true;
      }

      filtered.map((x) => {
        if (x.available > 0 && options['color'] != 'red' && options['color'] != 'orange'){
          options['color'] = 'green'
        } else if (x.reserved > 0 && options['color'] != 'red'){
          options['color'] = 'orange'
        } else {
          options['color'] = 'red'
        }
        var category = x.category;
        var available = x.available;
        var inuse = x.inUse;
        var reserved = x.reserved
        inventoryInfo = inventoryInfo + category + "<br>" + "Available: " + available + "<br>" + "In use: " + inuse +"<br>"+ "Reserved: " + reserved +"<br><br>";
      });

      if (inFilter){
        var popup = L.circleMarker([h.lat, h.lng], options).addTo(mymapRef);
        popup.bindPopup(inventoryInfo);
        setMarkers(markers => [...markers, popup])
      }
    })
  };

  return (
    <div className="row">
      <div id="mapid"></div>
      <div className="side-bar-map">
        <DropdownSimple  filter = { setFilter }/>
        <div>
          <Button>Complete recommended transaction</Button>
        </div>
      </div>
    </div>
  )
}

export default MapComponent;
