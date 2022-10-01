import React from 'react'
import { Card } from '../components/Card'
import Categorie from '../components/Categorie'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
        <Card/>
        <Categorie/>
        <div className='mt-5 mb-5 p-5'></div>
        <Footer/>
    </div>
  )
}

export default Home