import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import TrailerModal from "../TrailerModal/TrailerModal";
import './Trailers.css'
import {API_BASE, API_IMAGE, API_KEY} from "../../constants/api";
import play from '../../images/play.png';
import axios from "axios";
import {FormattedMessage} from "react-intl";

const Trailers = ({videos, id, type}) => {
  const [videoKey, setVideoKey] = useState("")
  const [posters, setPosters] = useState([])
  const [modal, setModal] = useState(false)

  const carouselSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1300,
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
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        }
      }
    ]
  }

  useEffect(() => {
    axios(`${API_BASE}/${type}/${id}/images?${API_KEY}`)
      .then(({data}) => setPosters([...data.backdrops, ...data.posters]))
  }, [id, type])

  const toggleModal = (key) => {
    setVideoKey(key)
    setModal(true)
  }

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "auto"
  }, [modal])

  return (
    <>
      <section className="px-4 px-sm-5">
        <h3 className="mb-4">
          <FormattedMessage id="trailers"/>
        </h3>
        <Slider {...carouselSettings}>
          {
            videos
              .sort(it => it.type === "Trailer" ? -1 : 1)
              .map((it, idx) => {
                const poster = posters[idx]
                  ? `${API_IMAGE}/w300${posters[idx]?.file_path}`
                  : `${API_IMAGE}/w300${posters[0]?.file_path}`

                return (
                  <div className="px-2" key={it.id}>
                    <div className="position-relative">
                      <img src={poster} className="trailer-img" alt={it.name}/>
                      <button onClick={() => toggleModal(it.key)} className="play-btn" type="button">
                        <img src={play} alt="play"/>
                      </button>
                    </div>
                    <div className="fw-bold fs-5 text-center">{it.name}</div>
                  </div>
                )
              })
          }
        </Slider>
      </section>

      {modal && <TrailerModal setModal={setModal} video={videoKey}/>}
    </>
  );
};

export default Trailers;