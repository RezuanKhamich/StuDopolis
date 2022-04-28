import React, {useState} from "react";
import MainPageTitle from "../../containers/MainPageTitle";
import {hoverColor, mainColor, secondColor, textColor2} from "../../constants/colors";
import styled from "styled-components";
import {Card, CardActions, CardContent, CardMedia, Chip, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {coursesData} from "../../externalData";

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
  font-size: 16px;
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

const Freelance = () => {

  const [currentCourse, setCurrentCourse] = useState(0);

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
        <Grid style={{maxWidth: 1190, margin: "auto"}} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {
            coursesData.map((elem, index) => (
              <Grid item xs={6} key={index}>
                <Card
                  // sx={{ maxWidth: 345 }}
                  style={elem.disabled ? {height: 230, position: 'relative', opacity: 0.5} : {height: 230, position: 'relative'}}
                  raised = {!elem.disabled}
                >
                  <CardMedia
                    component="img"
                    height="50"
                    image={elem.iconURL}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {elem.name}
                    </Typography>
                    <Chip label="легко" color="success" />
                    <Chip label="средне" color="warning" />
                    <Typography variant="body2" color="text.secondary">
                      {elem.description}
                    </Typography>
                  </CardContent>
                  <CardActions style={{textAlign: 'center', position: 'absolute', bottom: 0, right: 0}}>
                    {
                      !elem.disabled ?
                        <Link to="modules">
                          <Button size="small">Выполнить</Button>
                        </Link>
                        :
                        <Button size="small" disabled>Выполнить</Button>
                    }

                  </CardActions>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </ContentWrapper>
    </>
  )
}

export default Freelance