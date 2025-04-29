import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthUser from '../pageauth/AuthUser'

const LayoutClient = () => {

  const { getRol } = AuthUser()
  const navigate  = useNavigate() 
  useEffect(()=>{
      if(getRol()!="client"){
        navigate("/")
      }
    },[])

  return (
    <div>
    <h1>Este es el Layout Client</h1>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default LayoutClient