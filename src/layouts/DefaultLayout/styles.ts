import styled from 'styled-components'

export const LayoutContainer = styled.div`
max-width: 74rem; 
height: calc(100vh - 10rem);//quero que seja a alturaa total da tela menos um tanto, para que sobre aquele espaço ao redor do container. O width, no html, conseguimos fazer com que ocupe 100% da largura, mas com o height não conseguimos. Temos que ficar colocando height 100% no html, no body. Mas, eu posso utilizar o 100vh, que ele vai utilizar o 100% do viewport hightrem
margin: 5rem auto; //como coloquei - 10rem em cima, consigo colocar margem de 5rem em cima e embaixo e auto nas laterais para que fique centralizado
padding: 2.5rem;
background: ${(props) => props.theme['gray-800']};
border-radius: 8px;

display: flex;
flex-direction: column;
`