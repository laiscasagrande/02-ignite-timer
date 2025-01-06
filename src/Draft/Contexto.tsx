//Vamos evitar passar tantas props usando o contexto do react! Uma variável compartilhada com vários componentes
import { createContext, useContext, useState } from "react"; //createContext: função //useContext: compartilhar a informação (activeCycle: 1) com os componentes NewCycleForm e Countdown

//preciso armazenar esse contexto em uma variável, cujo nome precisa ter alguma relação com a informação que guardarei dentro deste contexto
const CyclesContext = createContext({//dentro deste parêntese fica o valor inicial deste contexto. Usamos um objeto porque normalmente usamos um contexto para guardar mais informações
    //activeCycle: 5, //aqui dentro eu falo que eu vou ter uma informação que se chama activeCycle e o valor dela é 1, é o valor inicial. Isso não é um estado, é uma variável primitiva, um número
} as any) //o any é para o ts não ficar alertando para que eu possa colocar o que eu quiser no value do provider sem precisar ficar colocando aqui dentro

function NewCycleForm() {
    let { activeCycle, setActiveCycle } = useContext(CyclesContext) //coloco a informação que está no meu contexto, uso e useContext e passo o nome do contexto
    return (
        <h1>NewCycleForm: {activeCycle}
            <button onClick={() => {
                setActiveCycle(2) //mesmo eu não colocando essa função no componente Countdown, vai mudar lá também
            }}>Alterar ciclo ativo</button>
        </h1>

    )
}

function Countdown() {
    const { activeCycle } = useContext(CyclesContext)
    return <h1>Countdown: {activeCycle}</h1>
}

export function Home() {//Vou criar o estado dentro da Home, porquê a Home é o componente pai e é o componente que está por volta dos outros componentes
    const [activeCycle, setActiveCycle] = useState(0) //Sempre que eu quero que as informações sejam acessíveis por contexto, os dados do contexto precisam estar no componente mais por fora possível dos subcomponentes
    return (
        <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}> {/*Coloco por volta dos componentes que precisam ter acesso às informações do contexto. Esse provider recebe um valor, no qual, neste valor, eu preciso enviar quais informações eu quero que sejam compartilhadas entre todos os componentes que estão dentro do provider*/}
            {/*Dentro do value, nós enviamos um objeto com todas as informações que queremos enviar*/}
            <div>
                <NewCycleForm />
                <Countdown />
            </div>
        </CyclesContext.Provider>

    )
}
//Quando eu crio um contexto, e eu compartilho uma informação incial do contexto com vários componentes, eu não posso modificar essas informações. Assim, o meu contexto tem o mesmo valor para sempre.
//Mas se eu quiser modificar essa informação? Sempre que temos uma variável no react que terá seu valor alterado com o tempo, principalmente baseado em ações que o usuário faz, como cliques em botões, essa variável precisar ser um estado
