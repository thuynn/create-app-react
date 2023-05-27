import React from 'react';

const Card = ({ info = {}, onClick = () => { }, isSelected = false }) => {
  const cssClass = ["flex","align-items-center", "gap-5", "font-size--default"];

  if (isSelected === true) {
    cssClass.push("card-selected");
  }

  return (
    <div className={cssClass.join(" ")} onClick={onClick}>
      <div className="font-type M-font radius-3 p-3" data-message={info["color-blind-label"]} style={{ backgroundColor: info.color}}>
        {info.abbr}
      </div>
      <div className="description">
        {info.label}
      </div>
    </div>
  )
};

export default Card;