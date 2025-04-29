import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Config from '../Config'
import AuthUser from '../pageauth/AuthUser'
import { Link } from 'react-router-dom'

const UserAll = () => {

  const [user, setUser] = useState()
  const { getRol, getLogout, getToken } = AuthUser()
  
  useEffect(()=>{
    getUserAll();
  },[]);

  const getUserAll = async ()=>{
    const token = getToken();
    const response = await Config.getUserAll(token)
    //console.log(response.data)
    setUser(response.data)

  }

  return (
    <div className="container">
        <div className="row">
        <Sidebar/>
        <div className="col-sm-9 mt-3 mb-3">
            <div className="card">
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Orden</th><th>Name</th><th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !user ? (
                                <tr>
                                    <td colSpan="3">...loading</td>
                                </tr>
                                ) : user.map(
                                    (user)=>{
                                        return(
                                            <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>
                                                <Link to={`/admin/user/edit/${user.id}`} className='btn btn-primary'>Editar</Link>
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

export default UserAll