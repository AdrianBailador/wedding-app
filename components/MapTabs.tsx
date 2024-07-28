'use client';
import React, { useState } from 'react';
import GoogleMapComponent from './GoogleMap';
import GoogleMapRouteComponent from './GoogleMapRoute';
import Image from 'next/image';

type Tab = 'wedding' | 'party';

const MapTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('wedding');

  const renderTabContent = () => {
    return (
      <div className="tab-content flex flex-col md:flex-row justify-center items-center">
        <div className="map-container w-[400px] h-[400px]">
          {activeTab === 'wedding' ? <GoogleMapComponent /> : <GoogleMapRouteComponent />}
        </div>
        <div className="image-container ml-0 mt-5 md:mt-0 md:ml-5 w-[400px] h-[400px]">
          <Image
            src={activeTab === 'wedding' ? '/iglesia.jpg' : '/genilla.jpg'}
            alt={activeTab === 'wedding' ? 'Iglesia' : 'Genilla'}
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="tabs-container w-full text-center my-5">
      <div className="tabs flex justify-center mb-5">
        <button
          className={`tab px-5 py-2 mx-2 border-2 cursor-pointer transition-colors duration-300 ${activeTab === 'wedding' ? 'bg-[#A0A48E] text-white' : 'bg-white text-[#545748]'}`}
          onClick={() => setActiveTab('wedding')}
        >
          Wedding Event
        </button>
        <button
          className={`tab px-5 py-2 mx-2 border-2 cursor-pointer transition-colors duration-300 ${activeTab === 'party' ? 'bg-[#A0A48E] text-white' : 'bg-white text-[#545748]'}`}
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
