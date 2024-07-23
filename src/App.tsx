import { Button } from "./Button";
import {ThemeProvider} from 'styled-components' 
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}> {/*Como ThemeProvider é um componente, ele espera uma propriedade chamada theme, que estou passando o defaultTheme que contém as cores*/}
      <Button variant='primary'/>
      <Button variant='danger'/>
      <Button variant='secondary'/>
      <Button variant='success'/>
      <Button />

      <GlobalStyle/> {/*Tenho que colocar dentro do ThemeProvider para que nossos temas também possam ter acesso a essas estilizações*/}
    </ThemeProvider>
  )
}
