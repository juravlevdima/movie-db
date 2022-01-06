import React from 'react';

const Pagination = ({page, setPage, setQuery}) => {

  const updatePage = (num) => {
    setPage(num)
    setQuery({page: String(num)})
  }

  return (
    <div className="my-4">
      {page > 1 && <button onClick={() => updatePage(1)} type="button" className="btn btn-primary me-2">{1}</button>}
      {page >= 4 && <span className="fw-bold">... </span>}
      {page >= 3 && <button onClick={() => updatePage(page - 1)} type="button" className="btn btn-primary me-2">{page - 1}</button>}
      <button disabled type="button" className="btn btn-primary me-2">{page}</button>
      {page < 499 && <button onClick={() => updatePage(page + 1)} type="button" className="btn btn-primary me-2">{page + 1}</button>}
      {page < 498 && <span className="fw-bold">... </span>}
      {page < 500 && <button onClick={() => updatePage(500)} type="button" className="btn btn-primary me-2">{500}</button>}
    </div>
  );
};

export default Pagination;