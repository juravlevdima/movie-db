import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {API_BASE, API_KEY} from "../../constants/api";
import MovieCard from "../../components/MovieCard/MovieCard";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";

const AllFilms = () => {
  const [query, setQuery] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(+query.get("page") || 1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios(`${API_BASE}/discover/movie?${API_KEY}&language=ru&page=${page}`)
      .then(({data}) => {
        setMovies(data.results)
        setLoading(false)
      })
  }, [page])

  if (loading) return <Spinner/>

  return (
    <div className="container">
      <Pagination page={page} setPage={setPage} setQuery={setQuery}/>
      <div className="row">
        {
          movies.map(film => {
            return <MovieCard key={film.id} film={film} />
          })
        }
      </div>
      <div className="mb-5 d-flex justify-content-end">
        <Pagination page={page} setPage={setPage}/>
      </div>
    </div>
  );
};

export default AllFilms;