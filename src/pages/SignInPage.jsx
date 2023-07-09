import styled from "styled-components"
import { Link , useNavigate} from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import { useState, useEffect } from "react";




export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, login, user, setUser } = useAuth(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && auth.token) {
      navigate("/home");
    }
  }, []);

  function logUser(e) {
    e.preventDefault();

    const user = {email, password};

    const promise = api.signIn(user);

    promise.then( response => {
    setUser = response.data.user.username ; 
    login(response.data.token);
    // navegar para pagina de entrada
    navigate('/home');
    });
    promise.catch( err  => {alert(err.response.data.message)});
  }



  return (
    <SingInContainer>
      <form onSubmit={logUser}>
        <MyWalletLogo />
        <input placeholder="E-mail" data-test="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="Senha" data-test="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button data-test="sign-in-submit">Entrar</button>
      </form>

      <Link to={'/cadastro'}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
