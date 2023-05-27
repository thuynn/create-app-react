import React, { useState, useEffect, useReducer } from 'react';
import './App.scss';
import { getData } from './api/get';

import TabNav from './components/TabNav';
import TabContent from './components/TabContent';
import {TabContext, initTab, tabReducer, initTabContent, tabContentReducer } from './store';

function App() {

  const [errorMessage, setErrorMessage] = useState("");

  const [tabNav, dispatch] = useReducer(tabReducer, initTab);
  const [tabContent, dispatchContent] = useReducer(tabContentReducer, initTabContent);

  useEffect(() => {
    // load tabs
    getData({
      path: "tabs",
      onSuccess: (resp) => {
        // set data tabs;
        dispatch({
          data: resp,
          type: "SET_DATA"
        });

        // auto select first tab; 
        selectTab(0);
      },
      onError: () => {
        setErrorMessage("Get Tabs Error");
      }
    });

    window.addEventListener("keyup", handleKeyPress);

    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    }
  }, []);

  const selectTab = (index) => {
    // click one tab
    dispatch({
      type: "SELECT_TAB",
      selectedIndex: index
    });
  };

  const handleKeyPress = (evt) => {
    const { selectedIndex, length } = tabNav;
    if (evt.key === "ArrowRight") {
      selectTab(selectedIndex + 1 > length - 1 ? length - 1 : selectedIndex + 1);
    } else if (evt.key === "ArrowLeft") {
      selectTab(selectedIndex - 1 < 0 ? 0 : selectedIndex - 1);
    } else if (evt.key === "Enter") {
      const activeElement = document.activeElement;
      const cardId = activeElement.dataset.card;

      if (cardId !== null) {
        dispatchContent({
          type: "SELECT_CARD",
          selectedCard: Number(cardId)
        });
      }
    }
  };

  const currentContent = tabNav.tabs[tabNav.selectedIndex];

  return (
    <TabContext.Provider value={[tabContent, dispatchContent]}>
      <div className="wrapper tab-container p-3">
        <header className="flex align-items-end flex-wrap gap-3 p-3 top-header">
          <h1 className="flex-1 font-size--large nowrap">Please select one font</h1>
          <div className="flex align-items-end flex-wrap gap-3 tab-nav">
            {
              tabNav.tabs.map((tab, index) => {
                return (
                  <TabNav key={index} info={tab} onClick={() => selectTab(index)} isSelected={index === tabNav.selectedIndex} />
                )
              })
            }
          </div>
        </header>

        <section className="tab-content radius-2">
          {
            currentContent != null ? <TabContent contentEndpoint={currentContent.content_endpoint} setErrorMessage={setErrorMessage} startIndex={tabNav.tabs.length} /> : <div className="error align-center font-size--large p-6" >{errorMessage}</div>
          }
        </section>
      </div>
    </TabContext.Provider>
  );
}

export default App;
