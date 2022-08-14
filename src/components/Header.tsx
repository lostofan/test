import React from 'react'
import '../styles/header.scss';

export const Header = () => {
  return (
    <header>
        <div className="header_wrapper">
            <img src={require('../img/bg.png')} alt="" className="header__bg" />
            <div className="header__content">
                <div className="header__left">
                    <img className='header__avatar' src={require('../img/avatar.png')} alt="" />
                    <div className="header__name">
                        <p>Ricardo Cooper</p>
                    </div> 
                </div>
               <div className="header__right">
                    <button className="header__button">
                        <img className="button__ico" src={require('../img/msg.png')} alt="" />
                        <p className="button__text">Message</p>
                    </button>
                    <button className="header__button">
                        <img className="button__ico" src={require('../img/call.png')} alt=""/>
                        <p className="button__text">Call</p>
                    </button>
               </div>
            </div>
        </div>
    </header>
  )
}
