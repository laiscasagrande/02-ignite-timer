import styled from "styled-components";

export const HeaderContainer = styled.header`
display: flex;
align-items: center;
justify-content: space-between;

nav {
  display: flex;
  gap: 0.5rem;

 a {
  width: 3rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme['gray-100']};

  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent; //se eu colocar só o hover para dar hover no border-bottom, a imagem levanta para cima. Por isso, defini border=bottom primeiro e depois coloco o hover

&:hover{
  border-bottom: 3px solid ${(props) => props.theme['green-500']};
};

&.active{ //o navlink do react-router-dom coloca na âncora que está por volta do ícone um active. Eu posso estilizar ela
  color: ${(props) => props.theme['green-500']}
}
}
}
`