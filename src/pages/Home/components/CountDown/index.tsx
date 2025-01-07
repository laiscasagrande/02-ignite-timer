import { useContext, useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function CountDown(){
  //obs: ao invés de passar a função setCycles para o contexto, criamos a função markCurrentCycleAsFinished. Por que fizemos isso? Porque a tipagem de setCycles ficara muito feia e fica mais performático fazer a função inteira lá na Home e só passar por contexto para usar neste componente 
  const {activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed} = useContext(CyclesContext)
  
   const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0//variável que vai converter o número de minutos que eu tenho no meu ciclo inserido pelo usuário em sgundos, porque é mais fácil eu trabalhar em segundos do que em minutos, porque o timer vai reduzir de segundo em segundo
    //Se houver um ciclo ativo, eu vou pegar a quantidade de minutos desse ciclo e converter para segundos
    
    useEffect(() => { //vamos criar nosso intervalo de tempo dentro do useEffect
      let interval: number
      if (activeCycle) { //sempre quando usamos uma variável que está fora do useEffect, temos que incluir essa variável no nosso array de dependências
        interval = setInterval(() => {
          const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate) //a data atual e a data quando o ciclo começou
          //obs: quando atualizamos um estado e esse estado depende do seu valor anterior, devemos escrever isso em  um formato de função 
          if (secondsDifference >= totalSeconds) { //se o total de segundos que eu percorri já foi igual ou maior que o número de tempo que o meu ciclo tem eu marco como completo
            // setCycles((state) => state.map(cycle => { //percorrer o ciclo
            //   //se o ciclo que estou percorrendo for o ciclo ativo, eu vou retornar todos os dados do ciclo, porém vou adicionar uma nova informação, que e a interruptedDate como a nova data, senão, retorno o ciclo sem alterações
            //   if (cycle.id === activeCycleId) {
            //     return { ...cycle, finishedDate: new Date() }
            //   } else {
            //     return cycle
            //   }
            // }))
            markCurrentCycleAsFinished() //só chamos ela aqui. O código comentado acima é a função markCurrentCycleAsFinished que fiz no componente Home
            setSecondsPassed(totalSeconds)
            clearInterval(interval)
          } else {
            setSecondsPassed(secondsDifference)//vou comparar a data atual com a data que eu salvei no startDate e ver quantos segundos já se passaram. Só vou atualizar o tanto de segundos que passou se ainda não completei o total de segundoss
          }
  
        }, 1000)//Ele vai contar quantos segundos se passaram nesse intervalo a cada 1 segundo. Se o usuário informou 5, vai pegar o horario atual e vai decrementar a diferença em segundos do 5 até agora
      } //se o meu ciclo estiver ativo (eu só quero fazer a redção do timer se o meu ciclo tiver ativo, porque se não estiver, vou fazer redução do que?), vou dar um setInterval a cada 1 segundo
  
      return () => { //posso retornar uma função dentro do useEffect. Ela serve para que, assim que eu executar esse useEffect de novo, porque a variável activeCycle mudou aqui nas minhas dependências, eu quero resetar o que estava acontecendo no useEffect anteriormente 
        clearInterval(interval)
      }
  
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed])  //cada vez que a variável activeCycle mudar, esse código vai executar de novo

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0//A conta, o tanto que já passou. Se tiver um ciclo ativo, vai pegar o total de segundos menos o total de segundo que já passou

    const minutesAmount = Math.floor(currentSeconds / 60)//Agora eu vou calcular quantos minutos eu tenho dentro desse total de segundos. O floor arredonda para baixo. Eu estou fazendo isso para mostrar isso em tela
    const secondsAmount = currentSeconds % 60//Calcular quantos segundos eu tenho do resto da divisão de cima. Se de cima estou pegando o valor inteiro, aqui estou pegando o resto. 
  
    const minutes = String(minutesAmount).padStart(2, '0') //Convterter o número de minutos para uma string para usar o padStart. Este é um método que preenche uma string até um tamanho específico caso ela não tenha aquele tamanho ainda. A variável de minutos eu sempre quero que ela tenha dois caracteres, se ela não tiver dois caraceres, eu voi incluir 0 no começo, na start da string até completar como outro caracter
    const seconds = String(secondsAmount).padStart(2, '0')
  
    useEffect(() => {
      if (activeCycle) {
        document.title = `${minutes}:${seconds}`
      }
    },
      [minutes, seconds, activeCycle])//quando meus minutos ou segundos mudarem, eu quero atualizar o título da minha janela

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