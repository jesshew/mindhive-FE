import React from 'react';
import OutletInfo from './OutletInfo';
import './OutletList.css';


const OutletList = ({ outlets, handleMarkerMouseOver, handleMarkerMouseOut, hoveredOutletId }) => {
    return (
        <div className="outlet-list">
            {outlets.length === 0 ? (
                <div className="empty-outlet-message">
                    <h6 className="outlet-name">{"No outlets available."}</h6>
                    The local server might be down (possible Pinggy issue).
                    Please run the backend locally and update <strong>API_BASE_URL</strong> in <em>constants.js</em> to <code>localhost</code>.
                </div>
            ) : (
                outlets.map((outlet) => (
                    <div key={outlet.id}
                        className={`outlet-item ${hoveredOutletId === outlet.id ? 'highlighted' : ''}`}
                        onMouseEnter={() => handleMarkerMouseOver(outlet.id)}
                        onMouseLeave={handleMarkerMouseOut}>
                        <OutletInfo outlet={outlet} />
                    </div>
                ))
            )}
        </div>
    );
};

export default OutletList;
