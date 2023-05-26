import React from 'react';

const TabNav = ({tabIndex= 0, info = {}, onClick = () => {}, isSelected = false}) => {  
  const cssClass = ["tab-item", "font-size--small", "cursor-pointer"];
  if (isSelected === true) {
    cssClass.push("tab-selected");
  }
  return(
      <div role="tab" tabIndex={tabIndex}  className={cssClass.join(" ")} onClick={() => onClick(info)} >{info.label}</div>
  )
};

export default TabNav;