import React from "react";
import styled from "styled-components";
import {mainColor} from "../../../constants/colors";
import NavElement from "../NavElement";
import {Link} from "react-router-dom";
import {pageNavigationData} from "../../../externalData";

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
  return(
    <NavContainer>
      <ListWrapper>
        {
          pageNavigationData.map((list, index) => (
            <Link to={`/${list.link}`} key={index}>
              <NavElement
                  key={index}
                  titleName={list?.name}
                  titleImg={list.img}
                  titleMsg={list.msg}
                  isLogo={list?.logo}
              />
            </Link>
          ))
        }
      </ListWrapper>
    </NavContainer>
  )
}

export default Navbar