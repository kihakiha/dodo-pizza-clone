import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={468}
    viewBox="0 0 280 468"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="270" rx="12" ry="12" width="280" height="25" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="80" />
    <rect x="0" y="410" rx="10" ry="10" width="85" height="45" />
    <rect x="130" y="410" rx="10" ry="10" width="150" height="45" />
  </ContentLoader>
);

export default PizzaSkeleton;
