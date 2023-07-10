import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export function signIn(body) {
    const promise = axios.post(`${BASE_URL}`, body);
  
    return promise;
  }
  
export function signUp(body) {
    const promise = axios.post(`${BASE_URL}/cadastro`, body);
  
    return promise;
  }

  export function transaction(body, token) {
    const config = createConfig(token);
    const tipo = body.tipo;

    const promise = axios.post(`${BASE_URL}/nova-transacao/${tipo}`, body, config)

    return promise;
  }

  export function userTransactions(token) {
    const config = createConfig(token);

    const promise = axios.get(`${BASE_URL}/home`, config)

    return promise
  }

  export function logOff(id, token) {
    const config = createConfig(token);
  
    const promise = axios.delete(`${BASE_URL}/home`, id, config);
  
    return promise;
  }