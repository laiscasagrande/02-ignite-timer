import { CountdownContainer, Separator } from "./styles";

export function CountDown(){
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