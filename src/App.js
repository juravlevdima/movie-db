import React, {useContext} from 'react';
import {IntlProvider} from "react-intl";
import LOCALES from "./intl/locales";
import messages from "./intl/messages";
import {LanguageContext} from "./context/LanguageContext";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./AppRoutes.js";


const App = () => {
  const {language: locale} = useContext(LanguageContext)

  return (
    <IntlProvider
      messages={messages[locale]}
      locale={locale}
      defaultLocale={LOCALES.RUSSIAN}
    >
      <div className="wrapper">
        <Header/>
        <main className="main">
          <AppRoutes/>
        </main>
        <Footer/>
      </div>
    </IntlProvider>
  )
}

export default App
