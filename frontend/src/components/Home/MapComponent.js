import React, {useEffect, useState} from 'react';
import DropdownSimple from '../Common/DropdownSimple';
import {Button} from 'react-bootstrap';
import L from 'leaflet';
import MarkerExplanation from "./MarkerExplanation";

const MapComponent = ({ db, token, history }) => {

  const [mymapRef, setMap] = useState({});
  const [mapIsSet, setMapIsSet] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [dataIsLoaded, setLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    loadData(db)
    loadMap()
  }, [dataIsLoaded, filter]);

  const loadData = () => {
    if(!dataIsLoaded){
      return db.collection("hospitals")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            setHospitals(hospitals => [...hospitals, {...doc.data()}])
            });
          setLoaded(true)
        })
    }
  };

  const loadZoom = () => {
    if(localStorage.getItem("lat") !== null && localStorage.getItem("lng") !== null) {
      return 10;
    }
    else {
      return 5;
    }
  };

  const loadCoordinates = () => {
    if(localStorage.getItem("lat") !== null && localStorage.getItem("lng") !== null) {
      const lat = parseFloat(localStorage.getItem("lat"));
      const lng = parseFloat(localStorage.getItem("lng"));
      return [lat, lng];
    }
    else {
      return center;
    }
  };

  const center = [54.070192, -3.869140];

  const loadMap = () => {
    if (!mapIsSet){
      const mymap = L.map('mapid', {
        center: loadCoordinates(),
        zoom: loadZoom(),
        layers: [
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }),
        ]
      });
      setMap(mymap);
      setMapIsSet(true)
    }

    updateMarkers()
  };

  const getMarkerFromCoordinates = (lat, lng) => {
    if(markers) {
      return markers.filter((marker) => {
        if (marker._latlng.lat == lat && marker._latlng.lng == lng) {
          return marker;
        }
      });
    }
    else {
      return null;
    }
  };


  const updateMarkers = () => {
    setMarkers([]);
    let inFilter = false;
    hospitals.map((h) => {
      let options = {radius: 12};
      let inventoryInfo = "";
      let filtered = h.equipment || [];
      if (filter !== ""){
        filtered = filtered.filter((x) => x.category.toLowerCase() == filter.toLowerCase())
        {(filtered.length === 0) ? (inFilter = false) : (inFilter = true)}
      } else {
        inFilter = true;
      }

      filtered.map((x) => {
        if (x.available && x.available > 0 && options['color'] != 'red' && options['color'] != 'orange'){
          options['color'] = 'green'
        } else if (x.reserved && x.reserved > 0 && options['color'] != 'red'){
          options['color'] = 'orange'
        } else {
          options['color'] = 'red'
        }
        const category = x.category || "";
        const available = x.available || "";
        const inuse = x.inUse || "";
        const reserved = x.reserved || "";
        inventoryInfo = inventoryInfo + "<b>" + category + "</b>" + "<br>" + "<b>" + "Available: " + "</b>" + available + "<br>" + "<b>" + "In use: " + "</b>" + inuse +"<br>"+ "<b>" + "Reserved: " + "</b>" + reserved +"<br><br>";
      });

      const oldMarker = getMarkerFromCoordinates(h.lat, h.lng);
      oldMarker[0] && mymapRef.removeLayer(oldMarker[0]);
      if (inFilter){
        const popup = L.circleMarker([h.lat, h.lng], options);
        mymapRef.addLayer(popup);
        popup.bindPopup(inventoryInfo);
        setMarkers(markers => [...markers, popup])
      }
    })
  };

  const completeTransaction = () => {
    history.push("/transaction");
  };

  const renderTransactionButton = () => {
    if(token || true) {
      return (
          <Button onClick={completeTransaction}>Send transaction</Button>
      )
    }
  };

  return (
    <div className="row">
      <div id="mapid"/>
      <div className="side-bar-map">
        <DropdownSimple  filter = { setFilter }/>
        <div>
          {/*<div className="img-container"><img height="130px" width="200px" src="rog.png" alt=""/></div>*/}
          <MarkerExplanation/>
        </div>
        <div>
          { renderTransactionButton() }
        </div>
      </div>
    </div>
  )
};

export default MapComponent;
