import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {API_BASE, API_KEY} from "../../constants/api";
import Pagination from "../../components/Pagination/Pagination";
import SerialCard from "../../components/SerialCard/SerialCard";
import Spinner from "../../components/Spinner/Spinner";

const AllSerials = () => {
  const [query, setQuery] = useSearchParams()
  const [serials, setSerials] = useState([])
  const [page, setPage] = useState(+query.get("page") || 1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios(`${API_BASE}/discover/tv?${API_KEY}&language=ru&page=${page}`)
      .then(({data}) => setSerials(data.results))
      .finally(() => setLoading(false))
  }, [page])

  if (loading) return <Spinner/>

  return (
    <div className="container">
      <Pagination page={page} setPage={setPage} setQuery={setQuery}/>
      <div className="row">
        {
          serials.map(serial => {
            return <SerialCard key={serial.id} serial={serial} />
          })
        }
      </div>
      <div className="mb-5 d-flex justify-content-end">
        <Pagination page={page} setPage={setPage} setQuery={setQuery}/>
      </div>
    </div>
  );
};

export default AllSerials;