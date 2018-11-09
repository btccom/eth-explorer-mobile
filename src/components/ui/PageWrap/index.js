import React from 'react';
import PageLoading from '../PageLoading';
const loadingContainer = {
  marginTop: 100,
  marginLeft: 'auto',
  marginRight: 'auto',
  height: 360
};

const PageWrap = props => {
  const { loading, children } = props;
  return (
    <div>
      {loading ? (
        <div style={loadingContainer}>
          <PageLoading />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
export default PageWrap;
