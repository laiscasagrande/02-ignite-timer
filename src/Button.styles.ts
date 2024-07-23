//Eu só coloco o tsx para arquivos que contém um componente, ou seja, para arquivos que possuem uma sintaxe html
//Como pode ser visto, não foi preciso criar uma classe para cada cor.
import styled, {css} from 'styled-components'; //componentes estilizados
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'//como isso se repete, eu exportei

//como é um componente, precisamos passar quais propriedades esse componente recebe
interface ButtonContainerProps{
  variant: ButtonVariant //lá, a variant é opcional, porque eu posso passar uma cor ou não passar nenhuma. Aqui, não tem como ser opcional porque é igual no css, ou seja, primary recebe purple, danger recebe orange. Veja que não como ser opcional, porque eu preciso definir uma cor
}

const buttonsVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
width: 100px;
height: 40px;
border-radius: 4px;
border: 0;
margin: 8px;

background-color: ${props => props.theme['green-500']}//eu quero que a cor de fundo desse botão seja a mesma da nossa cor primária que foi cadastrada lá no tema. Eu consigo acessar o meu tema porque o styled me da a opção de acessar as cores do meu tema por meio de props.theme
//isso porque colocamos o ThemeProvider ao redor dos botões e criamos uma variável com todas as cores que eu quero
//o styled funciona com essa funcionalidade de temas para podermos adcionar vários temas na nossa aplicação

/* ${props =>{
return css`background-color: ${buttonsVariants[props.variant]}`
}}//interpolação de strings. Toda vez que fazemos uma interpolação, ou seja eu queo incluir um código javascript dentro de uma string maior, dentro das crases, o styled vai executar como uma função. Ele vai enviar para essa função todas as propriedades do meu ButtonContainer */
//a propriedade variant vai vir para dentro desse props. Isto é, lá no meu componente de botão, estou passando como props variant, que são as cores que eu posso ter.
`