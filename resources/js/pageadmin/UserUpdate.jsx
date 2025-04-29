import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Config from '../Config'
import Sidebar from './Sidebar'
import AuthUser from '../pageauth/AuthUser'

const UserUpdate = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [name, setName] = useState("");
    const [aprobado, setAprobado] = useState(false);
    const { getToken } = AuthUser()


    useEffect(()=>{
        const getUserById = async()=>{
            const token = getToken();
            Config.getUserById(token, id)
            .then(({data})=>{
                setName(data.name)
                setAprobado(data.aprobado)
            })
            .catch(error => {
                console.error("Error fetching user:", error);
            });
    };
    
    getUserById();
    },[])

    const submitUpdate = async (ev)=>{
        ev.preventDefault();
        try {
            const token = getToken();
            const data = { name, aprobado }; 
            await Config.getUserUpdate(token, data, id); 
            navigate('/admin/user'); 
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
                <div className="card-header">Editar Usuario</div>
                <div className="card-body">
                    <form onSubmit={submitUpdate} >
                         <div className='col-sm-12'>
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" className='form-control' value={name} onChange={(e)=>setName(e.target.value)}/>
                         </div>
                         <div className='col-sm-12 mt-3'>
                            <div className='form-check form-switch'>
                                <input className='form-check-input' checked={aprobado} onChange={(e)=>setAprobado(!aprobado)} type='checkbox' role='switch' id='aprobado'/>
                                <label className="form-check-label" htmlFor="aprobado">Aprobado</label>
                            </div>                            
                         </div>
                        <div className='btn-group mt-3'>
                        <Link to={-1} className='btn btn-secondary'>← Back</Link>
                        <button type='submit' className='btn btn-primary'>Actualizar Usuario</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default UserUpdate