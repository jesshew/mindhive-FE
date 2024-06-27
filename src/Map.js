import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { Button } from 'react-bootstrap';
import L from "leaflet";
import './App.css'

import "leaflet/dist/leaflet.css";
import OutletMap from "./OutletMap";
import OutletList from "./OutletList";

const Map = ({ outlets }) => {
  const [hoveredOutletId, setHoveredOutletId] = useState(null);
  const [showIntersections, setShowIntersections] = useState(false);
  const [intersectingOutlets, setIntersectingOutlets] = useState(new Set());

  const groupRef = useRef();

  const handleMarkerMouseOver = (outletId) => {
    setHoveredOutletId(outletId);
  };

  const handleMarkerMouseOut = () => {
    setHoveredOutletId(null);
  };

  const findIntersectingOutlets = () => {
    if (!groupRef.current) return;

    const layers = groupRef.current.getLayers();
    const intersecting = new Set();

    layers.forEach((layer1, index1) => {
      if (layer1 instanceof L.Circle) {
        layers.forEach((layer2, index2) => {
          if (index1 < index2 && layer2 instanceof L.Circle) {
            const distance = layer1.getLatLng().distanceTo(layer2.getLatLng());
            if (distance < layer1.getRadius() + layer2.getRadius()) {
              intersecting.add(layer1.options.outletId);
              intersecting.add(layer2.options.outletId);
            }
          }
        });
      }
    });

    setIntersectingOutlets(intersecting);
  };

  useEffect(() => {
    if (showIntersections) {
      findIntersectingOutlets();
    } else {
      setIntersectingOutlets(new Set());
    }
  }, [showIntersections]);

  return (
    <div className="container-fluid p-0" style={{ display: 'grid', gridTemplateColumns: '70% 30%', height: '100vh' }}>
      <div style={{ position: 'relative' }}>
        <MapContainer
          center={[3.139, 101.6869]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FeatureGroup ref={groupRef}>
            {outlets.map((outlet) => (
              <OutletMap
                key={outlet.id}
                outlet={outlet}
                intersectingOutlets={intersectingOutlets}
                hoveredOutletId={hoveredOutletId}
                handleMarkerMouseOver={handleMarkerMouseOver}
                handleMarkerMouseOut={handleMarkerMouseOut}
              />
            ))}
          </FeatureGroup>
        </MapContainer>
      </div>
      <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="card toggle-card">
          <div className="card-body">
            <h6 className="toggle-description" >
              Highlight or mark outlets with intersections within a 5KM radius catchment.
            </h6>
            <Button
              onClick={() => setShowIntersections(!showIntersections)}
              className="toggle-button"
              style={{ flex: '1 1 100%', marginBottom: '10px', height: '50px' }} // Adjusted flex styles
            >
              {showIntersections ? 'Hide Intersections' : 'Show Intersections'}
            </Button>
          </div>
        </div>
        <OutletList
          outlets={outlets}
          handleMarkerMouseOver={handleMarkerMouseOver}
          handleMarkerMouseOut={handleMarkerMouseOut}
          hoveredOutletId={hoveredOutletId}
        />      </div>
    </div>
  );
};

export default Map;