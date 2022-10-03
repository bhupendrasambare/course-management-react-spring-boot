import React from 'react'
import { Card } from '../components/Card'
import Categorie from '../components/Categorie'
import OwlCources from '../components/OwlCources'

function Home() {
  return (
    <div>
        <Card/>
        <Categorie/>
        <OwlCources id="-1"/>
        <div className='mt-5 mb-5 p-5'></div>
    </div>
  )
}

export default Home