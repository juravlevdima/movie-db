import React from 'react';
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {API_IMAGE} from "../../constants/api";

import './FilmHero.css'

const FilmHero = ({film, crew}) => {
  const release_date = film.release_date?.slice(0, 4) || film.first_air_date?.slice(0, 4)

  return (
    <section style={{
      background: `rgba(0,0,0,.7) url("${API_IMAGE}/original${film.belongs_to_collection?.backdrop_path || film.backdrop_path}") center/cover`,
      backgroundBlendMode: "darken"
    }} className="mb-5">
      <div className="container">
        <div className="row">
          <div className="col-sm-4 py-4">
            <div className="box">
              <img src={`${API_IMAGE}/w400${film.poster_path}`} alt={film.title} className="w-100"/>
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
                    value={film.vote_average * 10 || 0}
                    text={`${film.vote_average * 10 || 0}%`}
                    styles={buildStyles({
                      textSize: '28px',
                      pathTransitionDuration: 2.5
                    })}
                  />
                </div>
                <div className="fw-bold fs-5">Оценка зрителей</div>
              </div>

              <h3>Обзор:</h3>
              <div className="mb-3">{film.overview}</div>

              <div className="row">
                {
                  crew.map(it => {
                    return (
                      <div key={it.id} className="col-4 mb-2">
                        <div className="fw-bold">{it.job || "Created by"}:</div>
                        <div>{it.name}</div>
                      </div>
                    )
                  })
                }
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmHero;