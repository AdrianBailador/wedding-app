'use client';
import React, { useState } from 'react';
import GoogleMapComponent from './GoogleMap';
import GoogleMapRouteComponent from './GoogleMapRoute';
import '../styles/MapTabs.css';

type Tab = 'wedding' | 'party';

const MapTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('wedding');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'wedding':
        return (
          <div className="tab-content">
            <GoogleMapComponent />
            <img src="/iglesia.jpg" alt="Iglesia" className="tab-image" />
          </div>
        );
      case 'party':
        return (
          <div className="tab-content">
            <GoogleMapRouteComponent />
            <img src="/genilla.jpg" alt="Genila" className="tab-image" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'wedding' ? 'active' : ''}`}
          onClick={() => setActiveTab('wedding')}
        >
          Wedding Event
        </button>
        <button
          className={`tab ${activeTab === 'party' ? 'active' : ''}`}
          onClick={() => setActiveTab('party')}
        >
          Party Event
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
};

export default MapTabs;