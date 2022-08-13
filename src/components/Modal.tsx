import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/modal.scss"
import "../styles/loader.scss"

export const Modal = ({closeModal, setCloseModal}:{closeModal:boolean, setCloseModal:any}) => {
    type StateType = {
        id?: number; 
        url?: string;
        comments?: {text?: string;}[]
    }
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [image, setImage] = useState<StateType>({});
    const [comment, setComment] = useState({});

    const ref:any = useRef();

    useEffect(() => {
        const checkIfClickedOutside = (e:any) => {
          if (closeModal && ref.current && !ref.current.contains(e.target)) {
            setCloseModal(false)
            navigate(-1);
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [closeModal, navigate, setCloseModal])


    useEffect(() => {
        (async () => {
          await getImage();
          await postComment();
        })()
    }, [closeModal])

    async function getImage() {
        setLoader(true);
        let parsedUrl = new URL(window.location.href);
        const promise = await fetch(`https://boiling-refuge-66454.herokuapp.com/images/${parsedUrl.searchParams.get('id')}`);
        const response = await promise.json();
        setImage(response);
        setLoader(false);
    }
    async function postComment() {
    let parsedUrl = new URL(window.location.href);
    try{
        let response = await fetch(`https://boiling-refuge-66454.herokuapp.com/images/237/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
         },
        body: JSON.stringify({
            comment: "XDD",
            name: "Artem",
        })
    });
    await getImage();
    }
    catch(e) {
        console.log(e)
    }
    }
 console.log(image);
  return (!closeModal ? null : (
    <div className="modal_wrapper">
        {loader ? <div className="lds-dual-ring"></div> :
        <div className="modal"  ref={ref}>
            <img src={image.url} alt="" className="modal__img" />
            <div className="modal__comments">
                <div className="comments__list">
                    {(image.hasOwnProperty('comments')) ? image.comments?.map((elem:any) => elem.text) : undefined}
                </div>
                <textarea className="comments__form" name="" id=""></textarea>
                <div className="comments__prompt">
                    Write a few sentences about photo.
                </div>
            </div>
            <button className="comments__saveBtn">
                Save
            </button>
        </div>}
    </div>
  ))
}
