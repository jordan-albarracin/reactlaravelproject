import React, { useEffect, useState } from 'react'
import Config from '../Config'
import Modal from '../components/Modal'

const Home = () => {
  const [empresas, setEmpresas] = useState([])
  const [modal, setModal] = useState(false)
  const [datamodal, setDatamodal] = useState([])


  useEffect(() => {
    getEmpresas()
  }, [])

  const getEmpresas = async () => {
    try {
      const response = await Config.getEmpresas(5)
      setEmpresas(response.data)
    } catch (error) {
      console.error("Error al obtener empresas:", error)
    }
  }

  const search = async (searchText) => {
    try {
      if (searchText.length > 0) { // Solo buscar si hay texto
        const response = await Config.searchEmpresas({ text: searchText })
        setEmpresas(response.data)
      } else {
        getEmpresas() // Si el campo está vacío, mostrar las empresas iniciales
      }
    } catch (error) {
      console.error("Error al buscar empresas:", error)
    }
  }

  const showModal = (e,empresa)=>{
    e.preventDefault()
    setModal(true);
    setDatamodal(empresa);
  }

  return (
    <div className="container pt-5 pb-5">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <h1 className='text-center fw-bolder'>Directorio de Empresas</h1>

          <div className="card">
            <div className="card-body">
              <p className="text-center mt-5">BUSCADOR</p>
              <input 
                type="search" 
                placeholder='Ingrese Empresa' 
                onChange={(e) => search(e.target.value)} 
                className='form-control' 
              />
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              {empresas.length > 0 ? (
                empresas.map((empresa) => (
                  <div className='mt-3' key={empresa.id}>
                    <div className="card-body">
                      <h2 className='fw-bolder'>
                        <a href="#" onClick={(e)=>showModal(e, empresa)}>{empresa.nombre}</a>
                      </h2>
                      <p>{empresa.descripcion}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No se encontraron empresas</p>
              )}
              { modal && <Modal datamodal = {datamodal} close={setModal}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home