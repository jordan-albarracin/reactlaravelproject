import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Config from '../Config'
import AuthUser from '../pageauth/AuthUser'
import Select from '../components/Select'


const EmpresaUpdate = () => {    
    const navigate = useNavigate()
    const { id } = useParams()

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
    const [categoria_id, setCategoria_id ] = useState()
    const [file, setFile] = useState("")

    const handleInputChange = async(e) =>{
        let files = e.target.files
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (e)=>{
          SetUrlfoto(e.target.result)
        }
    }
    
    useEffect(() => {
        const getEmpresa = async () => {
            const token = getToken()
            Config.getEmpresaByIdClient(token, id)
                .then(({ data }) => {
                    setNombre(data.nombre)
                    setEmail(data.email)
                    setDescripcion(data.descripcion)
                    setOrden(data.orden)
                    setTelefono(data.telefono)
                    setDireccion(data.direccion)
                    setWebsite(data.website)
                    setFacebook(data.facebook)
                    setYoutube(data.youtube)
                    setTiktok(data.tiktok)
                    SetUrlfoto(data.urlfoto)
                    setCategoria_id(data.categoria_id)
                })
    
    };
    getEmpresa();
}, [])

const getCategoriaId = (v) => { setCategoria_id(v) }

 const submitUpdate = async(e) =>{
      e.preventDefault();
      const token = getToken()
      
      await Config.getEmpresaUpdateClient(token, {
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
      }, id)

      navigate('/client/empresa')
    }

  return (
    <div className="row justify-content-center">
        <div className="col-sm-9">
            <div className="card mt-5 mb-5">
                <div className="card-header">Editar Empresa</div>
                <div className="card-body">
                <form onSubmit={submitUpdate}>
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
                  <Select selec={categoria_id} selected={getCategoriaId} />
                </div>
                </div>

                <div className="form-group row mt-3">
                <div className="col-sm-3">
                  <label>Website</label>
                  <input className='form-control' value={website||''} onChange={(e) => setWebsite(e.target.value)} type='url' />
                </div>
                <div className="col-sm-3">
                  <label>Facebook</label>
                  <input className='form-control' value={facebook||''} onChange={(e) => setFacebook(e.target.value)} type='url' />
                </div>
                <div className="col-sm-3">
                  <label>Youtube</label>
                  <input className='form-control' value={youtube||''} onChange={(e) => setYoutube(e.target.value)} type='url' />
                </div>
                <div className="col-sm-3">
                  <label>Tiktok</label>
                  <input className='form-control' value={tiktok||''} onChange={(e) => setTiktok(e.target.value)} type='url' />
                </div>
                </div>
                <div className="mt-3">
                <label>Descripción</label>
                  <textarea className='form-control' value={descripcion||''} onChange={(e) => setDescripcion(e.target.value)} />
                
                </div>                
                <div className="mt-3">
                  <label>Imágen:</label>
                  <img src={"/img/empresa/" + urlfoto} loading='lazy' width={200} height={200} className='img-fluid img-thumbnail' />
                  <input className='form-control' type='file' onChange={(e) => handleInputChange(e)}/>
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
  )
}

export default EmpresaUpdate