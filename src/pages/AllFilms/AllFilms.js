import React, {useContext, useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {API_BASE, API_KEY} from "../../constants/api";
import MovieCard from "../../components/MovieCard/MovieCard";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";
import {LanguageContext} from "../../context/LanguageContext";

const AllFilms = () => {
  const {language} = useContext(LanguageContext)
  const [query, setQuery] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(+query.get("page") || 1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios(`${API_BASE}/discover/movie?${API_KEY}&language=${language}&page=${page}`)
      .then(({data}) => setMovies(data.results))
      .finally(() => setLoading(false))
  }, [page, language])

  if (loading) return <Spinner/>

  return (
    <div className="container">
      <Pagination page={page} setPage={setPage} setQuery={setQuery}/>
      <TransitionGroup className="row">
        {
          movies.map(film => {
            return (
              <CSSTransition
                key={film.id}
                timeout={300}
                classNames="film"
              >
                <MovieCard film={film} />
              </CSSTransition>
            )
          })
        }
      </TransitionGroup>
      <div className="mb-5 d-flex justify-content-end">
        <Pagination page={page} setPage={setPage} setQuery={setQuery}/>
      </div>
    </div>
  );
};

export default AllFilms;