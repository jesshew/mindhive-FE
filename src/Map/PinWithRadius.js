import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import MapPin from './MapPin'; 
import OutletInfo from '../Outlet/OutletInfo'; 

const PinWithRadius = ({
  outlet,
  intersectingOutlets,
  hoveredOutletId,
  handleMarkerMouseOver,
  handleMarkerMouseOut
}) => {
  return (
    <React.Fragment key={outlet.id}>
      <Circle
        center={[outlet.latitude, outlet.longitude]}
        radius={5000}
        outletId={outlet.id}
        pathOptions={{
          color: intersectingOutlets.has(outlet.id) ? 'red' : '#095325',
          fillColor: hoveredOutletId === outlet.id ? '#F2b700' : (intersectingOutlets.has(outlet.id) ? 'red' : 'none'),
          fillOpacity: hoveredOutletId === outlet.id ? 0.2 : (intersectingOutlets.has(outlet.id) ? 0.1 : 0),
          dashArray: hoveredOutletId === outlet.id ? null : '5, 10',
          weight: intersectingOutlets.has(outlet.id) ? 2 : 1,
        }}
      />
      <MapPin
        outlet={{ ...outlet }}
        isHovered={hoveredOutletId === outlet.id}
        onMouseOver={handleMarkerMouseOver}
        onMouseOut={handleMarkerMouseOut}
      >
        <Popup>
          <OutletInfo outlet={outlet} isPopup = {true} />
        </Popup>
      </MapPin>
    </React.Fragment>
  );
};

export default PinWithRadius;