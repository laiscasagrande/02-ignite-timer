import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
//import { useState } from "react";
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"; //para integrar a biblioteca zod no react-hook-form
import * as zod from 'zod' //uso essa sintaxe (* as) para bibliotecas que não são export default

const newCycleFormValidationSchema = zod.object({ //utilizamos o nome schema porque essas bibliotecas de validação utilizam schema base. Um schema nada mais é do que definirmos um formato e validarmos os dados do nosso formulário com base neste formato, com base em um schema 
task: zod.string().min(1, 'informe a tarefa'),//eu tenho um objeto que contém nome da tarefa e o tempo de execução, por isso coloquei zod.object
minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no mínimo 5 minutos').max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

// interface NewCycleFormData { //Utilize interface quando você quer definit um objeto de validação, e use type quando você for criar uma tipagem do typeScript a partir de outra referência, de uma outra variável. Nesse caso, estamos criando um type a aprtir das informações que inferimos pelo zod acima
//   task: string;
//   minutesAmount: number;
// }

//Ele retirou isso, inferiu isso dentro da validação que fizemos usando o zod. Então, ao invés de criar uma nova interface contendo esses dados, como eu já tenho elas definidas na validação do zod, eu posso criar um type no qual a tipagem pode ser inferida através da validação com o zod
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //o inferir, dentro do typeScript, é definir automaticamnete a tipagem de alguma coisa
//importante lembrar que, sempre que eu estou querendo refenrenciar uma variável javaScript dentro do typeScript, eu preciso usar o typeof dentro dela

export function Home() { //se você passar o mouse em cima do useForm, você verá que o primeiro parâmetro que eu posso passar no generic é umm objeto, e o segundo é um any 
const {register, handleSubmit, watch, reset  } = useForm<NewCycleFormData>({//É um objeto com várias funcionalidades que eu posso utizar para criar nosso formulário. Como o useForm retorna um objeto, eu posso usara desestruturação para extrair algumas variáveis desse retorno. As principais funções são o register e o handleSubmit
resolver: zodResolver(newCycleFormValidationSchema), //aqui eu tenho que passar meu schema de validação, ou seja, de quer forma eu quer validar os campos que estão presentes no formulário
defaultValues: { //ela traz a possibilidade de eu passar qual é o valor inicial de cada campo
task: '', //como eu coloquei a interface do objeto nos generics do useForm, se eu der um ctrl espaço aqui, vai aparecer todas as opções que eu tenho. Fica mais organizado dessa forma 
minutesAmount: 0
}
}) //aqui estou cirando um objeto de configuração para o useForm
//const [task, setTask] = useState('')

function handleCreateNewCycle(data: NewCycleFormData){ //esse data é um objeto que contém dois campos do nosso formulário(task e minutesAmount)
console.log(data) //como guardei em um register, ele guardou tudo que eu digitei
reset(); //ele limpa os campos, depois de o formulário ser submitado, para o valor inicial. Ele volta para o valor que eu defini dentro do defaultValues. 
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
            // step={5} //vai pular de 5 em 5
            // min={5}
            // max={60}
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

