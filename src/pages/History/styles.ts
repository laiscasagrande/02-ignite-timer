import styled from "styled-components";

export const HistoryContainer = styled.main`
flex: 1;
padding: 3.5rem;

display: flex;
flex-direction: column;

h1 {
 font-size: 1.5rem;
 color: ${(props) => props.theme['gray-100']}
}
`;

export const HistoryList = styled.div`
flex: 1;
overflow: auto;
margin-top: 2rem;

table {
width: 100%;
border-collapse: collapse; //eu tenho dois td's. Se eu coloco as bordas dos dois de 1px cada, na hora que estiverem juntos, a borda passará a ser de 2px. Porém, se eu coloco border-collapse, a borda fica 1px ao invés de 2px
min-width: 600px; //isso vai forçar com que, quando a gente tiver um tamanho menor, ele gere o scroll

th {
 background-color: ${props => props.theme['gray-600']};
 padding: 1rem;
 text-align: left;
 color: ${(props) => props.theme['gray-100']};
 font-size: 0.875rem;
 line-height: 1.6;

 &:first-child { //selecionei a primeira th
 border-top-left-radius: 8px;  //arredondei o caantinho
 padding-left: 1.5rem;
 }

 &:last-child {
 border-top-right-radius: 8px;
 padding-right: 1.5rem;
 }
}
 td {
 background-color: ${(props) => props.theme['gray-700']};
 border-top: 4px solid ${(props) => props.theme['gray-800']};
 padding: 1rem;
 font-size: 0.875rem;
 line-height: 1.6rem;

 &:first-child { 
 width: 50%;
 padding-left: 1.5rem;
 }

 &:last-child {
 padding-right: 1.5rem;
 }
 }
}  

`;

const STATUS_COLOR = {  //objeto de cores para fazer um mapeamento 
    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500'
} as const //Eu criei um objeto. O typeScript quando lê esse objeto, ele entende que esse objeto ele pode ter uma chave yellow, green e red. E o valor dessas propriedades é um texto, pode ser qualquer texto, é um texto variável. Para mim visar que sempre será um desses três e ele não pode mudar, eu passo as const. Assim, quando for yellow, é yellow-500, não uma string qualquer

interface StatusProps {
    statusColor: keyof typeof STATUS_COLOR //As cores disponíveis que eu tenho são as chaves, as keys do tipo objeto STATUS_COLOR
} //eu tenho que colocar typeof porque o typeScript não consegue ler objetos javascript. Ele lê o tipo de objetos javascript

export const Status = styled.span<StatusProps>` //esse meu span pode receber essas propriedades
display: flex;  
align-items: center;
gap: 0.5rem;

&::before { //o before e o after são elementos que ficam detro da tag, dentro do span, no começo e no final. O before é no começo e o after é no final
content: ''; //para ele aparecer em tela, eu preciso que tenha alguma coisa, nem que seja um content vazio
width: 0.5rem;
height: 0.5rem;
border-radius: 9999px; //ou 50%, para ficar totalmente aredondado
background: ${(props) => props.theme[STATUS_COLOR[props.statusColor]]};

}
`;