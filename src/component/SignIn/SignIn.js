import React, {useRef, useState} from "react";
import styled from "styled-components";
import {Alert, Button, TextField} from "@mui/material";
import {useAuth} from "../../context/AuthContext";
import teacherData from "../Header/Navbar/teacherData.json";

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

const SignIn = ({handleClick}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signin, currentUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault()

    const userEnteredData = {
      emailRef,
      passwordRef
    }

    try {
      setError('')
      setLoading(true)
      await signin(userEnteredData, setError, setLoading)
    } catch {
      setError('Ошибка: проверьте правильность введенных данных')
    }
  }

  return(
    <div>
      <PageTitle>StuDopolis</PageTitle>
      <Description>Скорей врывайся в мир IT</Description>
      <SectionTitle>Вход</SectionTitle>
      <Form onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}
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
          type="submit"
          color="success"
          variant="contained"
          fullWidth
          style={{margin: '20px 0'}}
          disabled={loading}
        >Войти</Button>
        <br/>
        {
          <Button style={{display: 'block', margin: 'auto'}} variant="outlined" onClick={handleClick}>Создать аккаунт</Button>
        }
      </Form>
    </div>
  )
}

export default SignIn;