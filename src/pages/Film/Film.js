import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import axios from "axios";
import './Film.css'

import {API_BASE, API_KEY} from "../../constants/api";
import FilmHero from "../../components/FilmHero/FilmHero";
import ActorsTrack from "../../components/ActorsTrack/ActorsTrack";
import Trailers from "../../components/Trailers/Trailers";
import Spinner from "../../components/Spinner/Spinner";


const Film = () => {
  const {id} = useParams()

  const [film, setFilm] = useState({})
  const [actors, setActors] = useState([])
  const [crew, setCrew] = useState([])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const jobs = ["Director", "Screenplay", "Original Music Composer", "Writer"]

    const p1 = axios(`${API_BASE}/movie/${id}?${API_KEY}&language=ru`)
      .then(({data}) => {
        setFilm(data)
      })

    const p2 = axios(`${API_BASE}/movie/${id}/credits?${API_KEY}`)
      .then(({data}) => {
        setActors(data.cast)
        setCrew(data.crew.filter(it => jobs.includes(it.job)))
      })

    const p3 = axios(`${API_BASE}/movie/${id}/videos?${API_KEY}&language=ru,en`)
      .then(({data}) => setVideos(data.results))

    Promise.all([p1,p2,p3])
      .catch((e) => console.log(e))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Spinner/>

  return (
    <>
      <FilmHero film={film} crew={crew}/>

      <div className="px-1 px-sm-5">
        <div className="row">
          <div className="col-md-9">
            <ActorsTrack actors={actors}/>
          </div>
          <div className="col-md-3 px-5">
            <div className="box">
              <div className="fw-bold fs-4">Статус:</div>
              <div className="fs-5">{film.status}</div>
              <hr/>
              <div className="fw-bold fs-4">Бюджет:</div>
              <div className="fs-5 mb-4">$ {film.budget?.toLocaleString('en')}</div>
              <div className="fw-bold fs-4">Сборы:</div>
              <div className="fs-5">$ {film.revenue?.toLocaleString('en')}</div>
              <hr/>
              <div className="fw-bold fs-4 text-break">Продолжительность:</div>
              <div className="fs-5 mb-4">{Math.trunc(film.runtime / 60)} ч. {film.runtime % 60} мин.</div>
              <div className="fw-bold fs-4">Исходный язык:</div>
              <div className="fs-5">{film.original_language}</div>
              <hr/>
              <div className="fw-bold fs-4">Страны производства:</div>
              <ul className="fs-5 mb-4">{film.production_countries?.map((country,idx) => {
                return <li key={idx}>{country.name}</li>
              })}</ul>
              <div className="fw-bold fs-4">Компании:</div>
              <ul className="fs-5 mb-4">{film.production_companies?.map(company => {
                return <li key={company.id}>{company.name}</li>
              })}</ul>
            </div>
          </div>
        </div>
      </div>

      <Trailers videos={videos}/>
    </>
  );
};

export default Film;