import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '../../layouts/Auth';
import * as enrollCss from '../../components/Enroll';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { Row, Label } from '../../components/Auth';
import Link from '../../components/Link';

import { getCategories } from '../../services/categoriesApi';
import cervejadaPhoto from  '../../assets/images/cervejada.png';
import funkPhoto from  '../../assets/images/funk_.png';
import rockPhoto from  '../../assets/images/rock.png';
import sambaPhoto from  '../../assets/images/samba.png';
import trapPhoto from  '../../assets/images/trap.png';
import useSignUp from '../../hooks/api/useSignUp';

const imagesFolder = [
  { id: 1, path: cervejadaPhoto },
  { id: 2, path: funkPhoto },
  { id: 3, path: rockPhoto },
  { id: 4, path: sambaPhoto },
  { id: 5, path: trapPhoto },
];

export default function Enroll() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [chooseCategoryBool, setChooseCategoryBool] = useState(false);//libera componente choose category

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([15]);
  const [selectedCard, setSelectedCard] = useState([]); // Estado para controlar o card selecionado

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Erro ao obter categorias pages Component:', error);
      }
    }

    fetchCategories();
  }, []);

  const { loadingSignUp, signUp } = useSignUp();

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast('As senhas devem ser iguais!');
    } else {
      try {
        setChooseCategoryBool(true);
        toast('Agora escolha as categorias!');
      } catch (error) {
        toast('Não foi possível fazer o cadastro!');
      }
    }
  };

  async function registerUser() {
    // console.log(email, password, whatsapp, nome, dataNascimento, selectedCard, locations);
    await signUp(email, password, whatsapp, nome, dataNascimento, selectedCard, locations);
    
    navigate('/sign-in');
  }

  function toggleCategories(i) {
    if (selectedCard.includes(i)) {
      // Se o card já estiver selecionado, remove-o do array
      setSelectedCard(selectedCard.filter(cardIndex => cardIndex !== i));
    } else {
      // Se o card não estiver selecionado, adiciona-o ao array
      setSelectedCard([...selectedCard, i]);
    }
  }

  return (
    chooseCategoryBool?
      <enrollCss.CategoryPage>
        <enrollCss.Title>Selecione os eventos que mais gosta</enrollCss.Title>
        <enrollCss.CategoriesContainer>
          {categories?.map((category, i) => (
            <div key={category.id}>
              <enrollCss.CardCategory
                // onClick={() => setSelectedCard([...selectedCard, i])} // Define o card como selecionado ao clicar
                onClick={() => toggleCategories(i)}
                selected={selectedCard.includes(i)} // Passa o estado de seleção para o componente estilizado
              >
                <enrollCss.PhotoCategory imageUrl={imagesFolder[i].path}/>
                <enrollCss.TitleCardCategory>
                  {category.name}
                </enrollCss.TitleCardCategory>
              </enrollCss.CardCategory>
            </div>
          ))}
        </enrollCss.CategoriesContainer>
        <enrollCss.ButtonCategory onClick={() => registerUser()}>
          Confirmar
        </enrollCss.ButtonCategory>
      </enrollCss.CategoryPage>:
      <AuthLayout>
        <Row>
        </Row>
        <Row>
          <Label>Cadastro</Label>
          <form onSubmit={submit}>
            <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
            <Input label="Repita sua senha" type="password" fullWidth value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <Input label="WhatsApp" type="text" fullWidth value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            <Input label="Nome" type="text" fullWidth value={nome} onChange={e => setNome(e.target.value)} />
            <Input label="Data de Nascimento" type="text" fullWidth value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
            <Button type="submit" color="primary" fullWidth disabled={loadingSignUp}>Inscrever</Button>
          </form>
        </Row>
        <Row>
          <Link to="/sign-in">Já está inscrito? Faça login</Link>
        </Row>
      </AuthLayout>
  );
};
