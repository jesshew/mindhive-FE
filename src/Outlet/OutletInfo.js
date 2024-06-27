import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faDirections } from '@fortawesome/free-solid-svg-icons';
import './OutletList.css';

const OutletInfo = ({ outlet, isPopup = false }) => {
  return (
    <div className={`outlet-info ${isPopup ? 'popup' : ''}`}>
      <div className="outlet-header">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="outlet-icon" />
        <h6 className="outlet-name">{outlet.name}</h6>
      </div>
      <small className="outlet-address">{outlet.address}</small>
      <div className="outlet-hours">
        <FontAwesomeIcon icon={faClock} className="outlet-icon" />
        <span>Opening Hours:</span>
        <ul>
          {outlet.opening_hours.map((hours, index) => (
            <li key={index}>{hours}</li>
          ))}
        </ul>
      </div>
      <a 
        href={outlet.waze_link}
        target="_blank"
        rel="noopener noreferrer"
        className="waze-link"
      >
        <FontAwesomeIcon icon={faDirections} className="outlet-icon" />
        Navigate with Waze
      </a>
    </div>
  );
};

export default OutletInfo;