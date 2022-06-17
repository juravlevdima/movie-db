import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main.js";
import SearchResults from "./pages/SearchResults/SearchResults.js";
import AllFilms from "./pages/AllFilms/AllFilms.js";
import Film from "./pages/Film/Film.js";
import AllSerials from "./pages/AllSerials/AllSerials.js";
import Serial from "./pages/Serial/Serial.js";
import ActorInfo from "./pages/ActorInfo/ActorInfo.js";

const AppRoutes = () => {
  return (
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
  );
};

export default AppRoutes;
