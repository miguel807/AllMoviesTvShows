import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, CardActionArea, CardActions, Divider, Hidden } from '@mui/material';
import '../index'
import {Context, Datos} from '../context/Context'


export default function MultiActionAreaCard(props) {
  const rating = (props.rating/2);
  const {dispatch} = React.useContext(Context)
  
  const objeto = {
    titulo:props.titulo,
    imagen :props.imagen,
    year:props.year,
    rating:props.rating,
  }
  const handleClickEliminar = ()=>{
    dispatch({type:"delete",payload:objeto})

  }
  const handleClickFavorite = ()=>{
    
    dispatch({type:"add",payload:objeto})
    
  }

  return (
    <Card sx={{ maxWidth: 345 }} style={{minWidth:"350px",backgroundColor:"rgb(0, 30, 60)"}} className='Card'>
      <CardActionArea className='cardAction'>
        <CardMedia
          component="img"
          height="370px"
          style={{width:"345px",margin:"auto",borderRadius:"5px",marginTop:"",objectFit:"fill"}}
          image={props.imagen}
          alt="green iguana"
        />
        <CardContent>
          <Tooltip title={props.titulo}>
          <Typography gutterBottom variant="h5" component="div" style={{textAlign:"center",whiteSpace:"nowrap",overflow:"hidden",color:"white"}}>
            {props.titulo}
            <Typography style={{textAlign:"center",color:"white"}}>
            
            {props.search !== "sin"?(
              
              <div style={{display:"block"}}> 
                <div style={{marginTop:"5px",marginBottom:"5px"}}> Año:  {props.year}</div>
                <div style={{display:"inline-flex"}}>Rating:<Rating style={{marginTop:"5px",marginLeft:"5px",position:"relative",top:"-6px"}} name="read-only" value={rating} readOnly /></div>
                </div>)
            :(<div></div>)}   
              </Typography>
          </Typography>
          </Tooltip>
        </CardContent>
        <div style={{display:"flex",width:"100%",flexDirection:"row",justifyContent:"space-around"}}> 
          <Button style={{marginLeft:"",marginBottom:"10px",height:"30px"}} size="small" variant='contained' color="primary">
            Ver mas
          </Button>
          {props.proviene !== "fav"?
          
          <Button style={{height:"30px"}} size='small' variant='contained' color='primary' onClick={handleClickFavorite}>
              Agregar a Favorite
          </Button>
          :<></>
          }
          {props.proviene==="fav"?
           <IconButton aria-label="delete" style={{color:"white"}} onClick={handleClickEliminar}>
              <DeleteIcon />
         </IconButton>  
         :<></>
        }
        </div>
      </CardActionArea>
     
    </Card>
  );
}