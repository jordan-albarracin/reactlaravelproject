import axios from "axios";
import "../js/pageauth/AuthUser";


const base_api_url = "http://localhost:8000/api/v1";


///Route
export default {
    //AUTH
    getRegister:(data)=>axios.post(base_api_url + '/auth/register', data),
    getLogin:(data)=>axios.post(base_api_url + '/auth/login', data),
    //getLogout:()=>axios.post(base_api_url + '/auth/logout'),
    getLogout: (token) => {

        return axios.post(
            base_api_url + '/auth/logout',
            {}, // No se necesita body para el logout
            {
                headers: {
                  Authorization: `Bearer ${token}`, // Incluye el token en la cabecera Authorization
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/json', // O el tipo de contenido que estés usando
            },
        }
        
        );
    },

    
    // ADMIN ROUTES
    getUserAll: (token) => { // Recibe el token como argumento
        return axios.get(
            base_api_url + '/admin/user',
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token en la cabecera Authorization
                   
                },
            }
        );
    },

    getUserById: (token, id) => { // Recibe el token como argumento
        return axios.get(
            `${base_api_url}/admin/user/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token en la cabecera Authorization
                   
                },
            }
        );
    },

    getUserUpdate: (token, data, id) => { // Recibe el token como argumento
        return axios.put(
            `${base_api_url}/admin/user/${id}`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token en la cabecera Authorization
                   
                },
            }
        );
    },

    //category route
    getCategoriaAll: (token) => { // Recibe el token como argumento
        return axios.get(
            base_api_url + '/admin/categoria',
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token en la cabecera Authorization
                   
                },
            }
        );
    },

    getCategoriaStore: (token, data) => { // Recibe el token como argumento
        return axios.post(
            `${base_api_url}/admin/categoria`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token en la cabecera Authorization
                   
                },
            }
        );
    },
};