import { useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";

interface CountDownProps {
  activeCycle: any;
  setCycles: any;
  activeCycleId: any
}

export function CountDown({activeCycle, setCycles, activeCycleId}: CountDownProps){
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) //ela vai guardar a quantidade de segundos que já se passaram desde que o ciclo se iniciou. Assim, conseguimos ir reduzindo desse total de segundos (totalSeconds) menos os segundos que já se passaram
   const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0//variável que vai converter o número de minutos que eu tenho no meu ciclo inserido pelo usuário em sgundos, porque é mais fácil eu trabalhar em segundos do que em minutos, porque o timer vai reduzir de segundo em segundo
    //Se houver um ciclo ativo, eu vou pegar a quantidade de minutos desse ciclo e converter para segundos
    
    useEffect(() => { //vamos criar nosso intervalo de tempo dentro do useEffect
      let interval: number
      if (activeCycle) { //sempre quando usamos uma variável que está fora do useEffect, temos que incluir essa variável no nosso array de dependências
        interval = setInterval(() => {
          const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate) //a data atual e a data quando o ciclo começou
          //obs: quando atualizamos um estado e esse estado depende do seu valor anterior, devemos escrever isso em  um formato de função 
          if (secondsDifference >= totalSeconds) { //se o total de segundos que eu percorri já foi igual ou maior que o número de tempo que o meu ciclo tem eu marco como completo
            setCycles((state) => state.map(cycle => { //percorrer o ciclo
              //se o ciclo que estou percorrendo for o ciclo ativo, eu vou retornar todos os dados do ciclo, porém vou adicionar uma nova informação, que e a interruptedDate como a nova data, senão, retorno o ciclo sem alterações
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }))
            setAmountSecondsPassed(totalSeconds)
            clearInterval(interval)
          } else {
            setAmountSecondsPassed(secondsDifference)//vou comparar a data atual com a data que eu salvei no startDate e ver quantos segundos já se passaram. Só vou atualizar o tanto de segundos que passou se ainda não completei o total de segundoss
          }
  
        }, 1000)//Ele vai contar quantos segundos se passaram nesse intervalo a cada 1 segundo. Se o usuário informou 5, vai pegar o horario atual e vai decrementar a diferença em segundos do 5 até agora
      } //se o meu ciclo estiver ativo (eu só quero fazer a redção do timer se o meu ciclo tiver ativo, porque se não estiver, vou fazer redução do que?), vou dar um setInterval a cada 1 segundo
  
      return () => { //posso retornar uma função dentro do useEffect. Ela serve para que, assim que eu executar esse useEffect de novo, porque a variável activeCycle mudou aqui nas minhas dependências, eu quero resetar o que estava acontecendo no useEffect anteriormente 
        clearInterval(interval)
      }
  
    }, [activeCycle, totalSeconds, activeCycleId])  //cada vez que a variável activeCycle mudar, esse código vai executar de novo

  return(
        <CountdownContainer>
          <span>{minutes[0]}</span> {/*Coloquei um vetor aqui porque quero pegar a primeira letra da string*/}
          <span>{minutes[1]}</span>{/*Com o pedStart, em cima peguei a primeira string e aqui peguei a segunda. Ou seja, eu tenho dentro de minutes uma string 21 (que representa 21 minutos). Aqui estou pegando na posição 0, que é a string 2, e na posição 1, que é a string 1.*/}
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}