//o d.ts quer dizer que dentro deste arquivo eu só vou ter código de definiçãao de tipos do typeScript, e nunca código javascript ou quealquer outra coisa assim
//Só posso ter códigos totalmente javascript
import 'styled-components'
import {defaultTheme} from '../styles/themes/default'
//se eu passar o mouse por cima de defaultTheme, eu vou ver as tipagnes da variáveis das cores que criei. Eu posso guardar essas tipagnes dentro de uma variável

type ThemeType = typeof defaultTheme //eu estou guradando as tipagnes automáticas que o typeScript passa dentro de uma variável
//eu criei uma variável ThemeType que vai guardar os tipos das variáveis que estão presentes no defaultTheme

declare module 'styled-components' { //eu estou criando uma tipagem para o módulo styled-components. Toda vez que eu importar o styled-components dentro de algum arquivo, a definição de tipagem que ele vai puxar é o que eu defini aqui dentro
export interface DefaultThemes extends ThemeType { //o DefaultThemes é o próprio typeSript que dá para que nó possamos passar as propriedades desejadas para dentro do nosso tema. E ela vai extender o nosso ThemeType, que definimos ali em cima
} //Agora, como coloquei uma tipagem para o meu tema, quando eu der um ctrl espaço em props.theme, vai aparecer as minhas opções disponíveis
}