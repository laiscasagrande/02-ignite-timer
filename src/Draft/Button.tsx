//import styles from './Button.module.css'
import { ButtonContainer, ButtonVariant } from './Button.styles'

interface ButtonProps{
  variant?: ButtonVariant
}

export function Button(
  {variant = 'primary'}: ButtonProps //como a cor é opcional, os botões que não forem passados nenhuma cor terão primary
){
  return(
    <ButtonContainer variant={variant}>Enviar</ButtonContainer> //estamos utilizando um componente estilizado
  )
}
//<button className={`${styles.button} ${styles[color]}`}>Enviar</button> //está em colchetes porque eu tenho uma lista de cores
//CSS:
// .button{
//   height: 100px;
//   width: 100px
// }
// .primary{
//   background-color: purple;
// }
// .secondary{
//   background-color: orange;
// }
// .danger{
//   background-color: red;
// }
// .success{
//   background-color: green
// }