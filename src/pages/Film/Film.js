import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom'
import axios from "axios";
import {FormattedMessage} from 'react-intl'

import {API_BASE, API_KEY} from "../../constants/api";
import FilmHero from "../../components/FilmHero/FilmHero";
import ActorsTrack from "../../components/ActorsTrack/ActorsTrack";
import Trailers from "../../components/Trailers/Trailers";
import Spinner from "../../components/Spinner/Spinner";
import {LanguageContext} from "../../context/LanguageContext";

const Film = () => {
  const {id} = useParams()
  const {language} = useContext(LanguageContext)

  const [film, setFilm] = useState({})
  const [actors, setActors] = useState([])
  const [crew, setCrew] = useState([])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const jobs = ["Director", "Screenplay", "Original Music Composer", "Writer"]

    const p1 = axios(`${API_BASE}/movie/${id}?${API_KEY}&language=${language}`)
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
  }, [id, language])

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
              <div className="fw-bold fs-4">
                <FormattedMessage id="status"/>
              </div>
              <div className="fs-5">{film.status}</div>
              <hr/>
              <div className="fw-bold fs-4">
                <FormattedMessage id="budget"/>
              </div>
              <div className="fs-5 mb-4">$ {film.budget?.toLocaleString('en')}</div>
              <div className="fw-bold fs-4">
                <FormattedMessage id="revenue"/>
              </div>
              <div className="fs-5">$ {film.revenue?.toLocaleString('en')}</div>
              <hr/>
              <div className="fw-bold fs-4 text-break">
                <FormattedMessage id="runtime"/>
              </div>
              <div className="fs-5 mb-4">{Math.trunc(film.runtime / 60)} ч. {film.runtime % 60} мин.</div>
              <div className="fw-bold fs-4">
                <FormattedMessage id="original_language"/>
              </div>
              <div className="fs-5">{film.original_language}</div>
              <hr/>
              <div className="fw-bold fs-4">
                <FormattedMessage id="production_countries"/>
              </div>
              <ul className="fs-5 mb-4">{film.production_countries?.map((country,idx) => {
                return <li key={idx}>{country.name}</li>
              })}</ul>
              <div className="fw-bold fs-4">
                <FormattedMessage id="companies"/>
              </div>
              <ul className="fs-5 mb-4">{film.production_companies?.map(company => {
                return <li key={company.id}>{company.name}</li>
              })}</ul>
            </div>
          </div>
        </div>
      </div>

      <Trailers videos={videos} id={film.id} type="movie"/>
    </>
  );
};

export default Film;