import React, {useEffect, useState, useContext, useRef} from 'react';
import {useParams, Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import axios from "axios";
import {API_BASE, API_IMAGE, API_KEY} from "../../constants/api";
import Spinner from "../../components/Spinner/Spinner";
import {LanguageContext} from "../../context/LanguageContext";
import './ActorInfo.css'


const ActorInfo = () => {
  const {id} = useParams()
  const {language} = useContext(LanguageContext)

  const biographyRef = useRef(null)
  const [actor, setActor] = useState({})
  const [loading, setLoading] = useState(true)
  const [biography, setBiography] = useState(false)
  const [filmography, setFilmography] = useState([])
  const [crew, setCrew] = useState([])

  useEffect(() => {
    axios(`${API_BASE}/person/${id}?${API_KEY}&language=${language}`)
      .then(({data}) => {
        setActor(data)
      })
      .finally(() => setLoading(false))

    axios(`${API_BASE}/person/${id}/combined_credits?${API_KEY}&language=${language}`)
      .then(({data}) => {
        setFilmography(data.cast?.sort((a, b) => {
          return b.release_date?.slice(0, 4) - a.release_date?.slice(0, 4)
        }))

        setCrew(data.crew?.sort((a, b) => {
          return b.release_date?.slice(0, 4) - a.release_date?.slice(0, 4)
        }))
      })

  }, [id, language])

  // useEffect(() => {
  //   if (!loading && parseInt(window.getComputedStyle(biographyRef.current).height) < 300) {
  //     setBiography(true)
  //   }
  // }, [loading])

  if (loading) return <Spinner/>

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-md-3 py-4">
          <img src={`${API_IMAGE}/w400${actor.profile_path}`} alt={actor.name} className="w-100 rounded-3"/>
        </div>
        <div className="col-md-9 py-4 ps-4">
          <h1 className="mb-4">{actor.name}</h1>
          <div className="fs-4 fw-bold mb-2">
            <FormattedMessage id="biography"/>
          </div>
          <div ref={biographyRef} className={`position-relative ${!biography && "biography"}`}>
            <p>{actor.biography || "Нет информации"}</p>
            <div hidden={biography} className="gradient"></div>
          </div>
          <button
            onClick={() => setBiography(true)}
            className={`${biography ? "d-none" : "d-block"} border-0 bg-transparent fs-5 text-primary ms-auto`}
            type="button"
          >
            <FormattedMessage id="read_more"/>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-9">
          <h2>
            <FormattedMessage id="filmography"/>
          </h2>
          <div className="filmography">
            {
              filmography?.map(film => {
                return (
                  <div key={film.credit_id} className="film-row">
                    <div className="me-4">
                      {film.release_date?.slice(0, 4) || film.first_air_date?.slice(0, 4)}
                    </div>
                    <div className="me-2 fw-bold">
                      {
                        film.media_type === 'movie'
                          ? <Link to={`/films/${film.id}`}>
                              {film.title}
                            </Link>
                          : <Link to={`/serials/${film.id}`}>
                              {film.name}
                            </Link>
                      }
                    </div>
                    <div className="fst-italic">
                      <FormattedMessage id="as"/>
                      {film.character}
                    </div>
                  </div>
                )
              })
            }
          </div>


          <h2>
            <FormattedMessage id="filmography_crew"/>
          </h2>
          <div className="filmography">
            {
              crew?.map(film => {
                return (
                  <div key={film.credit_id} className="film-row">
                    <div className="me-4">
                      {film.release_date?.slice(0, 4) || film.first_air_date?.slice(0, 4)}
                    </div>
                    <div className="me-2 fw-bold">
                      {
                        film.media_type === 'movie'
                          ? <Link to={`/films/${film.id}`}>
                            {film.title}
                          </Link>
                          : <Link to={`/serials/${film.id}`}>
                            {film.name}
                          </Link>
                      }
                    </div>
                    <div className="fst-italic"> - {film.job}</div>
                  </div>
                )
              })
            }
          </div>

        </div>
      </div>
    </div>
  );
};

export default ActorInfo;