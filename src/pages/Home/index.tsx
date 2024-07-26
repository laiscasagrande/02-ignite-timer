import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separator } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>{/*Coloquei em uma label porque eu quero que quando a pessoa clicar em "Vou trabalhar em" ela de focus no input de forma automática*/}
          <input type="task"></input>{/*para mim trabalhar com a label, o id do input precisa se o mesmo htmlFor da label*/}

          <label htmlFor="minutesAmount">durante</label>
          <input type="number" id="minutesAmount"></input>

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <button type="submit">
          <Play size={24}/>
          Começar
        </button>
      </form>
    </HomeContainer>
  )
}