import React from 'react'
import { useNavigate } from "react-router-dom";
import { useParseImages } from './hooks';
import "../styles/loader.scss";
import "../styles/content.scss";


export const Content = ({setCloseModal}:any) => {
    const navigate = useNavigate();
    const {images} = useParseImages();

    const openModal = (id:number) => {
      navigate("?id=" + id.toString());
      setCloseModal(true)
    }
  return (
    <main>
        <div className="content__wrapper">
           {images.map(({id, url}:{id:number, url:string}) =>
            <div className="content__elem" key={id} onClick={() => openModal(id)}>
              <img src={url} alt="" className="elem__img"/>
              <p className="elem__id">{"id: " + id}</p>
            </div>
        )}
        </div>
    </main>
  )
}
