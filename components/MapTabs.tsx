'use client';
import React, { useState } from 'react';
import GoogleMapComponent from './GoogleMap';
import GoogleMapRouteComponent from './GoogleMapRoute';
import '../styles/MapTabs.css';
import Image from 'next/image';

type Tab = 'wedding' | 'party';

const MapTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('wedding');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'wedding':
        return (
          <div className="tab-content">
            <GoogleMapComponent />
            <Image src="/iglesia.jpg" alt="Iglesia" className="tab-image" width={800} height={600} />
          </div>
        );
      case 'party':
        return (
          <div className="tab-content">
            <GoogleMapRouteComponent />
            <Image src="/genilla.jpg" alt="Genilla" className="tab-image" width={800} height={600} />
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
