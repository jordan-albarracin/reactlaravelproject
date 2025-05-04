import React, { useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import Sidebar from './Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import Config from '../Config'
import Select from '../components/Select'

const EmpresaStore = () => {
    const { getToken } = AuthUser()
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [orden, setOrden] = useState(0)
    const [descripcion, setDescripcion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [direccion, setDireccion ] = useState("")
    const [website, setWebsite ] = useState("")
    const [facebook, setFacebook ] = useState("")
    const [youtube, setYoutube ] = useState("")
    const [tiktok, setTiktok ] = useState("")
    const [urlfoto, SetUrlfoto ] = useState("")
    const [categoria_id, setCategoria_id ] = useState("")

    const navigate = useNavigate()
  
    const handleInputChange = async(e) =>{
      let files = e.target.files
      let reader = new FileReader();
      reader.readAsDataURL(files[0])
      reader.onload = (e)=>{
        SetUrlfoto(e.target.result)
      }   
  
    }
    
    const getCategoriaId = (v) =>{
      setCategoria_id(v)
    }

    const submitStore = async(e) =>{
      e.preventDefault();
      const token = getToken()
      
      await Config.getEmpresaStoreClient(token, {
        nombre,
        email,
        telefono,
        direccion,
        website,
        facebook,
        youtube,
        tiktok,
        descripcion,
        orden,
        urlfoto,
        categoria_id
      })

      navigate('/client/empresa')
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
                  <div className="col-sm-6">
                    <label>Nombre</label>
                    <input className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} type='text'/>
                  </div>
                  <div className="col-sm-3">
                  <label>Email</label>
                    <input className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} type='email'/>                  
                  </div>
                <div className="col-sm-3">
                  <label>Telefono</label>
                  <input className='form-control' value={telefono} onChange={(e) => setTelefono(e.target.value)} type='tel' />
                </div>
                </div>
                <div className="form-group row mt-3">
                <div className="col-sm-6">
                  <label>Dirección</label>
                  <input className='form-control' value={direccion} onChange={(e) => setDireccion(e.target.value)} type='text' />
                </div>
                <div className="col-sm-3">
                  <label>Orden</label>
                  <input className='form-control' value={orden} onChange={(e) => setOrden(e.target.value)} type='number' />
                </div>
                <div className="col-sm-3">
                  <label>Categoria</label>
                  <Select selected={getCategoriaId} />
                </div>
                </div>

                <div className="form-group row mt-3">
                <div className="col-sm-3">
                  <label>Website</label>
                  <input className='form-control' value={website} onChange={(e) => setWebsite(e.target.value)} type='url' />
                </div>
                <div className="col-sm-3">
                  <label>Facebook</label>
                  <input className='form-control' value={facebook} onChange={(e) => setFacebook(e.target.value)} type='url' />
                </div>
                <div className="col-sm-3">
                  <label>Youtube</label>
                  <input className='form-control' value={youtube} onChange={(e) => setYoutube(e.target.value)} type='url' />
                </div>
                <div className="col-sm-3">
                  <label>Tiktok</label>
                  <input className='form-control' value={tiktok} onChange={(e) => setTiktok(e.target.value)} type='url' />
                </div>
                </div>
                <div className="mt-3">
                <label>Descripción</label>
                  <textarea className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} type='text' />
                
                </div>                
                <div className="mt-3">
                  <label>Imágen:</label>
                  <input className='form-control' type='file' onChange={(e) => handleInputChange(e)}/>
                </div>
                <div className="btn-group mt-3">
                  <Link to={-1} className='btn btn-secondary'>← Back</Link>
                  <button type='submit' className='btn btn-primary'>Crear Empresa</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmpresaStore