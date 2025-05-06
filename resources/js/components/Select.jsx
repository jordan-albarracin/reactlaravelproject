import React, { useEffect, useState } from 'react';
import Config from '../Config';
import AuthUser from '../pageauth/AuthUser';

const Select = ({ 
  value, 
  onChange, 
  endpoint = 'getCategoriaAll', // Hacerlo reutilizable
  optionLabel = 'nombre', 
  optionValue = 'id',
  className = 'form-control'
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = AuthUser();
  
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await Config[endpoint](getToken());
        setOptions(response.data);
      } catch (error) {
        console.error(`Error al cargar opciones:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  return (
    <select
      className={className}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
    >
      <option value="">{loading ? 'Cargando...' : 'Seleccione'}</option>
      {options.map((option) => (
        <option key={option[optionValue]} value={option[optionValue]}>
          {option[optionLabel]}
        </option>
      ))}
    </select>
  );
};

export default Select;