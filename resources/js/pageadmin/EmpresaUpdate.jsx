import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Config from '../Config';
import Sidebar from './Sidebar';
import AuthUser from '../pageauth/AuthUser';
import { Link } from 'react-router-dom'

const EmpresaUpdate = () => {
    const { getToken } = AuthUser()
    const { id } = useParams();
    const [nombre, setNombre] = useState('')
    const [orden, setOrden] = useState("")
    const [publicado, setPublicado] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        const _getEmpresaUpdate = async()=>{
            const token = getToken();
            Config.getEmpresaById(token, id)
            .then(({data})=>{
                setNombre(data.nombre)
                setOrden(data.orden)
                setPublicado(data.publicado)              
            })
            .catch(error => {
                console.error("Error fetching Categoria:", error);
            });
    };

    _getEmpresaUpdate();
},[])

const submitUpdate = async (ev)=>{
        ev.preventDefault();
        try {
            const token = getToken();
            const data = { nombre, orden, publicado }; 
            await Config.getEmpresaUpdate(token, data, id); 
            navigate('/admin/empresa'); 
        } catch (error) {
            console.error("Error al actualizar:", error);
          
        }

    }
  return (
    <div className="container bg-light">
    <div className="row">
      <Sidebar/>
      <div className="col-sm-9 mt-3 mb-3">
        <div className="card">
          <div className="card-body">
            <form onSubmit={submitUpdate}>
              <div className="form-group row">
                <div className="mt-3">
                    <div className="form-check form-switch">
                        <input className='form-check-input' checked={publicado} onChange={(e)=>setPublicado(!publicado)} type='checkbox' role='switch' id='publicado' />
                        <label className='form-check-label' htmlFor='menu'>Publicado?</label>
                    </div>
                </div>
                <div className="col-sm-8">
                  <label>Nombre</label>
                  <input className='form-control' disabled value={nombre} onChange={(e) => setNombre(e.target.value)} type='text'/>
                </div>
                <div className="col-sm-4">
                <label>Orden</label>
                  <input className='form-control' value={orden} onChange={(e) => setOrden(e.target.value)} type='number'/>
                </div>
              </div>
              <div className="btn-group mt-3">
                <Link to={-1} className='btn btn-secondary'>← Back</Link>
                <button type='submit' className='btn btn-primary'>Actualizar Empresa</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EmpresaUpdate