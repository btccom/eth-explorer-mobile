import React from 'react';
import moment from 'moment';
import { Tooltip } from 'antd';
const UTCTooltip = ({ secondTimestamp, children, containerId }) => {
  return (
    <Tooltip
      title={`UTC+0 : ${moment
        .utc(new Date(secondTimestamp * 1000))
        .format('YYYY-MM-DD HH:mm:ss')}`}
      getPopupContainer={() => document.getElementById(containerId)}
    >
      {children}
    </Tooltip>
  );
};
export default UTCTooltip;
