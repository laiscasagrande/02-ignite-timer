import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
//import { useState } from "react";
import { useContext} from "react";
// import { differenceInSeconds } from 'date-fns' //calcula a diferença de duas datas em segundos
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod' //uso essa sintaxe (* as) para bibliotecas que não são export default
import { CyclesContext } from "../../contexts/CyclesContext";


const newCycleFormValidationSchema = zod.object({ //utilizamos o nome schema porque essas bibliotecas de validação utilizam schema base. Um schema nada mais é do que definirmos um formato e validarmos os dados do nosso formulário com base neste formato, com base em um schema 
  task: zod.string().min(1, 'informe a tarefa'),//eu tenho um objeto que contém nome da tarefa e o tempo de execução, por isso coloquei zod.object
  minutesAmount: zod.number().min(1, 'O ciclo precisa ser de no mínimo 5 minutos').max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

// interface NewCycleFormData { //Utilize interface quando você quer definit um objeto de validação, e use type quando você for criar uma tipagem do typeScript a partir de outra referência, de uma outra variável. Nesse caso, estamos criando um type a aprtir das informações que inferimos pelo zod acima
//   task: string;
//   minutesAmount: number;
// }

//Ele retirou isso, inferiu isso dentro da validação que fizemos usando o zod. Então, ao invés de criar uma nova interface contendo esses dados, como eu já tenho elas definidas na validação do zod, eu posso criar um type no qual a tipagem pode ser inferida através da validação com o zod
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //o inferir, dentro do typeScript, é definir automaticamnete a tipagem de alguma coisa
//importante lembrar que, sempre que eu estou querendo refenrenciar uma variável javaScript dentro do typeScript, eu preciso usar o typeof dentro dela

export function Home() { //se você passar o mouse em cima do useForm, você verá que o primeiro parâmetro que eu posso passar no generic é umm objeto, e o segundo é um any 
 
  const {createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CyclesContext)
  //const [task, setTask] = useState('')

  //  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({//É um objeto com várias funcionalidades que eu posso utizar para criar nosso formulário. Como o useForm retorna um objeto, eu posso usara desestruturação para extrair algumas variáveis desse retorno. As principais funções são o register e o handleSubmit
  //     resolver: zodResolver(newCycleFormValidationSchema), //aqui eu tenho que passar meu schema de validação, ou seja, de quer forma eu quer validar os campos que estão presentes no formulário
  //     defaultValues: { //ela traz a possibilidade de eu passar qual é o valor inicial de cada campo
  //       task: '', //como eu coloquei a interface do objeto nos generics do useForm, se eu der um ctrl espaço aqui, vai aparecer todas as opções que eu tenho. Fica mais organizado dessa forma 
  //       minutesAmount: 0
  //     }
  //   }) //aqui estou cirando um objeto de configuração para o useForm

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')//quero obervar o campo task, que foi o nome que eu dei no register. Agora consigo saber o valor do meu campo task em tempo real. Vou observar o campo task. Se ele for diferente de vazio, eu quero habilitar o botão  
  const isSubmitDisabled = !task //meu botão vai estar desabilitado quando eu não tiver nada dentro da task. Para questões de legibilidade

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)} action=""> {/*passamos a função handleCreateNewCycle como argumento para a função handleSubmit */}
       
          <FormProvider {...newCycleForm}> {/*o ... é o spreed e o newCycleForm é a variável que criamos para o useForm. O spreed serve para pegar cada uma das propriedades(register, formState, etc) do objeto newCycleForm e passo como uma propriedade para o FormProvider*/}
            <NewCycleForm />
          </FormProvider>
          <CountDown />
        
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
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

