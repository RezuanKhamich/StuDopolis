import React, {useRef, useState} from "react";
import styled from "styled-components";
import {Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

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

const SignUp = ({handleClick}) => {
  const nameRef = useRef();
  const goalRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [goal, setGoal] = React.useState('');
  const { signup, currentUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value, setError, handleClick)
      setLoading(false)
    } catch {
      setError('Ошибка при создании аккаунта')
      setLoading(false)
    }
  }

  const handleChange = (event) => {
    setGoal(event.target.value);
  };

  return(
    <div>
      <PageTitle>StuDopolis</PageTitle>
      <Description>Создай свой профиль и врывайся в безумный мир IT</Description>
      <SectionTitle>Регистрация</SectionTitle>
      <Form onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          required
          id="outlined-required"
          label="Имя"
          variant="outlined"
          margin="normal"
          fullWidth
          inputRef={nameRef}
        />
        <FormControl
          fullWidth
          margin="normal"
        >
          <InputLabel id="demo-simple-select-label">Моя цель</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={goal}
            label="Моя цель"
            onChange={handleChange}
            inputRef={goalRef}
          >
            <MenuItem value={10}>Стать фрилансером</MenuItem>
            <MenuItem value={20}>Создать свою студию</MenuItem>
            <MenuItem value={30}>Устроиться в компанию</MenuItem>
          </Select>
        </FormControl>
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
          color="success"
          variant="contained"
          fullWidth
          type="submit"
          style={{margin: '20px 0'}}
          disabled={loading}
        >Создать аккаунт</Button>
        <br/>
        <Link onClick={handleClick}>У меня уже есть аккаунт</Link>
      </Form>
    </div>
  )
}

export default SignUp;