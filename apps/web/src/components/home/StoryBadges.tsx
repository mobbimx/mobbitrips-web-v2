'use client';

import CountUp from 'react-countup';

export function StoryBadges() {
  return (
    <>
      <div className="story__badge story__badge--white">
        <p className="story__badge-val">
          +
          <CountUp end={50} duration={2} enableScrollSpy scrollSpyOnce />
        </p>
        <p className="story__badge-label">estancias felices</p>
      </div>
      <div className="story__badge story__badge--coral">
        <p className="story__badge-val">
          <CountUp end={4.9} decimals={1} duration={1.8} enableScrollSpy scrollSpyOnce />★
        </p>
        <p className="story__badge-label">calificación</p>
      </div>
    </>
  );
}
