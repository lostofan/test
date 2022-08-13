import React, { useEffect, useState } from 'react'
import "../styles/content.scss"
import { useNavigate } from "react-router-dom";
import "../styles/loader.scss"

export const Content = ({setCloseModal}:any) => {
    const [images, setImages] = useState([]);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        (async () => {
          await getImgs();
        })()
    }, [])

    async function getImgs() {
        setLoader(true);
        const promise = await fetch("https://boiling-refuge-66454.herokuapp.com/images");
        const array = await promise.json();
        setImages(array);
        setLoader(false)
    }

    const openModal = (id:number) => {
      setCloseModal(true)
      navigate("?id=" + id.toString());
    }
  return (
    <main>
        <div className="content__wrapper">
           {images.map(({id, url}:{id:number, url:string}) =>
            <div className="content__elem" key={id} onClick={() => openModal(id)}>
              {loader ? <div className="lds-dual-ring"></div> :
              <img src={url} alt="" className="elem__img"/>}
              <p className="elem__id">{"id: " + id}</p>
            </div>
        )}
        </div>
    </main>
  )
}
