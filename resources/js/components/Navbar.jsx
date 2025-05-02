import React from 'react'
import AuthUser from '../pageauth/AuthUser'
import Config from '../Config'
import axios from 'axios';

const Navbar = () => {

  const { getRol, getLogout, getToken } = AuthUser()

  const logoutUser =()=>{
    const token = getToken(); // Obtén el token

    Config.getLogout(token) // Pasa el token a Config.getLogout
    .then(response=>{
      console.log(response)
      getLogout();
    }).catch(error => {
      console.error(error);
    });
    
  }

  const renderLinks = () => {
    if(getToken()){
      return(
        <>
        <li className="nav-item">
        <a className="nav-link" href={`/${getRol()}`}>Administración</a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="#" onClick={logoutUser}>Logout</a>
        </li>
        </>
      )
    }else {
      return(
        <>
         <li className="nav-item">
        <a className="nav-link" href="/login">Login</a>
        </li>
        </>
      )
    }
  }
  return (
  <nav className="navbar navbar-expand-lg bg-light">
  <div className='container'>
  <a className="navbar-brand" href="/">DIREMP</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mx-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="categoria">Categorias</a>
      </li>    
    </ul>
    <ul className='navbar-nav ms-auto'>
    { renderLinks() }
    </ul>
  </div>
  </div>
</nav>

  )
}

export default Navbar