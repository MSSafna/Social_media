/* eslint-disable no-unused-vars */
import React from 'react';
import RecommendedAvatar from '../Smallercards/RecommendedAvatar';
import SmallerCard from '../Smallercards/SmallerCard';

function Recommanded() {
  return (
    <div>
      <div className="font-medium  text-xl ml-5">
        Recommanded for you
      </div>
      <div className="flex gap-1 ml-4">
        <SmallerCard>
          <div>
            <RecommendedAvatar />
          </div>
        </SmallerCard>
        <SmallerCard>
          <div>
            <RecommendedAvatar />
          </div>
        </SmallerCard>
        <SmallerCard>
          <div>
            <RecommendedAvatar />
          </div>
        </SmallerCard>
        <SmallerCard>
          <div>
            <RecommendedAvatar />
          </div>
        </SmallerCard>
        <SmallerCard>
          <div>
            <RecommendedAvatar />
          </div>
        </SmallerCard>

      </div>

    </div>
  );
}

export default Recommanded;
