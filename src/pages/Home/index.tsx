import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
//import { useState } from "react";
import {useForm} from 'react-hook-form'

export function Home() {
const {register, handleSubmit, watch  } = useForm() //É um objeto com várias funcionalidades que eu posso utizar para criar nosso formulário. Como o useForm retorna um objeto, eu posso usara desestruturação para extrair algumas variáveis desse retorno. As principais funções são o register e o handleSubmit
//const [task, setTask] = useState('')

function handleCreateNewCycle(data: any){
console.log(data) //como guardei em um register, ele guardou tudo que eu digitei
}

const task = watch('task')//quero obervar o campo task, que foi o nome que eu dei no register. Agora consigo saber o valor do meu campo task em tempo real. Vou observar o campo task. Se ele for diferente de vazio, eu quero habilitar o botão  
const isSubmitDisabled = !task //meu botão vai estar desabilitado quando eu não tiver nada dentro da task. Para questões de legibilidade

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=""> {/*passamos a função handleCreateNewCycle como argumento para a função handleSubmit */}
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>{/*Coloquei em uma label porque eu quero que quando a pessoa clicar em "Vou trabalhar em" ela de focus no input de forma automática*/}
          <TaskInput 
          type="task" 
          list="task-suggestions" 
          placeholder="Dê um nome para o seu projeto"
          //onChange={(e) => setTask(e.target.value)} //cada vez que o usuário trocar o valor desse input, ou seja, digitar uma nova tecla, eu salvo isso dentro do meu estado. Cada vez que uma letra é digitada ou removida, eu atualizo o estado
          //value={task} //uma boa prática é colocar o value do input com o valor do nosso estado. Porque se esse estado mudar sem que seja através da digitação do usuário, eu também quero mostrar isso. Por exemplo, imagina que queremos resetar o input, ou seja, limpar o valor dele quando o formulário for submitado. Perceba que estou atualizando o formulário sem que seja por meio da digitação do usuário. Como quero mostrar isso no inút, eu coloco o estado no seu value
          //Esse value e o onChange é uma forma de controlar em tempo realo tudo que é digitado e feito no input. Assim, e consigo refletir visualmente as alterações dos meus inputs. Um exemplo disso, desabilitar o botão somente quando eu não tiver nada escrito dentro do input
          {...register('task')}
          ></TaskInput>{/*para mim trabalhar com a label, o id do input precisa se o mesmo htmlFor da label*/}

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
            {...register('minutesAmount', {valueAsNumber: true})} //o valueAsNumber é para informar que os minutos são n´meros, não strings
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
        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}

