import React, { useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import Sidebar from './Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import Config from '../Config'


const CategoriaStore = () => {
  const { getToken } = AuthUser()
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState("")
  const [orden, setOrden] = useState("")
  const [urlfoto, setUrlFoto] = useState("")
  const navigate = useNavigate()

  const handleInputChange = async(e) =>{
    let files = e.target.files
    let reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = (e)=>{
      setUrlFoto(e.target.result)
    }   

  }

  const submitStore = async(e) =>{
    e.preventDefault();
    const token = getToken()
    
    await Config.getCategoriaStore(token, {nombre, descripcion, orden, urlfoto})
    navigate('/admin/categoria')
  }



  return (
    <div className="container bg-light">
      <div className="row">
        <Sidebar/>
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={submitStore}>
                <div className="form-group row">
                  <div className="col-sm-8">
                    <label>Nombre</label>
                    <input className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} type='text'/>
                  </div>
                  <div className="col-sm-4">
                  <label>Orden</label>
                    <input className='form-control' value={orden} onChange={(e) => setOrden(e.target.value)} type='number'/>
                  </div>
                </div>
                <div className="mt-3">
                  <label>Descripción:</label>
                  <textarea className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </div>
                <div className="mt-3">
                  <label>Imágen:</label>
                  <input className='form-control' type='file' onChange={(e) => handleInputChange(e)}/>
                </div>
                <div className="btn-group mt-3">
                  <Link to={-1} className='btn btn-secondary'>← Back</Link>
                  <button type='submit' className='btn btn-primary'>Crear Categoria</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriaStore