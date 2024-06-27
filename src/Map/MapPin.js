import React, { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import mapPinIcon from "../asset/mapPin.svg";

const MapPin = ({ outlet, isHovered, onMouseOver, onMouseOut, children }) => {
    const normalIcon = useMemo(() => L.icon({
        iconUrl: mapPinIcon,
        iconSize: [25, 25]
      }), []);
    
      const hoverIcon = useMemo(() => L.icon({
        iconUrl: mapPinIcon,
        iconSize: [64, 64]  // Larger size for hover state
      }), []);

    return (
        <Marker
        position={[outlet.latitude, outlet.longitude]}
        icon={isHovered ? hoverIcon : normalIcon}
        eventHandlers={{
            mouseover: () => onMouseOver(outlet.id),
            mouseout: onMouseOut,
        }}
        >
        {children}
        </Marker>
    );
    };

export default MapPin;