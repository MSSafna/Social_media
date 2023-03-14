/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';

function SmallerCard({ children }) {
  return (
    <div className="bg-white shadow-md shadow-gray-300 rounded-xl pt-3 mb-4 w-/6 h-1/6 ml-5 mb-4 mt-3 p-4 ">
      {children}
    </div>
  );
}

export default SmallerCard;
