import { createContext, useState } from 'react'
import uiContents from '@data/uiContents.json';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [contacts, setContacts] = useState();
  const [userLang, setUserLang] = useState(null);

  return (
    <AppContext.Provider
      value={{
        uiContents,
        contacts,
        setContacts,
        userLang,
        setUserLang
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
