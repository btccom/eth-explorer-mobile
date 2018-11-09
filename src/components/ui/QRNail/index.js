import React from 'react';
import QRCode from 'qrcode.react';
import { Popover } from 'antd';
import './index.scss';
const QRNail = ({ value, title, containerId }) => {
  return (
    <div
      className="qr-nail"
      style={{ display: 'inline-block', cursor: 'pointer' }}
    >
      <Popover
        content={<QRCode value={value} size={280} />}
        title={title}
        trigger="click"
        getPopupContainer={() => document.getElementById(containerId)}
      >
        <i className="cell-icon qr-thumbnail-icon" />
      </Popover>
    </div>
  );
};
export default QRNail;
