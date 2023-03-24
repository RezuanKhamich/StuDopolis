import React from "react";
import styled from "styled-components";
import {mainColor} from "../../../constants/colors";
import NavElement from "../NavElement";
import {Link} from "react-router-dom";
import {pageNavigationData} from "../../../externalData";
import admin from "./media/admin_logo_important.png";
import teacherData from "./teacherData.json";
import {useSelector} from "react-redux";

const NavContainer = styled('nav')`
  background: ${mainColor};
  position: fixed;
  left: 0;
  bottom: 0;
  width: 80px;
  z-index: 250;

  @media (min-width: 430px) {
    top: 0;
  }
  @media (max-width: 430px) {
    width: 100%;
    height: 58px;
  }
`
const ListWrapper = styled('ul')`
  list-style: none;
  color: white;

  @media (max-width: 430px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
`

const Navbar = () => {
  const userAuthData = useSelector(state => state.repos.userAuthData);

  return(
    <NavContainer>
      <ListWrapper>
        {
          pageNavigationData.map((list, index) => (
            <Link to={ userAuthData?.uid || list.demoPage ? `/${list.link}` : '/'} key={index}>
              <NavElement
                key={index}
                titleName={list?.name}
                titleImg={list.img}
                titleMsg={list.msg}
                isLogo={list?.logo}
                disabled={!(userAuthData?.uid || list.demoPage)}
              />
            </Link>
          ))
        }
        {
          teacherData.teacherHash === userAuthData?.uid ?
            <Link to={'/administration'}>
              <NavElement
                titleName={'Учитель'}
                titleImg={admin}
                titleMsg={false}
              />
            </Link> : null
        }
      </ListWrapper>
    </NavContainer>
  )
}

export default Navbar