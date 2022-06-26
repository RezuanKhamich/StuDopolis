import React, {useState} from "react";
import styled from "styled-components";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import {hoverColor, mainColor, secondColor, textColor2} from "../../constants/colors";
import {useSelector} from "react-redux";
import {coursesData} from "../../externalData";
import MainPageTitle from "../../containers/MainPageTitle";
import {materialCollection} from "../../data/courseData";
import {Link} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import GamePointsBadge from "../GamePointsBadge";
import CustomBadge from "../CustomBadge";
import newsData from "../../externalData/News/news.json"
import parse from "html-react-parser";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const ContentWrapper = styled('div')`
  max-width: 1190px;
  margin: auto;
`;

const News = () => {
  return(
    <>
      <MainPageTitle>Обновления</MainPageTitle>

      <ContentWrapper>
        {
          newsData.news.map((elem, index) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <CustomBadge sx={{marginRight: '8px'}} message={elem.update} colorType={0} small/>
                <Typography gutterBottom variant="h6" fontSize="18px" margin="0">{elem.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Divider sx={{ marginBottom: '20px' }} />
                <Typography>{parse(elem.description)}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        }
      </ContentWrapper>




        {/*<Grid style={{maxWidth: 1190, margin: "auto"}} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>*/}
        {/*  {*/}
        {/*    newsData.news.map((elem, index) =>*/}
        {/*        <Grid item xs={4} key={index}>*/}
        {/*          <Link to={`task?courseId=${elem.courseId}&moduleId=${elem.moduleId}&lectureId=${elem.lectureId}&taskId=${elem.taskId}`} key={index}>*/}
        {/*            <InteractiveCard*/}
        {/*              sx={{maxWidth: 520}}*/}
        {/*            >*/}
        {/*              <div style={{display: 'flex', justifyContent: 'space-between'}}>*/}
        {/*                /!*<AwardStats>*!/*/}
        {/*                /!*  <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Награда в виде опыта">*!/*/}
        {/*                /!*    <DetailsBox style={{marginRight: '6px'}}>*!/*/}
        {/*                /!*      <GamePointsBadge count={`+${300 * (elem.data.difficult + 1)}`} pointType="1" small rectangular/>*!/*/}
        {/*                /!*    </DetailsBox>*!/*/}
        {/*                /!*  </Tooltip>*!/*/}

        {/*                /!*  <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Награда в виде GreenCoin">*!/*/}
        {/*                /!*    <DetailsBox>*!/*/}
        {/*                /!*      <GamePointsBadge count={`+${200 * (elem.data.difficult + 1)}`} pointType="0" small rectangular/>*!/*/}
        {/*                /!*    </DetailsBox>*!/*/}
        {/*                /!*  </Tooltip>*!/*/}
        {/*                /!*</AwardStats>*!/*/}

        {/*                /!*<CardMedia*!/*/}
        {/*                /!*  component="img"*!/*/}
        {/*                /!*  height="50"*!/*/}
        {/*                /!*  sx={{*!/*/}
        {/*                /!*    width: '280px',*!/*/}
        {/*                /!*    marginLeft: 'auto',*!/*/}
        {/*                /!*    borderBottomLeftRadius: '11px',*!/*/}
        {/*                /!*  }}*!/*/}
        {/*                /!*  image={coursesData[elem.courseId].iconURL}*!/*/}
                        {/*/>*/}
        {/*              </div>*/}

        {/*              <CardContent sx={{padding: '6px 16px 0 16px'}}>*/}
        {/*                <CustomBadge sx={{marginRight: '8px'}} message={`Обновление от ${elem.update}`} colorType={0} small/>*/}
        {/*                <Typography gutterBottom variant="h6" component="div" fontSize="18px">*/}
        {/*                  {elem.title}*/}
        {/*                </Typography>*/}
        {/*                {*/}
        {/*                  // elem.data.difficult === 0 ?*/}
        {/*                  //   <CustomBadge sx={{marginRight: '8px'}} message="легко" colorType={1} small/>*/}
        {/*                  //   :*/}
        {/*                  //   <CustomBadge sx={{ marginRight: '8px' }} message="сложно" colorType={2} small />*/}
        {/*                }*/}
        {/*                /!*<CustomBadge sx={{ marginRight: '8px' }} message="очень сложно" colorType={3} small />*!/*/}
        {/*                <Typography sx={{marginTop: '6px'}} variant="body2" color="text.secondary" fontSize="14px"*/}
        {/*                            height="52px">*/}
        {/*                  /!*{externalData.description}*!/*/}
        {/*                </Typography>*/}
        {/*              </CardContent>*/}
        {/*            </InteractiveCard>*/}
        {/*          </Link>*/}
        {/*        </Grid>*/}
        {/*    )*/}
        {/*  }*/}
        {/*</Grid>*/}
    </>
  )
};

export default News;


