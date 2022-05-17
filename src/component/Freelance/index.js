import React, {useState} from "react";
import MainPageTitle from "../../containers/MainPageTitle";
import {hoverColor, mainColor, secondColor, textColor2} from "../../constants/colors";
import styled from "styled-components";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {coursesData} from "../../externalData";
import GameIcon from "../../containers/GameIcon/GameIcon";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import GamePointsBadge from "../GamePointsBadge";
import CustomBadge from "../CustomBadge";

const ToogleWrapper = styled(ToggleButtonGroup)( () =>({
  display: 'block!important',
  textAlign: 'center',
}));

const SectionsWrapper = styled('div')`
  background: ${mainColor};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  z-index: 250;
  color: white;
`
const SectionTitle = styled('h1')`
  text-align: center;
  font-size: 20px;
  padding: 5px;
  margin: 20px 0;
`
const Devider = styled('hr')`
  background-color: #6c757d;
  height: 1px;
  border: none;
  margin: 0;
`
const SectionButton = styled('button')`
  border: none;
  background: ${props => props.active || "none"};
  color: white;
  width: 100%;
  text-align: left;
  padding: 5px;
  font-size: 14px;
  border-bottom: 1px solid ${props => props.sectionDone || textColor2()};
  padding-top: 10px;
  &:hover{
    cursor: pointer;
    background-color: ${hoverColor()};
  }
`
const ContentWrapper = styled('div')`
  padding-right: 320px;
`

const InteractiveCard = styled(Card)`
  &:hover{
    transition: 0.5s;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    cursor: pointer;
  }
`;

const AwardStats = styled('div')`
  padding: 16px;
  display: flex;
`;

const DetailsBox = styled('span')`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
`;

const Freelance = () => {
  const [currentCourse, setCurrentCourse] = useState(0);
  const tableHeaders = [
    {title: 'Опыт', baseName: 'experienceAmount'},
    {title: 'Карьера', baseName: 'careerPosition'},
    // {title: 'GoldCoins', baseName: 'goldCoinAmount'},
    {title: 'GreenCoins', baseName: 'greenCoinAmount'},
  ]

  const [alignment, setAlignment] = useState(tableHeaders[0]);

  const ratingFilterChange = (event, newAlignment) => {
    if(newAlignment) setAlignment(tableHeaders[+newAlignment]);
  };

  return(
    <>
      <SectionsWrapper>
        <SectionTitle>Доступные направления</SectionTitle>
        <Devider />
        {
          coursesData.map((course, index) => {
            return <SectionButton
              key={index}
              sectionDone={course[index] ? secondColor() : null}
              active={index === currentCourse ? hoverColor() : null}
              disabled={course.disabled}
              // onClick={changeCurrentSection.bind(this, index)}
            >
              {index + 1}. {course.name}
            </SectionButton>
          })
        }
      </SectionsWrapper>
      <ContentWrapper>
        <MainPageTitle>Мой фриланс</MainPageTitle>
        <ToogleWrapper
          color="primary"
          value={alignment}
          exclusive
          onChange={ratingFilterChange}
        >
          <ToggleButton value="0">Новые</ToggleButton>
          <ToggleButton value="1">Выполненные</ToggleButton>
        </ToogleWrapper>
        <Grid style={{maxWidth: 1190, margin: "auto"}} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {
            coursesData.map((elem, index) => (
              <Grid item xs={6} key={index}>
                <Link to={`task?id=${index}`} key={index}>
                  <InteractiveCard
                    sx={{ maxWidth: 520 }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <AwardStats>
                        <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Награда в виде опыта">
                          <DetailsBox style={{ marginRight: '6px' }}>
                            <GamePointsBadge count="2810" pointType="1" small rectangular/>
                          </DetailsBox>
                        </Tooltip>

                        <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Награда в виде GreenCoin">
                          <DetailsBox>
                            <GamePointsBadge count="2460" pointType="0" small rectangular/>
                          </DetailsBox>
                        </Tooltip>
                      </AwardStats>

                      <CardMedia
                        component="img"
                        height="50"
                        sx={{
                          width: '280px',
                          marginLeft: 'auto',
                          borderBottomLeftRadius: '11px',
                        }}
                        image={elem.iconURL}
                      />
                    </div>

                    <CardContent sx={{ padding: '6px 16px 0 16px' }}>
                      <Typography gutterBottom variant="h6" component="div" fontSize="22px">
                        {elem.name}
                      </Typography>
                      <CustomBadge sx={{ marginRight: '8px' }} message="Сложность:" colorType={0} small />
                      <CustomBadge sx={{ marginRight: '8px' }} message="легко" colorType={1} small />
                      {/*<CustomBadge sx={{ marginRight: '8px' }} message="сложно" colorType={2} small />*/}
                      {/*<CustomBadge sx={{ marginRight: '8px' }} message="очень сложно" colorType={3} small />*/}
                      <Typography sx={{ marginTop: '6px'}} variant="body2" color="text.secondary" fontSize="14px" height="52px">
                        {elem.description}
                      </Typography>
                    </CardContent>
                    {/*<CardActions style={{textAlign: 'center', position: 'absolute', bottom: 0, right: 0}}>*/}
                    {/*  {*/}
                    {/*    !elem.disabled ?*/}
                    {/*      <Link to="modules">*/}
                    {/*        <Button size="small">Выполнить</Button>*/}
                    {/*      </Link>*/}
                    {/*      :*/}
                    {/*      <Button size="small" disabled>Выполнить</Button>*/}
                    {/*  }*/}

                    {/*</CardActions>*/}
                  </InteractiveCard>
                </Link>
              </Grid>
            ))
          }
        </Grid>
      </ContentWrapper>
    </>
  )
}

export default Freelance