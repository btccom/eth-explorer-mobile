import React from 'react';
import './index.scss';

const ListItem = ({
  title,
  render,
  isValueWrap,
  displaySplitline,
  isShow = true
}) => {
  return (
    isShow && (
      <div className={`list-row ${displaySplitline ? 'splitline' : ''}`}>
        <div className="list-row-simple">
          <span className="list-row-title">{title}</span>
          {!isValueWrap && <div className="list-value-text">{render()}</div>}
        </div>
        {isValueWrap && (
          <div className="list-row-content list-value-text">{render()}</div>
        )}
      </div>
    )
  );
};
const List = ({ rows = [], displaySplitline = true }) => {
  return (
    <div className="list-container">
      {rows.map(item => {
        return (
          <ListItem
            {...item}
            displaySplitline={displaySplitline}
            key={item.key}
          />
        );
      })}
    </div>
  );
};
export default List;
