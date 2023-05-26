import React, { useState, useEffect, useReducer } from 'react';
import './App.scss';
import { getData } from './api/get';

import TabNav from './components/TabNav';
import TabContent from './components/TabContent';

const initTab = {
  tabs: [],
  selectedTab: null
};

const tabReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        tabs: action.data
      };
    case 'SELECT_TAB':
      return {
        ...state,
        selectedTab: action.selectedId
      };
    default:
      return state;
  }
};

function App() {

  const [tabNav, dispatch] = useReducer(tabReducer, initTab);
  const [currentEnpoint, setCurrentEnpoint] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        selectTab(resp[0]);
      },
      onError: () => {
        setErrorMessage("No internet connection!!!")
      }
    })
  }, []);

  const selectTab = (tabInfo) => {
    // click one tab
    dispatch({
      type: "SELECT_TAB",
      selectedId: tabInfo.id
    });
    setCurrentEnpoint(tabInfo.content_endpoint);
  };

  return (
    <div className="wrapper tab-container p-3">
      
      <header className="flex align-items-end flex-wrap gap-3 p-3 top-header">
        <h1 className="flex-1 font-size--large nowrap">Please select one font</h1>
        <div className="flex align-items-end flex-wrap gap-3 tab-nav">
        {
          tabNav.tabs.map((tab, index) => {
            return (
              <TabNav key={index} tabIndex={index + 1} info={tab} onClick={selectTab} isSelected={tab.id === tabNav.selectedTab} />
            )
          })
        }
        </div>
      </header>
      <section className="tab-content radius-2">
        <TabContent contentEndpoint={currentEnpoint}/>
        <div class="error align-center font-size--large p-6">{errorMessage}</div>
      </section>
    </div>
  );
}

export default App;
