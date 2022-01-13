import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useAuth} from "../../context/AuthContext";

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
const Link = styled('button')`
  display: block;
  margin: auto;
  text-align: center;
`

const SignIn = ({handleClick}) => {
  const nameRef = useRef();
  const goalRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [goal, setGoal] = React.useState('');
  const { signin, currentUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await signin(emailRef.current.value, passwordRef.current.value, setError, setLoading)
    } catch {
      setError('Ошибка при создании аккаунта')
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
        <Link onClick={handleClick}>Создать аккаунт</Link>
      </Form>
    </div>
  )
}

export default SignIn;