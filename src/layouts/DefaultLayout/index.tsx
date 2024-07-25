import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "./styles";

export function DefaultLayout(){
  //Tudo que eu colocar aqui dentro, vai aparecer em todas as páginas. Se eu colocar oii, vai aparecer em todas as páginas. O Outlet é que confere que cada página tem um conteúdo próprio
  return(
    <LayoutContainer>
      <Header/> {/*eu quero que o Header fique fixo em todas as páginas, para eu não precisar importar o componente Header em todas as páginas */}
    <Outlet/> {/*Do react router DOM, o Outlet é um espaço para ser inserido  um conteúdo. Assim, quando ele estiver utilizando este layout (DefaultLayout) com o Outlet ele vai saber extamente aonde ele tem que posicionar o conteúdo que é específico de uma página. O que é específico da Home, específico do History, vai ser posicionado aqui  */}
    </LayoutContainer>
  )
}