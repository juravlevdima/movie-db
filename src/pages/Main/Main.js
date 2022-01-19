import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import axios from "axios";
import {API_BASE, API_IMAGE, API_KEY} from "../../constants/api";
import './Main.css'


const Main = () => {
  const navigate = useNavigate()
  const intl = useIntl()
  const [searchBackdrop, setSearchBackdrop] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    axios(`${API_BASE}/movie/popular?${API_KEY}`)
      .then(({data}) => {
        const rand = Math.floor(Math.random() * 20)
        setSearchBackdrop(data?.results[rand]?.backdrop_path)
      })
  }, [])

  const search = () => {
    if (searchInput.trim()) navigate(`/search/${searchInput}`)
  }

  return (
    <>
      <section
        className="search-block"
        style={{
          background: `rgba(0, 58, 99, 0.7) url("${API_IMAGE}/original${searchBackdrop}") top -40px center/cover no-repeat`,
          backgroundBlendMode: 'darken' // 'exclusion' or 'saturation' or 'luminosity'
        }}
      >
        <h1 className="text-white text-center pt-5 px-5 fs-2">
          <FormattedMessage id="main_title"/>
        </h1>
        <div className="search-bar">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
            type="text"
            placeholder={intl.formatMessage({id: "search_placeholder"})}
          />
          <button onClick={search} className="search-btn">
            <FormattedMessage id="search"/>
          </button>
        </div>
      </section>
    </>
  );
};

export default Main;