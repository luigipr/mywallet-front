import styled from "styled-components"
import { useLocation} from "react-router-dom"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import useAuth from "../hooks/useAuth"
import {transaction} from "../services/api";




export default function TransactionsPage() {
  
  const navigate = useNavigate();
  const { login, token, user } = useAuth()
  const userID = user._id
  

  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  const type = props?.location.state.type
  type.charAt(0).toUpperCase() + user.slice(1)
  const date = dayjs().format("DD/MM")

  function addTransaction(e) {
    value = Number(value)
    const currentTransaction = { userID, value, description, tipo: type, date }

    const promise = transaction(currentTransaction, token)

    promise.then(navigate('/home'));
    promise.catch(err => {
      alert(err.response.data)})
  }
  //const promise = axios.post(`${import.meta.env.VITE_API_URL}/transactions/${tipo}`)

  
  return (
    <TransactionsContainer>
      <h1>Nova {type}</h1>
      <form onSubmit={addTransaction}>
      <input placeholder="Valor" data-test="registry-amount-input" type="number" step="0.01" min="0.01" required 
       value={value} onChange={(e) => setValue(e.target.value)}/> 
      <input placeholder="Descrição" data-test="registry-name-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <button  data-test="registry-save" >Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`