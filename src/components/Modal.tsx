import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/modal.scss"
import "../styles/loader.scss"
import { ModalProps } from '../types/Modal.types'
import { useComment, useImage } from './hooks'

export const Modal = ({closeModal, setCloseModal}:ModalProps) => {
    const navigate = useNavigate();

    let parsedUrl = new URL(window.location.href);
    const id = parsedUrl.searchParams.get('id');

    const {image} = useImage(id);
    const {postComment, comment, setComment, handleText} = useComment();

    const ref:any = useRef();

    useEffect(() => {
        const checkIfClickedOutside = (e:MouseEvent) => {
          if (closeModal && ref.current && !ref.current.contains(e.target)) {
            setCloseModal(false)
            navigate(-1);
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside);
        }
      }, [closeModal, navigate, setCloseModal])

  return (!closeModal ? null : (
    <div className="modal_wrapper">
        <div className="modal"  ref={ref}>
            <div className="modal__imgContainer">
            {!image.url ? <div className='lds-dual-ring'></div> : <img src={image.url} alt="" className="modal__img" /> }
            </div>
            <div className="modal__comments">
                <div className="comments__list">
                    {image.comments ? image.comments?.map((elem) => elem.text) : undefined}
                </div>
                <textarea className="comments__form" name="" id="" value={comment} onChange={(e) => handleText(e)}></textarea>
                <div className="comments__tip">
                    Write a few sentences about photo.
                </div>
            </div>
            <button className="comments__saveBtn" onClick={() => postComment(id,comment, setComment)}>
                Save
            </button>
        </div>
    </div>
  ))
}