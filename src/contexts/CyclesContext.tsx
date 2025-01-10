//Eu vou criar o meu contexto aqui dentro e tudo que tem relação ao contexto

import { createContext, ReactNode, useState, useReducer } from "react" //o reducer serve para a gente armazenar uma informação e alterar essa informação no futuro.

interface CreateCycleDate { //Por que criei uma nova interface aqui ao invés de reaproveitar o que tem na home? Porque eu posso chamar a função de criar um novo ciclo, em algum momento da minha aplicação, sem ser pelo formulário
    //O meu contexto tem que ser desaclopado de bibliotecas externas para que, caso eu pare de usar o useForm, por exemplo, não interfira aqui dentro do meu contexto
    //Eu não importar o zod e fazer tudo aquilo somente para reaprveitar tipagem
    task: string;
    minutesAmount: number
}

interface Cycle { //interface para definir qual vai ser o formato de cada ciclo que eu adcionar dentro da minha aplicação
    id: string;//como eu vou ter um histórico de ciclos, é importante que eu tenha um id para representar cada ciclo. Cada vez que eu tiver uma informação que vai ser uma lista, é importante que eu tenha alguma coisa para identificar cada informação. Nesse caso, uma informação para representar cada ciclo
    task: string; //a descrição da tarefa
    minutesAmount: number; //a quantidade de minutos
    startDate: Date //Vou salvar a data que o meu timer começou a ficar ativo. O Date do javascript é tanto data quanto horário
    interruptedDate?: Date //data que o ciclo foi interrompido. Opcional porque la não necessariamente precisa interromper o clico
    finishedDate?: Date //guardar o valor do ciclo somente se ele foi encerrado
}

interface CyclesContextType { //aqui vamos falar quais são as informações que vamos armazenar dentro do contexto
    cycles: Cycle[]
    activeCycle: Cycle | undefined //undefined porque enquanto o usuário não iniciar um novo ciclo, essa variável fica como undefined
    activeCycleId: string | null //isso são estados que crie dentro deste componente e como quero usar em outros componentes, estou colocando aqui
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void //função sem parâmetros e sem retorno nenhum
    setSecondsPassed: (seconds: number) => void //função com parâmetro e sem retorno
    createNewCycle: (data: CreateCycleDate) => void //vou enviar essa função para outros componentes via contexto
    interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType) //criação do contexto

interface CyclesContextProviderProps {
    children: ReactNode; //ReactNode significa qualquer html válido
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) { //como lá no app estou chamando o componente <Route/> dentro deste componente CyclesContextProvider, precisei colocar o children
    //-> informação do ciclo:
    //const [cycles, setCycles] = useState<Cycle[]>([]) //um estado é a única forma de eu conseguir armazenar uma informação no meu componente que vá fazer com que minha interface reaja a essa informação, se muda.
    //o meu estado vai armazenar uma lista de ciclos. Um array de ciclos
    const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => { //Recebe dois parâmetros: uma função que recebe dois parâmetros: state(valor em tempo real da variável de ciclos. É a variável cycles) e uma action(qual ação o usuário está querendo realizar de alteração dentro da nossa variável), o segundo é qual o valor inicial da minha variável cycles
        //Aqui dentro do useReducer, eu tenho uma função que vai agregar todas as ações de modificação desse estado (adicionar um novo item, interromper um ciclo, marcar como finalizado). Desse modo, vou ter um ponto central para todas alterações necessárias. E cada uma dessas alteções distiguimos através do type ('ADD_NEW_CYCLE')
        if (action.type === 'ADD_NEW_CYCLE') {
            return [...state, action.payload.newCycle] //adicionar no array de ciclos
        }
        return state; //o retorno que faço dessa função aqui é o novo valor que esse estado vai receber sempre que uma action for disparada
    }, [])

    //-> informação do ciclo ativo:
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null) //o id do ciclo ativo pode ser null, porque enquanto o usuário não iniciar um novo ciclo, ele será null
    //Este é um estado que irá controlar se um ciclo está ativo ou não com base no seu id
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) //ela vai guardar a quantidade de segundos que já se passaram desde que o ciclo se iniciou. Assim, conseguimos ir reduzindo desse total de segundos (totalSeconds) menos os segundos que já se passaram

    //O método find percorre todo o array e traz o primeiro elemento que satisfaz a consdição
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)//mostrar na tela qual é o ciclo ativo. Com base no id do ciclo ativo, ele vai percorrer todos os ciclos e verificar quel ciclo tem o mesmo id do ciclo ativo

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() { //marcar o ciclo atual como finalizado

        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED', //aqui indico a ação que quero realizar
            payload: { //objeto que vou enviar os dados do meu novo ciclo
                activeCycleId
            }
        })

        // setCycles((state) => state.map(cycle => { //percorrer o ciclo
        //     //se o ciclo que estou percorrendo for o ciclo ativo, eu vou retornar todos os dados do ciclo, porém vou adicionar uma nova informação, que e a interruptedDate como a nova data, senão, retorno o ciclo sem alterações
        //     if (cycle.id === activeCycleId) {
        //         return { ...cycle, finishedDate: new Date() }
        //     } else {
        //         return cycle
        //     }
        // }))
    }
    //obs: Quando eu percebo que algum estado da minha aplicação, as alteerações que eu faço nesse estado, geralmente dependem do estado na sua versão anterior, e essas alterações são muitos complexas e extensas, nesses casos, faz sentido criarmos um reducer. Para o código ficar mais simples. Além disso, o reducer é como se fosse um lugar fixo para todas as alterações que podem acontecer dentro de um estado do nosso componente
    //Como estou usando o register, os valores task e minutesAmount são registrados, armazenados. Assim, quando o formulário for submetido, o react-hook-form coleta os dados registrados e passa esses valores para a função handleCreateNewCycle, que é a função chamada na hora da submissão, e, para acessar esses valores, você pode usar um parâmetro, que neste caso é o data
    function createNewCycle(data: CreateCycleDate) { //esse data é um objeto que contém dois campos do nosso formulário(task e minutesAmount)
        const id = String(new Date().getTime()) //converti a data para string porque definimos id como string
        const newCycle: Cycle = {//criar um novo ciclo. Como eu coloquei :Cycle, ele já vai me trazer tudo que tem dentro de Cycle, ou seja, todas as informações que ue preciso para criar um novo ciclo
            id,
            task: data.task, //Eu estou usando o NewCycleFormData para pegar os valores task e minutesAmount que vem do formulário; e Cycle para guradar as informações de cada ciclo
            minutesAmount: data.minutesAmount,
            startDate: new Date //data atual, ou seja, a data que o ciclo iniciou
        }
        //console.log("aaaaa", newCycle)

        dispatch({
            type: 'ADD_NEW_CYCLE', //aqui indico a ação que quero realizar
            payload: { //objeto que vou enviar os dados do meu novo ciclo
                newCycle
            }
        })

        //setCycles((state) => [...state, newCycle])//adicionar meu novo ciclo a listagem de ciclos. Assim, para acresecentar um novo ciclo, eu preciso pegar todos os ciclos que ue já tenho e adiocinar o novo ciclo
        setActiveCycleId(id) //passo para a função responsável por controlar se um ciclo está ativo ou não pelo id do ciclo, o id do ciclo. Essa função vai guardar na varável activeCycleId o id do ciclo.
        setAmountSecondsPassed(0)
        //Quando a função for chmamada, ele vai criar um id para o ciclo ( String(new Date().getTime())) e, ao mesmo tempo que ele criar, ele vai guardar esse id na função setActiveCycleId. Assim, o id criado quando o formulário for chamado vai ser o mesmo, pois está tudo na mesma função. Ele cria ali em cima e passa aqui(setActiveCycleId), por isso, o método sempre vai retornar true
        //Além disso, sempre que uma alteração de estado depender do seu valor anterior, a gente usa o formato de arrow function e passa um argumento
        //console.log(data) //como guardei em um register, ele guardou tudo que eu digitei
        // reset(); //ele limpa os campos, depois de o formulário ser submitado, para o valor inicial. Ele volta para o valor que eu defini dentro do defaultValues. 
    }

    function interruptCurrentCycle() {
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE', //aqui indico a ação que quero realizar
            payload: { //objeto que vou enviar os dados do meu novo ciclo
                activeCycleId,
            }
        })

        // setCycles((state) => state.map(cycle => { //percorrer o ciclo
        //     //se o ciclo que estou percorrendo for o ciclo ativo, eu vou retornar todos os dados do ciclo, porém vou adicionar uma nova informação, que e a interruptedDate como a nova data, senão, retorno o ciclo sem alterações
        //     if (cycle.id === activeCycleId) {
        //         return { ...cycle, interruptedDate: new Date() }
        //     } else {
        //         return cycle
        //     }
        // }))
        setActiveCycleId(null) //setar para null porque não quero que tenha mais nenhum ciclo ativo
    }
    //Lembre-se que no react temos que seguir o conceito de imutabilidade, ou seja, temos que perorrer todo o array para aí então mudarmos a informação que desejamos. Aqui utilizamos o map. Por que?
    //Estou chamando a função setCycles, alterando o valor da variável que armazena os ciclos da aplicação, se estou alterando o valor, eu preciso dizer qual é o novo valor. Assim o map vai retornara cada ums dos ciclos e ele vai retornar de dentro do map cada um dos ciclos alterdos ou não 


    return (
        <CyclesContext.Provider value=
            {{ cycles, activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, createNewCycle, interruptCurrentCycle }}>
            {children}
        </CyclesContext.Provider>
    )
}