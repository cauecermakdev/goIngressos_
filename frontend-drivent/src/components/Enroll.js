import styled from 'styled-components';

export const CategoryPage = styled.div`
  background-color:#1C1E28;
  width: 100%;
  height:100vh;
  display: flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  gap: 4px;
  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;

export const CategoriesContainer = styled.div`
  background-color:#1C1E28;
  margin: 100px 0px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  justify-content:center;
  gap: 4px;
  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;

export const CardCategory = styled.div`
  flex-direction: column;
  width:150px;
  height:150px; 
  border-radius:15px 15px 0px 0px ;
  opacity: ${props => props.selected ? 1 : 0.5}; // Adiciona sombra quando selecionado
  display:flex;
  align-items:bottom;
  justify-content:center;
  margin:10px;
  cursor: pointer; // Adiciona cursor de apontar ao passar o mouse
  transition: background-color 0.3s ease; // Adiciona transição suave de cor de fundo
`;

export const TitleCardCategory = styled.div`
  width:150px;
  height:40px; 
  background-color: #302D32;
  display:flex;
  align-items:center;
  justify-content:center;
  color: white;
  font-size:14px;
  border-radius:0px 0px 15px 15px;
  letter-spacing:1px;
`;

export const PhotoCategory = styled.div`
  ${props => props.imageUrl ? '' : 'background-color: red;'};
  background-image: url(${props => props.imageUrl});
  width:100%;
  height:100%;
  background-size: cover;
`;

export const Title =  styled.div`
  font-size:20px;
  color:white;
  font-weigth:200;  
  opacity:0.7;
  letter-spacing:2px;
`;

export const ButtonCategory =  styled.button`
  height: 40px;
  width:200px;
  font-size: 20px;
  font-weigth:600;
  background-color: #6c9bf7;
  color: white;
  display: flex;
  border-radius:50px;
  align-items: center;
  justify-content: center;
  border: none; // Remove a borda padrão do botão
  cursor: pointer; // Adiciona cursor de apontar ao passar o mouse
  transition: background-color 0.3s ease; // Adiciona transição suave de cor de fundo

  &:hover {
    opacity:0.7;// Muda a cor de fundo ao passar o mouse
  }
`;
