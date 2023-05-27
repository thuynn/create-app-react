import React, { useEffect } from 'react';
import { useTabContext } from '../store';
import { getData } from '../api/get';

import Card from './Card';

const TabContent = ({ startIndex = 0, contentEndpoint = "", setErrorMessage = () => { } }) => {

  const [tabContent, dispatchContent] = useTabContext();

  useEffect(() => {
    if (contentEndpoint !== "") {
      // load content of tab
      getData({
        path: contentEndpoint,
        onSuccess: (resp) => {
          // set data;
          dispatchContent({
            data: resp,
            type: 'SET_CONTENT'
          });
        },
        onError: () => {
          setErrorMessage("Get Content Tab Error");
        }
      });
    }
  }, [contentEndpoint]);


  const selectCard = (cardId) => {
    dispatchContent({
      type: "SELECT_CARD",
      selectedCard: cardId
    });
  };

  if (tabContent && tabContent.type === "Font selection") {
    return (
      <ul role="tabpanel" className="list-cards box-grid box-grid-row align-items-start gap-5 m-1 p-6">
        {
          tabContent.content.map((card, index) => {
            return (
              <li data-card={card.id} className="card box-sm-12 box-md-6 cursor-pointer" key={index} tabIndex={startIndex + index} role="button">
                <Card info={card} onClick={() => selectCard(card.id)} isSelected={card.id === tabContent.selectedCard} />
              </li>
            );
          })
        }
      </ul>
    );
  }

  if (tabContent && tabContent.type === "Text") {
    return (
      <p role="tabpanel" className="align-center p-6 font-size--default">
        {tabContent.content}
      </p>
    );
  }

  return null;
};

export default TabContent;