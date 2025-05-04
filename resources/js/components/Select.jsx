import React, { useEffect, useState } from 'react';
import Config from '../Config';
import AuthUser from '../pageauth/AuthUser';

const Select = ({ value, selected }) => {  // Recibe props como objeto desestructurado
    const [options, setOptions] = useState([]);
    const { getToken } = AuthUser();
    
    useEffect(() => {
        getOptions();
    }, []);

    const getOptions = async () => {
        const response = await Config.getCategoriaAll(getToken());
        setOptions(response.data);
    };

    return (
        <select 
            className='form-control' 
            value={value}
            onChange={(e) => selected(e.target.value)}  // Llama a la prop `onChange`
        >
            <option value="">Seleccione una categoría</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.nombre}
                </option>
            ))}
        </select>
    );
};

export default Select;