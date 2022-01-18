import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {IntlProvider} from "react-intl";
import LOCALES from "./intl/locales";
import messages from "./intl/messages";
import {LanguageContext} from "./context/LanguageContext";
import Main from "./pages/Main/Main";
import AllFilms from "./pages/AllFilms/AllFilms";
import Header from "./components/Header/Header";
import Film from "./pages/Film/Film";
import Footer from "./components/Footer/Footer";
import AllSerials from "./pages/AllSerials/AllSerials";
import Serial from "./pages/Serial/Serial";
import ActorInfo from "./pages/ActorInfo/ActorInfo";
import SearchResults from "./pages/SearchResults/SearchResults";


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
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/search/:query" element={<SearchResults/>}/>
            <Route path="/films" element={<AllFilms/>}/>
            <Route path="/films/:id" element={<Film/>}/>
            <Route path="/serials" element={<AllSerials/>}/>
            <Route path="/serials/:id" element={<Serial/>}/>
            <Route path="/actors/:id" element={<ActorInfo/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </IntlProvider>
  );
};

export default App;