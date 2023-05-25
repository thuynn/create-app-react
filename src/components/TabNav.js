import React from 'react';

const TabNav = ({info = {}, onClick = () => {}, isSelected = false}) => {  
  const cssClass = ["tab-item", "font-size--Xsmall"];

  if (isSelected === true) {
    cssClass.push("tab-selected");
  }

  return(
    <a href='#1'  className={cssClass.join(" ")} onClick={() => onClick(info)} >{info.label}</a>
  )
};

export default TabNav;