import styled from "styled-components"


export default function CardTransaction({transaction}) {

    const {_id, value, description, tipo, date } = transaction;

return (
    <ListItemContainer key={_id}>
        <div>
            <span>{date}</span>
            <strong  data-test="registry-name">{description}</strong>
        </div>
        <Value color={tipo === 'entrada' ? 'positivo' : 'negativo'}  data-test="registry-amount">{value}</Value>
    </ListItemContainer>
)

}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`