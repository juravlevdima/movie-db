import React from 'react';
import {API_IMAGE} from "../../constants/api";
import './ImageModal.css'

const ImageModal = ({image, setModal}) => {
  return (
    <div onClick={() => setModal(false)} className="position-fixed top-0 h-100 w-100 bg-modal" style={{zIndex: 100}}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <img src={`${API_IMAGE}/w500${image}`} alt="poster" className="rounded-3 h-100 image-modal"/>
      </div>
    </div>
  );
};

export default ImageModal;