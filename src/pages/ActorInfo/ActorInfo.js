import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_BASE, API_IMAGE, API_KEY} from "../../constants/api";
import {useParams} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import './ActorInfo.css'

const ActorInfo = () => {
  const {id} = useParams()
  const [actor, setActor] = useState({})
  const [loading, setLoading] = useState(true)
  const [biography, setBiography] = useState(false)

  useEffect(() => {
    axios(`${API_BASE}/person/${id}?${API_KEY}&language=ru`)
      .then(({data}) => {
        setActor(data)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Spinner/>

  return (
    <div className="container">
      <div className="row">
        <div className="col-3 py-4">
          <img src={`${API_IMAGE}/w400${actor.profile_path}`} alt={actor.name} className="w-100 rounded-3"/>
        </div>
        <div className="col-9 py-4 ps-4">
          <h1 className="mb-4">{actor.name}</h1>
          <div className="fs-4 fw-bold mb-2">Биография:</div>
          <div className={`position-relative ${!biography && "biography"}`}>
            <p>{actor.biography || "Нет информации"}</p>
            <div hidden={biography} className="gradient"> </div>
          </div>
          <button
            onClick={() => setBiography(true)}
            className={`${biography ? "d-none" : "d-block"} border-0 bg-transparent fs-5 text-primary ms-auto`}
            type="button"
          >
            Читать далее...
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActorInfo;