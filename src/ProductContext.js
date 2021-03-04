import React,{useState,createContext} from 'react'
export const ProductContext=createContext();
export const ProductProvider=(props)=>{
    const [product,SetProducts]=useState([]);
    const [user,SetUser]=useState([]);
    return (
        <ProductContext.Provider value={{user_amazon:[user,SetUser],products:[product,SetProducts]}}>
            {props.children}
        </ProductContext.Provider>
    )
}

