import React from "react";
import MainPageTitle from "../../containers/MainPageTitle";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import styled from "styled-components";
import GameIcon from "../../containers/GameIcon/GameIcon";

const InteractiveCard = styled(Card)`
  opacity: ${props => props.disabled ? '0.5' : '1'};
  height: 100px;
  position: relative;
  
  &:hover{
    transition: 0.5s;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    cursor: pointer;
  }

  @media (max-width: 430px) {
    margin: auto;
    height: 305px;
  }
`;

const Messages = () => {

  return(
    <>
      <MainPageTitle>Мои сообщения</MainPageTitle>

      <Grid style={{maxWidth: 1190, margin: "auto"}} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={ 12 }>
          <InteractiveCard disabled={false}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Web-разработчик/Модуль_1/Занятие_1
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Занятие +500 <GameIcon icon="0" />
              </Typography>
            </CardContent>
            <CardActions style={{textAlign: 'center', position: 'absolute', bottom: 0, right: 0}}>
              <Button
                size="small"
              >
                Удалить
              </Button>
              <Button
                variant="contained"
                color='success'
                size="small"
              >
                Получить
              </Button>
            </CardActions>
          </InteractiveCard>
        </Grid>
      </Grid>
    </>
  )
}

export default Messages;