import React, {useState} from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import MainPageTitle from "../../../containers/MainPageTitle";
import PageWrapper from "../../../containers/PageWrapper/PageWrapper";
import {Box, Card, CardContent, CardMedia, Chip, Grid, LinearProgress, Typography} from "@mui/material";
import playerHead from "../../../media/player-head.png";
import GameIcon from "../../../containers/GameIcon/GameIcon";
import {coursesData} from "../../../externalData";

const InteractiveCard = styled(Card)`
  opacity: ${props => props.disabled ? '0.5' : '1'};
  &:hover{
    transition: 0.5s;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    cursor: pointer;
  }
`;

const Profile = () => {

  const [progress, setProgress] = useState(100);

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress color="secondary" variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}/100`}</Typography>
        </Box>
      </Box>
    );
  }


  return(
    <>
      <PageWrapper>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <img style={{width: 200, border: '1px solid transparent', borderRadius: '50%', marginRight: 20}} src={playerHead} alt=""/>
          <Box>
            <Typography variant="h3">Резуан Хамуков</Typography>
            <Typography sx={{display: 'flex', marginBottom: 3}} color="text.secondary" variant="h5">
              Должность: <Typography sx={{marginLeft: 1}} color="black" variant="h5">Стажер</Typography>
            </Typography>
          </Box>
        </div>
        <Card sx={{marginBottom: 5}}>
          <CardContent sx={{ width: '100%' }}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box>
                <Typography variant="p" color="text.secondary">Опыт:</Typography>
                <Typography variant="h5">
                  <GameIcon width={80} icon="0" /> 1234
                </Typography>
              </Box>
              <Box>
                <Typography variant="p" color="text.secondary">GoldCoin:</Typography>
                <Typography variant="h5">
                  <GameIcon width={80} icon="1" /> 1234
                </Typography>
              </Box>
              <Box>
                <Typography variant="p" color="text.secondary">GreenCoin:</Typography>
                <Typography variant="h5">
                  <GameIcon width={80} icon="2" /> 1234
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Typography sx={{marginBottom: 2, textAlign: 'center'}} variant="h5" color="text.secondary">Мои курсы</Typography>
        <Grid container spacing={2}>
          {
            coursesData.map((el, index) => (
              <Grid item md={6} sx={{width: '100%'}} key={index}>
                <InteractiveCard disabled={el.disabled}>
                  <CardContent sx={{ width: '100%' }}>
                    <Typography sx={{display: 'flex'}} variant="subtitle1" color="text.secondary" component="div">
                      <CardMedia
                        component="img"
                        sx={{ width: 50, marginRight: 1 }}
                        image={el.iconURL}
                        alt="Live from space album cover"
                      />{el.name}
                    </Typography>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={progress} />
                    </Box>
                  </CardContent>
                </InteractiveCard>
              </Grid>
            ))
          }
        </Grid>
      </PageWrapper>
    </>
  )
}

export default Profile