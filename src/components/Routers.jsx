import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Index from '../pages/Index'
import Search from './Search'
import { Datos } from '../context/Context'
import Favorite from '../pages/Favorite'
function Routers() {
  return (
   <>
    
        <Routes>
            <Route path='/peliculas' element={<Index  genero='movies'/>}/> 
            <Route path='/showTelevision' element={<Index genero="tvShows" />}/> 
            <Route path='/Buscar' element={<Search/>}/> 
            <Route path='/favorite' element={<Favorite/>}/> 
            <Route path='/' element={<Navigate to={"peliculas"} />}/> 
        </Routes>
       
    </>
  )
}

export default Routers