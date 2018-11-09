import React from 'react';
import './index.scss';
const List = ({ rows = [], style = {}, displaySplitline = true }) => {
  return (
    <div className="list-container" style={style}>
      {rows.map(item => {
        return (
          <div
            className={`list-row ${displaySplitline ? 'splitline' : ''}`}
            key={item.key}
          >
            <div className="list-row-simple">
              <span className="list-row-title">{item.title}</span>
              {!item.isValueWrap && (
                <div className="list-value-text">{item.render()}</div>
              )}
            </div>
            {item.isValueWrap && (
              <div className="list-row-content list-value-text">
                {item.render()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default List;
