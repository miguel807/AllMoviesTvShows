
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from 'react'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
import { endpoints } from '../config/endpoints';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function BasicSelect(props) {
  
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        
      },
    },
  };
  const [data,setData] = useState("");
  const [open,setOpen] = useState(false);
  const [list,setList]=useState([]);
  const [parametro,setParametro]=useState("");
  const [parametroP,setParametroP] = useState("");
  var generos = ["action","adventure","biography","comedy","crime","drama","family","fantasy","history","horror","mystery","romance","sci_fi","thriller","war"];
  var companies = ["fox","columbia","dreamworks","paramount","universal","disney","warner"];

 async function getSearch(){
    var ruta = "";
  
    if(props.valor === "genero"){
      ruta = `${endpoints.base}${endpoints.searchGenero}${parametroP}`;
    }else{
     ruta = `${endpoints.base}${endpoints.searchCompanies}${parametro}`
    }
    setOpen(true);
    await axios.get(ruta)
    .then((response)=>{
       
        setList(response.data.results);
        var li = response.data.results;
        props.onListUpdate(li);
        
    })
    .catch(error=>{
      console.log(error);
    })
    .finally(()=>{
        setOpen(false);
        
    })
 }

  const handleClickSearch = () =>{
    getSearch();
  }

   const handleChange = (e) => {
    if(props.valor==="companies"){
      setParametro(e.target.value);    
  }else{
    var is = e.target.value;
    setParametroP(is);
    
  }
  };

  return (
    <div style={{display:"inline-flex"}}>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop> 
    <Box sx={{ minWidth: 120,width:250,marginRight:3 }}>
      <FormControl fullWidth variant='standard'>
        <InputLabel  style={{color:"white"}} id="demo-simple-select-label">{props.valor==="companies"?"Compañias":"Genero"}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={handleChange}
          value={props.valor==="companies"?parametro:parametroP}
          style={{color:"white",textTransform:"capitalize"}}
          MenuProps={MenuProps}
        >
            {props.valor === 'genero'?(generos=generos):(generos=companies)} 
            {generos.map((dat)=> (<MenuItem value={dat} style={{textTransform:"capitalize"}} >{dat}</MenuItem>)) }
          
        </Select>
      </FormControl>
       
    </Box>
   
    <Button variant="contained" style={{height:"30px",marginTop:"10px"}} onClick={handleClickSearch}><SearchIcon/>{data}</Button>
    </div>



  );
}