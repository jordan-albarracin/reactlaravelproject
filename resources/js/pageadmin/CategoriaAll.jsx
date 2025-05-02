import React, { useEffect, useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import Sidebar from './Sidebar'
import Config from '../Config'
import { Link } from 'react-router-dom'

const CategoriaAll = () => {

    const [categorias, setCategorias] = useState()
    const { getToken } = AuthUser()
    
    useEffect(()=>{
      _getCategoriaAll();
    },[]);
  
    const _getCategoriaAll = async ()=>{
      const token = getToken();
      const response = await Config.getCategoriaAll(token)
      //console.log(response.data)
      setCategorias(response.data)
  
    } 
    
    return (
        <div className="container">
        <div className="row">
        <Sidebar/>
        <div className="col-sm-9 mt-3 mb-3">
            <div className="card">
                <div className="card-body">
                    <Link to={'/admin/categoria/create'} className='btn btn-primary'>Agregar categoria</Link>
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Orden</th><th>Nombre</th><th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !categorias ? (
                                <tr>
                                    <td colSpan="3">...loading</td>
                                </tr>
                                ) : categorias.map(
                                    (categoria)=>{
                                        return(
                                            <tr key={categoria.id}>
                                            <td>{categoria.orden}</td>
                                            <td>{categoria.nombre}</td>
                                            <td>
                                                <Link to={`/admin/categoria/edit/${categoria.id}`} className='btn btn-primary'>Editar</Link>
                                            </td>
                                        </tr>
                    
                                        )
                                    }
                                )
                            }
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}

export default CategoriaAll