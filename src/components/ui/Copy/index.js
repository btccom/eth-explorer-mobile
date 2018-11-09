import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Toast } from 'antd-mobile';

const Copy = props => {
  const { text = '', handleCopy } = props;
  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        handleCopy && handleCopy();
        Toast.info('Copied', 1);
      }}
    >
      <i className="inline-icon copy-icon" />
    </CopyToClipboard>
  );
};
export default Copy;
