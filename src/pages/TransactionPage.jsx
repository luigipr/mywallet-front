import styled from "styled-components"
import { useLocation, useParams} from "react-router-dom"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import useAuth from "../hooks/useAuth"
import {transaction} from "../services/api";




export default function TransactionsPage(route) {
  
  const navigate = useNavigate();
  const { login, auth, user } = useAuth()
  const userID = user._id
  const params = useParams();
  

  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  console.log(params)

  const {tipo} = params

  //tipo.charAt(0).toUpperCase() + tipo.slice(1)


  const date = dayjs().format("DD/MM")

  function addTransaction(e) {
    e.preventDefault();
    
    const realvalue = Number(value).toFixed(2)
    console.log(realvalue)

    const currentTransaction = { userID, value: Number(realvalue), description, tipo, date }
    console.log(currentTransaction)
    const promise = transaction(currentTransaction, auth)
    console.log(promise)
    promise.then(() => navigate('/home'));
    promise.catch(err => {
      alert(err.response.data)})
  }
  //const promise = axios.post(`${import.meta.env.VITE_API_URL}/transactions/${tipo}`)

  
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={addTransaction}>
      <input placeholder="Valor" data-test="registry-amount-input" type="number" step="0.01" min="0.01" required 
       value={value} onChange={(e) => setValue(e.target.value)}/> 
      <input placeholder="Descrição" data-test="registry-name-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <button  data-test="registry-save" >Salvar {tipo}</button>
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
