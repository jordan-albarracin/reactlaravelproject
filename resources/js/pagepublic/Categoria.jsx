import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Config from '../Config'
import Modal from '../components/Modal'


const Categoria = () => {

    const { slug } = useParams()
    const [modal, setModal] = useState(false)
    const [categoria, setCategoria] = useState([])
    const [empresas, setEmpresas] = useState([])
    const navigate = useNavigate()
    const [datamodal, setDatamodal] = useState(null);

    useEffect(()=>{
        const getCategoria = async () =>{
            await Config.getCategoriaBySlug(slug).then(({data})=>{
                if(data!==null){
                    setCategoria(data.categoria)
                    if(data.empresas && data.empresas.length > 0) {
                        setEmpresas(data.empresas)
                    }
                }else{
                    navigate("/")
                }
            })
        }
        getCategoria();
    },[slug])

  const showModal = (e, empresa) => {
  e.preventDefault(); // Previene la recarga de página
  if (empresa) {     // Valida que la empresa exista
    setDatamodal(empresa);
    setModal(true);
  }
};

  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-sm-8">
                <div className="card mt-5 mb-5">
                    <div className="card-body">
                        <h1 className="text-center fw-bolder">Empresas de {categoria.nombre}</h1>
                    </div>
                </div>
                
                {
                    empresas.map((empresa)=>{
                        return(
                            <div className="mt-3" key={empresa.id}>
                                <div className="card-body">
                                    <h2 className="fw-bolder">
                                        <a 
                                            href="#!" 
                                            onClick={(e) => showModal(e, empresa)}
                                            className="text-decoration-none"
                                            >
                                            {empresa.nombre}
                                            </a>
                                    </h2>
                                    <p>{empresa.descripcion}</p>
                                </div>
                            </div>
                        )
                    })
                }
                    {modal && <Modal dataModal= {datamodal} close={setModal} />}
            </div>
        </div>
    </div>
  )
}

export default Categoria