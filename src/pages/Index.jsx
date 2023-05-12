import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MultiActionAreaCard from '../components/Card'
import axios from 'axios'
import {endpoints} from '../config/endpoints'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function Index(props) {
  const [open, setOpen] = React.useState(true);
  const genero = props.genero;
  var es="";
  switch(genero){
    case "movies":
      es = "Nuestras Películas";
      break
    case "tvShows":
      es = "Nuestras Series"
  }
  const [ruta,setRuta] =useState(`${endpoints.base}${endpoints.topMovies}`);
  const [data,setData]=useState([]);

  

  useEffect(()=>{
    if(props.genero==="movies"){
      console.log("first")
      setRuta(`${endpoints.base}${endpoints.topTvS}`);

  }else if(props.genero==="tvShows"){
    
    setRuta(`${endpoints.base}${endpoints.topMovies}`);

  }
    setOpen(true);
    axios.get(ruta) 
    .then(response=>{
      setData(response.data.items);
    })
    .catch(error=>{
      console.log(error);
    })
    .finally(()=>{
      setOpen(false);
    })
  
  },[props.genero])

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h2 style={{color:"white",marginLeft:"3%"}}>{es}</h2>
     
      <div style={{display:"flex",flexWrap:"wrap",columnGap:"34px",flexDirection:"row",marginLeft:"3%",marginTop:"20px",rowGap:"26px"}}>
      {data.slice(0,20).map( (datos,index)=>
      
      <div key={datos?.id}>
          <MultiActionAreaCard imagen={datos?.image} titulo={datos?.title} year={datos?.year} rating={datos?.imDbRating} />
       
      </div>)

      }  
     
      </div>
      
    </>
  )
}

export default Index