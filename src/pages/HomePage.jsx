import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useState, useEffect, useContext } from "react"
import CardTransaction from "../components/Transactions"
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from "../contexts/AuthContext"



export default function HomePage() {
  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(0)
  const { login, token} = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {
    setLoading(true)

    axios.get(`${import.meta.env.VITE_API_URL}/home`, config)
      .then(res => {
        setTransactions(res.data)
        setLoading(false)
      })
      .catch(err => {
        alert(err.response.data)
        navigate("/")
      })

  }, [reload])


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/transactions`, config)
      .then(res => setTransactions(res.data))
      .catch(err => console.log(err.response.data))
  }, [])

  setTransactions(transactions.map( token = token))

  balanceCalculator()
  function balanceCalculator() {
    const balanceArray = transactions.map((item) => {
      if (item.tipo === "entrada") {
        return Number((item.value).replace(",", "."))
      } else {
        return Number(-item.value.replace(",", "."))
      }
    })

    balance = (balanceArray.reduce((acc, current) => acc + current, 0)).toFixed(2).toString()
    balance.replace(".", ",")
    return balance
  }

  

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, Fulano</h1>
        <BiExit data-test="logout"/>
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map(trans => <CardTransaction key={trans._id} transaction={trans} />)}
          
          
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance > 0 ? 'positivo' : 'negativo'}>{balance}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button data-test="new-income">
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button  data-test="new-expense">
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
