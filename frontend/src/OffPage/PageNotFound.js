import React from 'react'
import { NavLink } from 'react-router-dom'
import "./PageNotFound.css"


function PageNotFound(data) {
  return (
    <>
          <div className='page-not-found-body'>
            <div className="page-not-found-starsec"></div>
            <div className="page-not-found-starthird"></div>
            <div className="page-not-found-starfourth"></div>
            <div className="page-not-found-starfifth"></div>
          </div>

          <div className="page-not-found-lamp__wrap">
            <div className="page-not-found-lamp">
              <div className="page-not-found-cable"></div>
              <div className="page-not-found-cover"></div>
              <div className="page-not-found-in-cover">
                <div className="page-not-found-bulb"></div>
              </div>
              <div className="page-not-found-light"></div>
            </div>
          </div>
          <section className="page-not-found-error">
            <div className="page-not-found-error__content">
              <div className="page-not-found-error__message message">
                <h1 className="page-not-found-message__title">Page Not Found</h1>
                <p className="page-not-found-message__text">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
              </div>
              <div className="page-not-found-error__nav e-nav">
                <NavLink to={data.data} className="page-not-found-e-nav__link"></NavLink>
              </div>
            </div>

          </section>
    </>
  )
}

export default PageNotFound