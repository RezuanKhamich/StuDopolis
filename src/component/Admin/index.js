import React, {useEffect, useState} from "react";
import styled from "styled-components";
import MainPageTitle from "../../containers/MainPageTitle";
import app from "../../firebase";
import {setUsersList} from "../../utils/reducers/repoReducer";
import {Card, CardContent, CardMedia, Grid, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const ContentWrapper = styled('div')`
  max-width: 1196px;
  margin: auto;
`;

const InteractiveCard = styled(Card)`
  opacity: ${props => props.disabled ? '0.5' : '1'};
  padding: 5px;
  height: 60px;
  position: relative;
  
  &:hover{
    transition: 0.5s;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    cursor: pointer;
  }

  @media (max-width: 430px) {
    margin: auto;
  }
`;

const EmailContent = styled('span')`
  color: #2884f6;
  cursor: text;
  font-size: 16px;
`;

const Admin = () => {
  const dispatch = useDispatch();
  const usersList = useSelector(state => state.repos.usersList);
  const { innerWidth: width, innerHeight: height } = window;
  const [inputValue, setInputValue] = useState('');
  const [nativeUsersList, setNativeUsersList] = useState('');

  useEffect(async () => {
    const snapshot = await app.firestore().collection('users').get()
    setNativeUsersList(snapshot.docs)
    const sortedData = snapshot.docs.map(doc => doc.data()).sort((a,b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0))

    dispatch(setUsersList(sortedData));
    }, [])

  const filterHandler = (event) => {
    setInputValue(event.target.value.toLowerCase());
  }

  return(
    <>
      <MainPageTitle>Ученики</MainPageTitle>
      <ContentWrapper>
        <TextField
          sx={{ width: '100%', backgroundColor: 'white', marginBottom: '30px' }}
          id="outlined-name"
          label="Поиск"
          value={inputValue}
          onChange={filterHandler}
        />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {
            usersList ?
              usersList.filter(el => {
                if(el.firstName.toLowerCase().includes(inputValue)
                  || el.lastName.toLowerCase().includes(inputValue)
                  || el.email.toLowerCase().includes(inputValue)) return el
              }).map((elem, index) => {
                let uid = null

                if (nativeUsersList){
                  nativeUsersList.forEach(doc => doc.data().email === elem.email ? uid = doc._delegate._key.path.segments[doc._delegate._key.path.segments.length-1] : null)
                }

                return (
                  <Grid item xs={ width > 500 ? 6 : 12 } key={index}>
                    <Link to={`student?userId=${index}&uid=${uid}`}>
                      <InteractiveCard sx={{display: 'flex'}}>
                        <CardContent sx={{padding: '16px 16px 16px 0'}}>
                          <Typography variant="body2" fontSize="16px" height="52px">
                            {index + 1}. {elem.firstName} {elem.lastName} <EmailContent>{elem.email}</EmailContent>
                          </Typography>
                        </CardContent>
                      </InteractiveCard>
                    </Link>
                  </Grid>
                )

              })
              : null
          }
        </Grid>

      </ContentWrapper>
    </>
  )
}

export default Admin