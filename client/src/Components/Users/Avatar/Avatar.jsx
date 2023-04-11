
import React from 'react';

function Avatar({ size, url }) {
  let width = '12';
  let height = '12';
  if (size === 'lg') {
    width = '32';
    height = '32';
  } else if (size === 'sm') {
    width = '10';
    height = '10';
  }
  return (
    <div>
      <div className={`w-${width} rounded-full  h-${height} overflow-hidden`}>
        {url ? (
          <img src={url} className={`h-${height}`} />
        ) : (<img src="/images/profile.png" className={`h-${height}`} />)}

      </div>
    </div>

  );
}

export default Avatar;
