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

${props =>{
return css`background-color: ${buttonsVariants[props.variant]}`
}}//interpolação de strings. Toda vez que fazemos uma interpolação, ou seja eu queo incluir um código javascript dentro de uma string maior, dentro das crases, o styled vai executar como uma função. Ele vai enviar para essa função todas as propriedades do meu ButtonContainer
//a propriedade variant vai vir para dentro desse props. Isto é, lá no meu componente de botão, estou passando como props variant, que são as cores que eu posso ter.
`