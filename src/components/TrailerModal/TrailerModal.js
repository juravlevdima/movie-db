import React from 'react';
import './Modal.css'

const TrailerModal = ({video, setModal}) => {
  return (
    <div onClick={() => setModal(false)} className="position-fixed top-0 h-100 w-100 bg-modal">
      <div className="d-flex justify-content-center align-items-center h-100 trailer">
        <iframe width="760" height="515" src={`https://www.youtube.com/embed/${video}`} title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;