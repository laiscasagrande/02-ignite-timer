//O styled components também me permite criar estilos globais
//também em sintaxe javaScript
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle` //aqui eu coloco todo css que eu quero que seja global
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:focus{
  outline: 0;
  box-shadow: 0 0 0 2px ${props => props.theme['green-500']};
}

body{
  background: ${props => props.theme['gray-900']}; //Tenho que colocar entre colchetes por causa do hífen
  color: ${props => props.theme['gray-300']};
  -webkit-font-smoothing: antialiased;
}

body, input, textarea, button{
  font-family: 'Roboto', sans-serif; //se a fonte roboto não conseguir ser carregada, colocamos uma fonte sans-serif qualquer
font-weight: 400;
font-size: 1rem
}
`