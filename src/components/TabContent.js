import React, { useEffect, useReducer } from 'react';
import { getData } from '../api/get';
import Card from './Card';

const initTabContent = {
  type: "",
  content: null,
  selectedCard: null
};

const contentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTENT':
      return {
        ...state,
        ...action.data
      }
    case 'SELECT_CARD':
      return {
        ...state,
        selectedCard: action.selectedId
      }
    default:
      return state;
  }
};

const TabContent = ({ contentEndpoint = "" }) => {

  const [tabContent, dispatch] = useReducer(contentReducer, initTabContent);

  useEffect(() => {
    if (contentEndpoint !== "") {
      // load content of tab
      getData({
        path: contentEndpoint,
        onSuccess: (resp) => {
          // set data;
          dispatch({
            data: resp,
            type: 'SET_CONTENT'
          });
        }
      });
    }
  }, [contentEndpoint]);


  const selectCard = (cardInfo) => {
    dispatch({
      type: "SELECT_CARD",
      selectedId: cardInfo.id
    });
  };

  if (tabContent && tabContent.type === "Font selection") {
    return (
      <ul className="list-cards box-grid box-grid-row align-items-start gap-5 m-1 p-6">
        {
          tabContent.content.map((card, index) => {
            return (
              <li className="card box-sm-12 box-md-6" key={index} tabIndex={index + 3}>
                <Card info={card} onClick={selectCard} isSelected={card.id === tabContent.selectedCard}/>
              </li>
            );
          })
        }
      </ul>
    );
  }

  if (tabContent && tabContent.type === "Text") {
    return (
      <p className="align-center p-6 font-size--default">
        {tabContent.content}
      </p>
    );
  }
  
  return null;
};

export default TabContent;