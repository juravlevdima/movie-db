import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {API_IMAGE} from "../../constants/api";

import './FilmHero.css'
import ImageModal from "../ImageModal/ImageModal";
import {FormattedMessage} from "react-intl";

const FilmHero = ({film, crew}) => {
  const [imageModal, setImageModal] = useState(false)
  const [voteAverage, setVoteAverage] = useState(0)
  const release_date = film.release_date?.slice(0, 4) || film.first_air_date?.slice(0, 4)

  useEffect(() => {
    setTimeout(() => setVoteAverage(film.vote_average), 50)
  })

  useEffect(() => {
    document.body.style.overflow = imageModal ? "hidden" : "auto"
  }, [imageModal])


  return (
    <section style={{
      background: `rgba(0,0,0,.7) url("${API_IMAGE}/original${film.belongs_to_collection?.backdrop_path || film.backdrop_path}") center/cover`,
      backgroundBlendMode: "darken"
    }} className="mb-5">
      <div className="container">
        <div className="row">
          <div className="col-sm-4 py-4">
            <div className="box">
              <div onClick={() => setImageModal(true)} className="position-relative">
                <img src={`${API_IMAGE}/w400${film.poster_path}`} alt={film.title} className="w-100 poster"/>
                <span className="text-on-image">
                  <FormattedMessage id="expand"/>
                </span>
              </div>
            </div>
          </div>
          <div className="col-sm-8 py-4 px-4">
            <div className="box text-light">

              <h1>{film.title || film.name} ({release_date})</h1>
              <div className="mb-3">
                {film.original_title || film.original_name} &bull;&nbsp;
                {film.release_date || film.first_air_date} &bull;&nbsp;
                {film.genres?.map(genre => genre.name).join(' / ')}
              </div>

              <div className="d-flex align-items-center mb-3">
                <div className="rating me-3">
                  <CircularProgressbar
                    value={voteAverage * 10 || 0}
                    text={`${film.vote_average * 10 || 0}%`}
                    styles={buildStyles({
                      textSize: '28px',
                      pathTransitionDuration: 2.0
                    })}
                  />
                </div>
                <div className="fw-bold fs-5">
                  <FormattedMessage id="user_score"/>
                </div>
              </div>

              <h3>
                <FormattedMessage id="overview"/>
              </h3>
              <div className="mb-3">{film.overview}</div>

              <div className="row">
                {
                  crew.map(it => {
                    return (
                      <div key={it.credit_id} className="col-4 mb-2">
                        <div className="fw-bold">{it.job || "Created by"}:</div>
                        <Link to={`/actors/${it.id}`} className="text-white">{it.name}</Link>
                      </div>
                    )
                  })
                }
              </div>

            </div>
          </div>
        </div>
      </div>

      {imageModal && <ImageModal image={film.poster_path} setModal={setImageModal}/>}
    </section>
  );
};

export default FilmHero;