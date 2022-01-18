import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {API_BASE, API_KEY} from "../../constants/api";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import MovieCard from "../../components/MovieCard/MovieCard";
import SerialCard from "../../components/SerialCard/SerialCard";

const SearchResults = () => {
  const {query} = useParams()
  const [movies, setMovies] = useState([])
  const [serials, setSerials] = useState([])
  // const [actors, setActors] = useState([])

  useEffect(() => {
    axios(`${API_BASE}/search/movie?${API_KEY}&query=${query}`)
      .then(({data}) => setMovies(data.results))

    axios(`${API_BASE}/search/tv?${API_KEY}&query=${query}`)
      .then(({data}) => setSerials(data.results))
  }, [query])

  return (
    <div className="container">
      <TransitionGroup className="row pt-4">
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
      <hr/>
      <TransitionGroup className="row pt-5">
        {
          serials.map(serial => {
            return (
              <CSSTransition
                key={serial.id}
                timeout={300}
                classNames="film"
              >
                <SerialCard serial={serial} />
              </CSSTransition>
            )
          })
        }
      </TransitionGroup>
    </div>
  );
};

export default SearchResults;