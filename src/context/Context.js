import { createContext, useReducer, useState } from "react";

export const Context = createContext();

const initial = [];


const reducer=(state,action)=>{
    switch(action.type){
        case "add":
            const existe = state.find( card => card.titulo===action.payload.titulo);
            if(existe==undefined){
            return [...state,{titulo:action.payload.titulo,image:action.payload.imagen,year:action.payload.year,rating:action.payload.rating}];
            }else{
                console.log("ya esta")
            }   
        case "delete":
            return state.filter((card)=> (action.payload.titulo!==card.titulo))
    }
}

export const Datos = ({children}) =>{
    const [favorite,dispatch] = useReducer(reducer,initial);
    return(
        <Context.Provider value={{favorite,dispatch}}>
            {children}
        </Context.Provider>
    )
}