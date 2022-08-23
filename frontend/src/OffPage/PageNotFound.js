import React from 'react'
import "./PageNotFound.css"


function PageNotFound() {
  return (
    <>
          <div>
            <div class="starsec"></div>
            <div class="starthird"></div>
            <div class="starfourth"></div>
            <div class="starfifth"></div>
          </div>

          <div class="lamp__wrap">
            <div class="lamp">
              <div class="cable"></div>
              <div class="cover"></div>
              <div class="in-cover">
                <div class="bulb"></div>
              </div>
              <div class="light"></div>
            </div>
          </div>
          <section class="error">
            <div class="error__content">
              <div class="error__message message">
                <h1 class="message__title">Page Not Found</h1>
                <p class="message__text">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
              </div>
              <div class="error__nav e-nav">
                <a href="/" class="e-nav__link"></a>
              </div>
            </div>

          </section>
    </>
  )
}

export default PageNotFound