import React from 'react'

function Navbar() {


  return (
    <div>          
            <nav class="navbar navbar-expand-lg navbar-light bg-transparent shadow">
                
                <a href="/"><img className="ml-5 navbar-brand" src='/images/nav-img.jpeg' height={50}/> </a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse mr-5" id="navbarNav">
                    <ul class="navbar-nav ml-auto">

                        <li class="nav-item active">
                            <a class="nav-link" href="/categories">Categories <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="/cources">Cources <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="/blog">Blogs <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="/contact">Contact <span class="sr-only">(current)</span></a>
                        </li>


                    </ul>

                </div>
                </nav>
    </div>
  )
}


export default Navbar