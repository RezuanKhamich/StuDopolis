import React, {useRef, useState} from "react";
import styled from "styled-components";
import {Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import WolfIcon from "../../media/wolf_photo.png";
import RacoonIcon from "../../media/racoon_photo.png";
import BearIcon from "../../media/bear_photo.png";
import FoxIcon from "../../media/fox_photo.png";
import TigerIcon from "../../media/tiger_photo.png";

const PageTitle = styled('h1')`
    text-align: center;
    font-size: 60px;
    margin: 2rem 0;
  `;

const SectionTitle = styled('h3')`
    text-align: center;
    margin: 2rem 0;
    font-size: 2rem;
  `;

const Description = styled('p')`
    text-align: center;
    margin-bottom: 1rem;
    color: #6c757d;
  `;

const Form = styled('form')`
    max-width: 700px;
    margin: auto;
  `;

const StudentPhoto = styled.img`
  width: 100px;
  border: 1px solid #0000002e;
  padding: 5px;
  border-radius: 10px;
  filter: grayscale(1);
  opacity: 0.5;

  ${props => props.selected ? `
    filter: none;
    opacity: 1;` 
    : `
    filter: grayscale(1);
    opacity: 0.5;
  `}
  
  &:hover{
    filter: none;
    cursor: pointer;
  }

  @media (max-width: 430px) {
    width: 70px;
    margin-bottom: 20px;
  }
`;

const SignUp = ({handleClick}) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [photoSelected, setPhotoSelected] = useState(null)

  const { signup, currentUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault()

    const userEnteredData = {
      firstNameRef,
      lastNameRef,
      emailRef,
      passwordRef,
      photoSelected: photoSelected || '0',
    }
    try {
      setError('')
      setLoading(true)
      await signup(userEnteredData, setError, handleClick)
      setLoading(false)
    } catch {
      setError('Ошибка при создании аккаунта')
      setLoading(false)
    }
  }

  return(
    <div>
      <PageTitle>StuDopolis</PageTitle>
      <Description>Создай свой профиль и врывайся в безумный мир IT</Description>
      <SectionTitle>Регистрация</SectionTitle>
      <Form onSubmit={handleSubmit}>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '20px', textAlign: 'center' }}>Выбери свой аватар</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <StudentPhoto src={WolfIcon} selected={photoSelected === 0} onClick={() => setPhotoSelected(0)} alt=""/>
          <StudentPhoto src={RacoonIcon} selected={photoSelected === 1} onClick={() => setPhotoSelected(1)} alt=""/>
          <StudentPhoto src={BearIcon} selected={photoSelected === 2} onClick={() => setPhotoSelected(2)} alt=""/>
          <StudentPhoto src={FoxIcon} selected={photoSelected === 3} onClick={() => setPhotoSelected(3)} alt=""/>
          <StudentPhoto src={TigerIcon} selected={photoSelected === 4} onClick={() => setPhotoSelected(4)} alt=""/>
        </div>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          required
          id="outlined-required"
          label="Имя"
          variant="outlined"
          margin="normal"
          fullWidth
          inputRef={firstNameRef}
        />
        <TextField
          required
          id="outlined-required"
          label="Фамилия"
          variant="outlined"
          margin="normal"
          fullWidth
          inputRef={lastNameRef}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          type="email"
          margin="normal"
          fullWidth
          inputRef={emailRef}
        />
        <TextField
          required
          id="outlined-password-input"
          label={ !error ? "Пароль" : "Ошибка" }
          type="password"
          autoComplete="current-password"
          margin="normal"
          fullWidth
          inputRef={passwordRef}
          helperText= { !error ? null : "Incorrect entry."}
          error = { !error ? null : true}
        />
        <Button
          color="success"
          variant="contained"
          fullWidth
          type="submit"
          style={{margin: '20px 0'}}
          disabled={loading}
        >Создать аккаунт</Button>
        <br/>
        <Button style={{display: 'block', margin: 'auto'}} variant="outlined" onClick={handleClick}>У меня уже есть аккаунт</Button>
      </Form>
    </div>
  )
}

export default SignUp;