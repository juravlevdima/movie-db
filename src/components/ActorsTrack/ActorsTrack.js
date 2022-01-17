import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Slider from "react-slick";
import {API_IMAGE} from "../../constants/api";
import anon from "../../images/anon.png";

import "./ActorsTrack.css"
import {FormattedMessage} from "react-intl";

const ActorsTrack = ({actors}) => {
  const navigate = useNavigate()

  const [actorsNum, setActorsNum] = useState(10)
  const [coords, setCoords] = useState(0)

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          dots: false
        }
      }
    ]
  }

  const goToActor = (e, id) => {
    if (Math.abs(e.clientX - coords) < 5) {
      navigate(`/actors/${id}`)
    }
  }

  return (
    <section className="overflow-hidden">
      <h2 className="mb-3">
        <FormattedMessage id="cast"/>
      </h2>
      {/*<div className="d-flex overflow-auto actors-track">*/}
      {/*  {*/}
      {/*    actors?.slice(0, actorsNum)?.map(actor => {*/}
      {/*      return (*/}
      {/*        <div className="p-3">*/}
      {/*          <div>*/}
      {/*            <img src={actor.profile_path ? `${API_IMAGE}/w200${actor.profile_path}` : anon} className="actor-photo" alt={actor.name}/>*/}
      {/*            <h3>{actor.name}</h3>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      )*/}
      {/*    })*/}
      {/*  }*/}
      {/*  {actorsNum < actors.length && <div className="show-more">*/}
      {/*    <button className="show-more-btn" onClick={() => setActorsNum(actorsNum + 10)} type="button">Смотреть еще...</button>*/}
      {/*  </div>}*/}
      {/*</div>*/}

      <div className="px-4">
        <Slider {...carouselSettings}>
          {
            actors?.slice(0, actorsNum)?.map(actor => {
              return (
                <div key={actor.id}>
                  <button
                    onMouseDown={(e) => setCoords(e.clientX)}
                    onClick={(e) => goToActor(e, actor.id)}
                    className="go-to-actor"
                    type="button"
                  >
                    <img src={actor.profile_path ? `${API_IMAGE}/w200${actor.profile_path}` : anon}
                         className="actor-photo" alt={actor.name}/>
                    <h3>{actor.name}</h3>
                  </button>
                </div>
              )
            })
          }
          {actorsNum < actors.length && <div className="show-more">
            <button className="show-more-btn" onClick={() => setActorsNum(actorsNum + 10)} type="button">
              <FormattedMessage id="show_more"/>
            </button>
          </div>}
        </Slider>
      </div>

    </section>
  );
};

export default ActorsTrack;