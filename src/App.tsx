import { ThemeProvider } from 'styled-components'
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}> {/*Como ThemeProvider é um componente, ele espera uma propriedade chamada theme, que estou passando o defaultTheme que contém as cores*/}
      <BrowserRouter> {/*o theme e o globalStyle podem ficar fora, mas o Router deve ficar dentro do Browser, porque ele deve envolver as nossas rotas*/}
        <Router />
      </BrowserRouter>
      <GlobalStyle /> {/*Tenho que colocar dentro do ThemeProvider para que nossos temas também possam ter acesso a essas estilizações*/}
    </ThemeProvider>
  )
}
//O ThemeProvider e o BrowserRouter visualmente não produzem nada em tela, ou seja, não mostram nada em tela, mas são necessários e precisam ficar por fora dos outros componentes. São Context Provder. Não possuem conteúdo visual, mas produzem um contexto para os componentes que estão dentro deles, ou seja, informações oara os componentes que estão dentro deles saberem do contexto de fora, acessarem funções que estão além, por fora do que está dentro deles. Basicamente, serve para os componentes que estão dentro destes contextos acessarem informações que estão fora destes componentes