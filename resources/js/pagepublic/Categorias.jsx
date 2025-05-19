import React, { useEffect, useState } from 'react'
import Config from '../Config';

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  useEffect((e)=>{
    getCategorias();
  },[])

  const getCategorias = async()=>{
    const response = await Config.getCategoriasAll()
    setCategorias(response.data);
  }

  return (
    <div className="container pt-5 pb-5">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <h1 className="text-center fw-bolder">Categorias</h1>
          <div className="row">
            {
              categorias.map((categoria) =>{
                return(
                  <div className="col-sm-4" key={categoria.id}>
                    <div className="card">
                    <div className="card-body">
                      <img src={`/img/categoria/`+categoria.urlfoto} className='mx-auto d-block img-fluid' />
                    </div>
                    <div className="card-footer">
                      <a href={`/categorias/${categoria.slug}`} className='btn btn-primary w-100'>{categoria.nombre}</a>
                    </div>
                  </div>
                  </div>
                )
              })
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default Categoria