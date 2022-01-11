import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import Main from "./pages/Main/Main";
import AllFilms from "./pages/AllFilms/AllFilms";
import Header from "./components/Header/Header";
import Film from "./pages/Film/Film";
import Footer from "./components/Footer/Footer";
import AllSerials from "./pages/AllSerials/AllSerials";
import Serial from "./pages/Serial/Serial";
import ActorInfo from "./pages/ActorInfo/ActorInfo";

const App = () => {
  return (
    <div className="wrapper">
      <Header/>
      <main className="main">
        <Routes>
          <Route path="/" element={<Main/>}/>
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
  );
};

export default App;