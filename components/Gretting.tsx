'use client';
import React from 'react';

const Gretting: React.FC = () => {
    const handleClick = () => {
        const element = document.getElementById('guestFormFormik');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <button
                onClick={handleClick}
                className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded-lg hover:bg-gray-200"
                style={{ backgroundColor: "#FFFFFF00", color: "#DE967D", borderColor: "#DE967D", borderWidth: "2px" }}
            >
                RSVP
            </button>
        </div>
    );
};

export default Gretting;