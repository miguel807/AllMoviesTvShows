import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import MultiActionAreaCard from '../components/Card'
import { Context } from '../context/Context'

function Favorite() {
  const {favorite} = useContext(Context);
  return (
    <div>
      <Typography style={{marginTop:"2%",marginLeft:"3%",fontSize:"25px",color:"white"}}>
        Favoritos:    {favorite.length === 0 ? "No ha agregado favoritos":<></>}
      </Typography>
      <div style={{display:"flex",flexWrap:"wrap",columnGap:"34px",flexDirection:"row",marginLeft:"3%",marginTop:"20px",rowGap:"26px"}}>
      {favorite?.map( (datos)=>
      <div key={datos.titulo}> 
          <MultiActionAreaCard proviene="fav" search="sin" imagen={datos.image} titulo={datos.titulo} year={datos.year} rating={datos.rating*2} />
       
      </div>)

      }  
     
      </div>
    </div>
  )
}

export default Favorite