import styled from "styled-components";

export const FormContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
color: ${props => props.theme['gray-100']};
font-size: 1.125rem;
font-weight: bold;
flex-wrap: wrap; //quando a tela for menor, eu quero que ele quebre

`;

const BaseInput = styled.input` //input base, isto é, estilizção comum aos dois inputs
background: transparent;
height: 2.5rem;
border: 0;
border-bottom: 2px solid ${(props) => props.theme['gray-500']};
font-weight: bold;
font-size: inherit; //como o input não herda o font-size do container, teho que colocar inherit para ele herdar
padding: 0 0.5rem;
color: ${(props) => props.theme['gray-100']}

&:focus{
box-shadow: none;
border-color: ${(props) => props.theme['green-500']}
}

&::placeholder { 
color: ${(props) => props.theme['gray-500']}
}
`;

export const TaskInput = styled(BaseInput)` //estou passando BaseInput como parâmetro
flex: 1; //Porque flex: 1? Como o FormContainer tem display flex, quando coloco flex: 1, eu crio um atalho para setar três propriedades: flex-grow, flex-shrink e flex-basis. 
//Flex-grow: eu dou habilidade para o meu componente crescer além do tamanho original dele. Flex-shrink: eu dou habilidade para o meu componente diminuir o tamanho dele para um tamnho menor caso seja necessário. Flex-basis: qual é o tamanho ideal do meu elemento, se ele não estiver nem maior e nem menor por causa do grow e do shrink. 
//Ele basicmante diz que esse elemento ele pode aumentar, pode dminuir, ele vai caber no espaço que ele tiver ali para caber, mas se tiver mais espaço ele vai aumentar até caber

&::-webkit-calendar-picker-indicator { //para tirar a flechinha da lista de opções do input no navegador chrome
display: none !important;
}
`;

export const MinutesAmountInput = styled(BaseInput)` //agora estou usando um componente estilizado de base para criar outros componentes
width: 4rem;
`;