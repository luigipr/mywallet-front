import axios from "axios";

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export function signIn(body) {
    const promise = axios.post(`${BASE_URL}/auth/login`, body);
  
    return promise;
  }
  
export function signUp(body) {
    const promise = axios.post(`${BASE_URL}/auth/sign-up`, body);
  
    return promise;
  }

  function transaction(body, token) {
    const config = createConfig(token);

    const promise = axios.post(`${BASE_URL}/habits`, body, config)

    return promise;
  }

  function logOff(id, token) {
    const config = createConfig(token);
  
    const promise = axios.delete(`${BASE_URL}/sessions/${id}`, config);
  
    return promise;
  }