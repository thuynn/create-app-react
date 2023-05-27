import React from 'react';

const TabNav = ({ info = {}, isSelected = false, onClick = () => {} }) => {
  const cssClass = ["tab-item", "font-size--small", "cursor-pointer"];
  if (isSelected === true) {
    cssClass.push("tab-selected");
  }
  return (
    <div role="tab" tabIndex={isSelected ? 1 : -1} className={cssClass.join(" ")} onClick={onClick}>{info.label}</div>
  )
};

export default TabNav;