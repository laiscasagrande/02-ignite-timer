import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>{/*Coloquei em uma label porque eu quero que quando a pessoa clicar em "Vou trabalhar em" ela de focus no input de forma automática*/}
          <TaskInput type="task" list="task-suggestions" placeholder="Dê um nome para o seu projeto"></TaskInput>{/*para mim trabalhar com a label, o id do input precisa se o mesmo htmlFor da label*/}

          <datalist id="task-suggestions"> {/*datalist é uma lista de sugestões para um input*/}
            <option value="task-suggestions"/>{/*posso passar cada sugestão como uma option*/}
            <option value="Projeto 01"/>
            <option value="Projeto 02"/>
            <option value="Projeto 03"/>
            <option value="Banana"/>
          </datalist> 

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            list=""
            placeholder="00"
            step={5} //vai pular de 5 em 5
            min={5}
            max={60}
          >
          </MinutesAmountInput>

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountdownButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}