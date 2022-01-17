import React, {createContext, useState} from 'react'
import LOCALES from "../intl/locales";

export const LanguageContext = createContext()

const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState(LOCALES.RUSSIAN)

  return (
    <LanguageContext.Provider value={{language, setLanguage}}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider