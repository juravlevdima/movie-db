import React, {useEffect, useState} from 'react';
import Modal from "../Modal/Modal";

const Trailers = ({videos}) => {
  const [videoKey, setVideoKey] = useState("")
  const [modal, setModal] = useState(false)

  const toggleModal = (key) => {
    setVideoKey(key)
    setModal(true)
  }

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "auto"
  }, [modal])

  return (
    <>
      <section>
        <div>Трейлеры:</div>
        <ul>
          {
            videos.map(it => {
              return (
                <li key={it.id}>
                  <button onClick={() => toggleModal(it.key)}>{it.name}</button>
                </li>
              )
            })
          }
        </ul>
      </section>

      {modal && <Modal setModal={setModal} video={videoKey}/>}
    </>
  );
};

export default Trailers;