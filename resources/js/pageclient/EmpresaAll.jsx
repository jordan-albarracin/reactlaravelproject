import React, { useEffect, useState } from 'react'
import Config from '../Config'
import AuthUser from '../pageauth/AuthUser'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

const EmpresaAll = () => {

  const [empresas, setEmpresas] = useState()
  const { getToken } = AuthUser()
      
      useEffect(()=>{
        _getEmpresaAll();
      },[]);
    
      const _getEmpresaAll = async ()=>{
        const token = getToken();
        const response = await Config.getEmpresaAllClient(token)
        //console.log(response.data)
        setEmpresas(response.data)
    
      }
  return (
    <div className="container">
    <div className="row">
    <Sidebar/>
    <div className="col-sm-9 mt-3 mb-3">
        <div className="card">
            <div className="card-body">                
              <Link to={'/client/empresa/create'} className='btn btn-primary'>Agregar Empresa</Link>
                <table className="table">
                    <thead>
                        <tr>
                        <th>Orden</th><th>Nombre</th><th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !empresas ? (
                            <tr>
                                <td colSpan="3">...loading</td>
                            </tr>
                            ) : empresas.map(
                                (empresa)=>{
                                    return(
                                        <tr key={empresa.id}>
                                        <td>{empresa.orden}</td>
                                        <td>{empresa.nombre}</td>
                                        <td>
                                            <Link to={`/client/empresa/edit/${empresa.id}`} className='btn btn-primary'>Editar</Link>    
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

export default EmpresaAll