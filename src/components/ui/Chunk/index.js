import React from 'react';
import './index.scss';
/**
 * type:primary|secondary
 *
 */
const Chunk = ({
  type = 'primary',
  children,
  paddings = ['auto', 'auto', 'auto', 'auto'],
  //mode = 'default',
  style
}) => {
  const [paddingTop, paddingRight, paddingBottom, paddingLeft] = [...paddings];

  return (
    <div
      className={`chunk chunk-${type}`}
      style={{ ...style, paddingTop, paddingRight, paddingBottom, paddingLeft }}
    >
      {children}
    </div>
  );
};

export default Chunk;
