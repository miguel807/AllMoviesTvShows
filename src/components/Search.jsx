import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import BasicSelect from './Select'
import '../index.css'
import { TextField } from '@mui/material';
import axios from 'axios'
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { endpoints } from '../config/endpoints';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import MultiActionAreaCard from './Card'; 

export default function CustomizedInputBase() {

    const [open, setOpen] = React.useState(false);
    const [buscar,setBuscar] = useState("");
    const [select,setSelect] = useState("titulo");
    const [lista,setLista] = useState([]);
    const [mensajeNoFound,setMensaje]=useState('');


  async   function enviar(lis){
       await  setLista(lis);
       
    }

    const handleInput=(e)=>{
        setBuscar( e.target.value)
      }
      async function getSearch(){
        const ruta  = `${endpoints.base}${endpoints.searchTitle}${buscar}`;
        setOpen(true);
       await  axios.get(ruta)
       
        .then((response)=>{
            setLista(response.data.results);
            if(response.data.results.length == 0){
              console.log("sa")
              setMensaje('vacio');
            }else{
              setMensaje('')
            }
        })
        .catch(error=>{
            console.log(error);
            setMensaje('vacio')
          })
          .finally(()=>{
            setOpen(false);
          })
}
      const handleClick = ()=>{
            console.log(buscar)
           getSearch()
      }
      const handleSelect =(e)=>{
        setSelect(e.target.value)
      }
     
  return (
    <div>
          <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

        <div style={{display:"flex",justifyContent:"center",marginTop:"30px"}}> 
       
        {select === "genero"?
                <BasicSelect onListUpdate={enviar} valor="genero" />
                
                :select==="companies"?
                <BasicSelect onListUpdate={enviar}  valor="companies"/>
                :
         
            <div style={{color:"white"}}>
            <TextField
                className='Input'
                color="info"

                value={buscar}
                variant='standard'
                onChange={handleInput}
                placeholder='Buscar'
                size='small'
                
                sx={{ ml: 1, flex: 1,width:250,color:'white',borderColor:"red",}}
                style={{color:"white",marginTop:"10px", }}
                inputProps={{ 'aria-label': 'Search',style:{color:"white",borderColor:"red",borderWidth:"20px"} }}
                InputLabelProps={{color:'error'}}
            />
            <Button variant="contained" style={{height:"30px",marginTop:"10px",marginLeft:"12px",borderWidth:"20px"}} onClick={handleClick}><SearchIcon/></Button>
            </div>
           
            }


            <FormControl style={{display:"inline",marginLeft:"5%"}}>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={select}
                    onChange={handleSelect}
                >
                    <FormControlLabel style={{color:"white"}} value="titulo" control={<Radio  sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color:'white',
                        },
                        }} />} label="Título" />
                    <FormControlLabel value="genero" control={<Radio sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color:'white',
                        },
                        }} />} style={{color:"white"}}  label="Género" />
                    <FormControlLabel  value="companies" control={<Radio sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color:'white',
                        },
                        }} />} style={{color:"white"}} label="Companies" />
                </RadioGroup>
            </FormControl>
        </div>

    <div style={{display:"flex",flexWrap:"wrap",columnGap:"34px",flexDirection:"row",marginLeft:"3%",marginTop:"50px",rowGap:"26px"}}>
      {lista.slice(0,10).map( (datos,index)=>
      
      <div key={datos?.id}> 
          <MultiActionAreaCard imagen={datos?.image} titulo={datos?.title} search="sin" />
       
      </div>)

      }  
      <div style={{color:"white",margin:"auto",marginTop:"30px",fontSize:"25px"}}> 
      {(mensajeNoFound==="vacio" && select==="titulo") ?<div>No se encontraron resultados</div>:<></>}
      </div>
      </div>
    </div>
  );
}