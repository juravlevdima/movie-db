import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import axios from "axios";

import {API_BASE, API_KEY} from "../../constants/api";
import FilmHero from "../../components/FilmHero/FilmHero";
import ActorsTrack from "../../components/ActorsTrack/ActorsTrack";
import Trailers from "../../components/Trailers/Trailers";
import Spinner from "../../components/Spinner/Spinner";

const Serial = () => {
  const {id} = useParams()
  const [serial, setSerial] = useState({})
  const [actors, setActors] = useState([])
  const [crew, setCrew] = useState([])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // const jobs = ["Director", "Screenplay", "Original Music Composer", "Writer"]
    const p1 = axios(`${API_BASE}/tv/${id}?${API_KEY}&language=ru`)
      .then(({data}) => {
        setSerial(data)
        setCrew(data.created_by)
      })

    const p2 = axios(`${API_BASE}/tv/${id}/aggregate_credits?${API_KEY}`)
      .then(({data}) => {
        setActors(data.cast)
        // setCrew(data.crew.filter(it => jobs.includes(it.jobs[0].job)))
      })

    const p3 = axios(`${API_BASE}/tv/${id}/videos?${API_KEY}&language=ru,en`)
      .then(({data}) => setVideos(data.results))

    Promise.all([p1,p2,p3])
      .catch((e) => console.log(e))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Spinner/>

  return (
    <>
      <FilmHero film={serial} crew={crew}/>
      <div className="row">
        <div className="col-md-9">
          <ActorsTrack actors={actors}/>
        </div>
        <div className="col-md-3 px-5">
          <div className="box">
            <div className="fw-bold fs-4">Статус:</div>
            <div className="fs-5">{serial.status}</div>
            <hr/>
            <div className="fw-bold fs-4 text-break">Сезонов:</div>
            <div className="fs-5 mb-4">{serial.number_of_seasons}</div>
            <div className="fw-bold fs-4 text-break">Количество эпизодов:</div>
            <div className="fs-5 mb-4">{serial.number_of_episodes}</div>
            <div className="fw-bold fs-4">Исходный язык:</div>
            <div className="fs-5">{serial.original_language}</div>
            <hr/>
            <div className="fw-bold fs-4">Страны производства:</div>
            <ul className="fs-5 mb-4">{serial.production_countries?.map((country,idx) => {
              return <li key={idx}>{country.name}</li>
            })}</ul>
            <div className="fw-bold fs-4">Компании:</div>
            <ul className="fs-5 mb-4">{serial.production_companies?.map(company => {
              return <li key={company.id}>{company.name}</li>
            })}</ul>
          </div>
        </div>
      </div>
      <Trailers videos={videos} id={serial.id} type="tv"/>
    </>
  );
};

export default Serial;