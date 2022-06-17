import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { API_BASE, API_IMAGE, API_KEY } from "../../constants/api.js";
import { LanguageContext } from "../../context/LanguageContext.js";
import './Popular.css'
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Popular = () => {
  const {language} = useContext(LanguageContext)
  const [popular, setPopular] = useState([])

  useEffect(() => {
    axios(`${API_BASE}/movie/top_rated?${API_KEY}&language=${language}`)
      .then(({ data }) => setPopular(data.results))
  }, [language])

  return (
    <section className="container">
      <h2 className="pt-4 pb-2">
        <FormattedMessage id="popular"/>
      </h2>
      <div className="d-flex overflow-auto">
        {
          popular.map(film => {
            return (
              <div className="px-2" key={film.id}>
                <Link to={`/films/${film.id}`} className="text-decoration-none">
                  <img className="popular-poster pb-2" src={`${API_IMAGE}/w300${film.poster_path}`} alt={film.title}/>
                  <h3 className="text-center">
                    {film.title}
                  </h3>
                </Link>
              </div>
            )
          })
        }
      </div>
    </section>
  );
};

export default Popular;