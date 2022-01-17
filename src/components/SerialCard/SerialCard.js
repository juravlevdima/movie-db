import React from 'react';
import {Link} from "react-router-dom";
import {API_IMAGE} from "../../constants/api";
import {FormattedMessage} from "react-intl";

const SerialCard = ({serial}) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-5">
      <div className="film-box text-center">
        <Link to={`/serials/${serial.id}`} className="text-decoration-none text-black">
          <div className="position-relative">
            <img src={`${API_IMAGE}/w300${serial.poster_path}`} className="w-100 mb-2 poster" alt={serial.name}/>
            <span className="text-on-image">
              <FormattedMessage id="go_to"/>
            </span>
          </div>
          <h3>{serial.name}</h3>
        </Link>
      </div>
    </div>
  );
};

export default SerialCard;