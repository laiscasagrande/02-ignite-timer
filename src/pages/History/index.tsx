import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";


export function History() {
  const {cycles} = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
<pre>
  {JSON.stringify(cycles, null, 2)} {/*Mostrar em formato JSON e formater certinho*/}
</pre>
      <HistoryList> {/*Criamos uma div para, quando estiver em dispositivos mobile, o usuário conseguir arrastar a tabela para o lado através de um scroll. E só podemos fazer isso por meio de uma div*/}
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>28 minutos</td>
              <td>Há 2 meses</td>
              <td><Status statusColor="green">Concluído</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>28 minutos</td>
              <td>Há 2 meses</td>
              <td><Status statusColor="green">Concluído</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>28 minutos</td>
              <td>Há 2 meses</td>
              <td><Status statusColor="green">Concluído</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>28 minutos</td>
              <td>Há 2 meses</td>
              <td><Status statusColor="green">Concluído</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>28 minutos</td>
              <td>Há 2 meses</td>
              <td><Status statusColor="yellow">Em andamento</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>28 minutos</td>
              <td>Há 2 meses</td>
              <td><Status statusColor="red">Interrompido</Status></td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}