import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function InverseProtectedRoute({children}){
   let navigate =  useNavigate()  
    
    useEffect(()=>{
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
       },[]) 
       return children
}