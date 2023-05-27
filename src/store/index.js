import React from 'react';

export const initTab = {
  tabs: [],
  selectedIndex: null
};

export const tabReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        tabs: action.data
      };
    case 'SELECT_TAB':
      return {
        ...state,
        selectedIndex: action.selectedIndex
      };
    default:
      return state;
  }
};

export const initTabContent = {
  type: "",
  content: null,
  selectedCard: null
};

export const tabContentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTENT':
      return {
        ...state,
        ...action.data
      }
    case 'SELECT_CARD':
      return {
        ...state,
        selectedCard: action.selectedCard
      }
    default:
      return state;
  }
};


export const TabContext = React.createContext();

export const useTabContext = () => React.useContext(TabContext);