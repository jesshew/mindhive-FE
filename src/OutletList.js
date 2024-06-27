import React from 'react';
import OutletInfo from './OutletInfo'; 
import './OutletList.css';


const OutletList = ({ outlets, handleMarkerMouseOver, handleMarkerMouseOut, hoveredOutletId }) => {
    return (
        <div className="outlet-list">
            {outlets.map((outlet) => (
                <div key={outlet.id} 
                className={`outlet-item ${hoveredOutletId === outlet.id ? 'highlighted' : ''}`}
                onMouseEnter={() => handleMarkerMouseOver(outlet.id)}
                onMouseLeave={handleMarkerMouseOut}>
                <OutletInfo outlet={outlet} />
                </div>
            ))}
        </div>
    );
};

export default OutletList;
