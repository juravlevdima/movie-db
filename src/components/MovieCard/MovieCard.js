import React from 'react';
import {Link} from "react-router-dom";
import {API_IMAGE} from "../../constants/api";

const MovieCard = ({film}) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-5">
      <div className="film-box text-center">
        <Link to={`/films/${film.id}`} className="text-decoration-none text-black">
          <img src={`${API_IMAGE}/w300${film.poster_path}`} className="w-100 mb-2" alt={film.title}/>
          <h3>{film.title}</h3>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;