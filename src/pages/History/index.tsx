import { HistoryContainer, HistoryList } from "./styles";


export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

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
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>28 minutos</td>
              <td>Há 2 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>28 minutos</td>
              <td>Há 2 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>28 minutos</td>
              <td>Há 2 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>28 minutos</td>
              <td>Há 2 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>28 minutos</td>
              <td>Há 2 meses</td>
              <td>Concluído</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}