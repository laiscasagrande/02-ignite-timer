import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
//import { useState } from "react";
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns' //calcula a diferença de duas datas em segundos
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";


interface Cycle { //interface para definir qual vai ser o formato de cada ciclo que eu adcionar dentro da minha aplicação
  id: string;//como eu vou ter um histórico de ciclos, é importante que eu tenha um id para representar cada ciclo. Cada vez que eu tiver uma informação que vai ser uma lista, é importante que eu tenha alguma coisa para identificar cada informação. Nesse caso, uma informação para representar cada ciclo
  task: string; //a descrição da tarefa
  minutesAmount: number; //a quantidade de minutos
  startDate: Date //Vou salvar a data que o meu timer começou a ficar ativo. O Date do javascript é tanto data quanto horário
  interruptedDate?: Date //data que o ciclo foi interrompido. Opcional porque la não necessariamente precisa interromper o clico
  finishedDate?: Date //guardar o valor do ciclo somente se ele foi encerrado
}

interface CyclesContextType { //aqui vamos falar quais são as informações que vamos armazenar dentro do contexto
  activeCycle: Cycle | undefined //undefined porque enquanto o usuário não iniciar um novo ciclo, essa variável fica como undefined
  activeCycleId: string | null //isso são estados que crie dentro deste componente e como quero usar em outros componentes, estou colocando aqui
  markCurrentCycleAsFinished: () => void //função sem parâmetros e sem retorno nenhum
}

export const CyclesContext = createContext({} as CyclesContextType) //criação do contexto

export function Home() { //se você passar o mouse em cima do useForm, você verá que o primeiro parâmetro que eu posso passar no generic é umm objeto, e o segundo é um any 
  //-> informação do ciclo:
  const [cycles, setCycles] = useState<Cycle[]>([]) //um estado é a única forma de eu conseguir armazenar uma informação no meu componente que vá fazer com que minha interface reaja a essa informação, se muda.
  //o meu estado vai armazenar uma lista de ciclos. Um array de ciclos

  //-> informação do ciclo ativo:
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null) //o id do ciclo ativo pode ser null, porque enquanto o usuário não iniciar um novo ciclo, ele será null
  //Este é um estado que irá controlar se um ciclo está ativo ou não com base no seu id

  //const [task, setTask] = useState('')

  //O método find percorre todo o array e traz o primeiro elemento que satisfaz a consdição
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)//mostrar na tela qual é o ciclo ativo. Com base no id do ciclo ativo, ele vai percorrer todos os ciclos e verificar quel ciclo tem o mesmo id do ciclo ativo

  function markCurrentCycleAsFinished() { //marcar o ciclo atual como finalizado
    setCycles((state) => state.map(cycle => { //percorrer o ciclo
      //se o ciclo que estou percorrendo for o ciclo ativo, eu vou retornar todos os dados do ciclo, porém vou adicionar uma nova informação, que e a interruptedDate como a nova data, senão, retorno o ciclo sem alterações
      if (cycle.id === activeCycleId) {
        return { ...cycle, finishedDate: new Date() }
      } else {
        return cycle
      }
    }))
  } 

  //Como estou usando o register, os valores task e minutesAmount são registrados, armazenados. Assim, quando o formulário for submetido, o react-hook-form coleta os dados registrados e passa esses valores para a função handleCreateNewCycle, que é a função chamada na hora da submissão, e, para acessar esses valores, você pode usar um parâmetro, que neste caso é o data
  // function handleCreateNewCycle(data: NewCycleFormData) { //esse data é um objeto que contém dois campos do nosso formulário(task e minutesAmount)
  //   const id = String(new Date().getTime()) //converti a data para string porque definimos id como string
  //   const newCycle: Cycle = {//criar um novo ciclo. Como eu coloquei :Cycle, ele já vai me trazer tudo que tem dentro de Cycle, ou seja, todas as informações que ue preciso para criar um novo ciclo
  //     id,
  //     task: data.task, //Eu estou usando o NewCycleFormData para pegar os valores task e minutesAmount que vem do formulário; e Cycle para guradar as informações de cada ciclo
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date //data atual, ou seja, a data que o ciclo iniciou
  //   }
  //   //console.log("aaaaa", newCycle)
  //   setCycles((state) => [...state, newCycle])//adicionar meu novo ciclo a listagem de ciclos. Assim, para acresecentar um novo ciclo, eu preciso pegar todos os ciclos que ue já tenho e adiocinar o novo ciclo
  //   setActiveCycleId(id) //passo para a função responsável por controlar se um ciclo está ativo ou não pelo id do ciclo, o id do ciclo. Essa função vai guardar na varável activeCycleId o id do ciclo.
  //   setAmountSecondsPassed(0)
  //   //Quando a função for chmamada, ele vai criar um id para o ciclo ( String(new Date().getTime())) e, ao mesmo tempo que ele criar, ele vai guardar esse id na função setActiveCycleId. Assim, o id criado quando o formulário for chamado vai ser o mesmo, pois está tudo na mesma função. Ele cria ali em cima e passa aqui(setActiveCycleId), por isso, o método sempre vai retornar true
  //   //Além disso, sempre que uma alteração de estado depender do seu valor anterior, a gente usa o formato de arrow function e passa um argumento
  //   //console.log(data) //como guardei em um register, ele guardou tudo que eu digitei
  //   reset(); //ele limpa os campos, depois de o formulário ser submitado, para o valor inicial. Ele volta para o valor que eu defini dentro do defaultValues. 
  // }

  function handleInterruptCycle() {

    setCycles((state) => state.map(cycle => { //percorrer o ciclo
      //se o ciclo que estou percorrendo for o ciclo ativo, eu vou retornar todos os dados do ciclo, porém vou adicionar uma nova informação, que e a interruptedDate como a nova data, senão, retorno o ciclo sem alterações
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle
      }
    }))
    setActiveCycleId(null) //setar para null porque não quero que tenha mais nenhum ciclo ativo
  }
  //Lembre-se que no react temos que seguir o conceito de imutabilidade, ou seja, temos que perorrer todo o array para aí então mudarmos a informação que desejamos. Aqui utilizamos o map. Por que?
  //Estou chamando a função setCycles, alterando o valor da variável que armazena os ciclos da aplicação, se estou alterando o valor, eu preciso dizer qual é o novo valor. Assim o map vai retornara cada ums dos ciclos e ele vai retornar de dentro do map cada um dos ciclos alterdos ou não 

  //const task = watch('task')//quero obervar o campo task, que foi o nome que eu dei no register. Agora consigo saber o valor do meu campo task em tempo real. Vou observar o campo task. Se ele for diferente de vazio, eu quero habilitar o botão  
 // const isSubmitDisabled = !task //meu botão vai estar desabilitado quando eu não tiver nada dentro da task. Para questões de legibilidade

  return (
    <HomeContainer>
      <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/ action=""> {/*passamos a função handleCreateNewCycle como argumento para a função handleSubmit */}
        <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
          {/*<NewCycleForm/>*/}
          <CountDown/>
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton /*disabled={isSubmitDisabled}*/ type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
//A função markCurrentCycleAsFinished foi definida no componente Home porque ela usa a função setCycles que só existe dentro do componente Home. 
// Aí eu enviei essa função dentro do contexto e assim todos os componentes que estão dentro deste contexto tem acesso a ela(todos que estão dentro do provider). 
// E quando o componente CountDown chama essa função, ele ta chamando na verdade a função que está aqui na Home, que vai alterar nosso estado de ciclos

