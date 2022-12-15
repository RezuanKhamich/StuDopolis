import React, {useState} from "react";
import {hoverColor, mainColor, secondColor, textColor2} from "../../constants/colors";
import styled from "styled-components";
import {coursesData} from "../../externalData";
import MainPageTitle from "../../containers/MainPageTitle";
import {Alert, ToggleButton, ToggleButtonGroup} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const SectionsWrapper = styled('div')`
  background: ${mainColor};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  z-index: 200;
  color: white;
`
const ToogleWrapper = styled(ToggleButtonGroup)( () =>({
  display: 'block!important',
  textAlign: 'center',
}));
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
const SectionBurgerButton = styled(`Button`)`
  position: absolute;
  right: 20px;
  top: -15px;
  z-index: 300;
  border: none;
  background: none;
  color: ${props => props.showSectionTab ? 'white' : mainColor}}
`;
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

  @media (max-width: 430px) {
    padding: 0 10px;
  }
`

const Shop = () => {
  const { innerWidth: width, innerHeight: height } = window;
  const [currentCourseId, setCurrentCourseId] = useState(0);
  const [showSectionTab, setShowSectionTab] = useState(false)

  const tableHeaders = [
    {title: 'Заказы', isDoneTask: false},
    {title: 'Выполнено', isDoneTask: true},
    {title: 'Приобретено', isDoneTask: true},
  ]

  const [alignment, setAlignment] = useState(tableHeaders[0]);

  const openSectionTab = () => setShowSectionTab(prevState => !prevState)

  const changeCurrentSection = (sectionId) => {
    setAlignment(tableHeaders[0]);
    setCurrentCourseId(sectionId)
  }

  const shopFilterChange = (event, newAlignment) => {
    if(newAlignment) {
      setAlignment(tableHeaders.find(el => el.title === newAlignment));
    }
  };

  return(
    <>
      {
        width <= 500 ?
          <SectionBurgerButton onClick={openSectionTab} showSectionTab={showSectionTab}>
            <MenuIcon/>
          </SectionBurgerButton>
          : null
      }
      {
        width >= 500 || showSectionTab ?
          <SectionsWrapper>
            <SectionTitle>Направления</SectionTitle>
            <Devider />
            {
              coursesData.map((course, index) =>
                <SectionButton
                  key={index}
                  sectionDone={course[index] ? secondColor() : null}
                  active={index === currentCourseId ? hoverColor() : null}
                  onClick={changeCurrentSection.bind(this, index)}
                >
                  {index + 1}. {course.name}
                </SectionButton>
              )
            }
          </SectionsWrapper>
          : null
      }
      <ContentWrapper>
        <MainPageTitle>G-Pay</MainPageTitle>
        <ToogleWrapper
          color="success"
          value={alignment.title}
          exclusive
          onChange={shopFilterChange}
        >
          <ToggleButton value="Заказы">Все</ToggleButton>
          <ToggleButton value="Выполнено">Доступные</ToggleButton>
          <ToggleButton value="Приобретено">Приобретенные</ToggleButton>
        </ToogleWrapper>
        <div style={{ maxWidth: '670px', margin: 'auto' }}>
          <Alert variant="outlined" severity="info" sx={{ marginTop: '20px' }}>Приобретай за GreenCoins новые проекты и особые фриланс задачи!</Alert>
        </div>
      </ContentWrapper>
    </>
  )
}

export default Shop;