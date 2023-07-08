import styled from "styled-components"
import { useLocation, useState } from "react-router-dom"

export default function TransactionsPage() {
  const location = useLocation()

  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  let type



  
  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={addTransaction}>
      <input placeholder="Valor" data-test="registry-amount-input" type="number" step="0.01" min="0.01" required/> 
      <input placeholder="Descrição" data-test="registry-name-input" type="text" />
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
