import React from 'react'
import { Card } from '../components/Card'
import Categorie from '../components/Categorie'
import OwlCourses from '../components/OwlCourses'

function Home() {
  return (
    <div>
        <Card/>
        <Categorie/>
        <OwlCourses id="-1"/>
        <div className='mt-5 mb-5 p-5'></div>
    </div>
  )
}

export default Home