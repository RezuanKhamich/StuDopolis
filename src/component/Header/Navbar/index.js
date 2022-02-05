import React from "react";
import styled from "styled-components";
import {mainColor, secondColor} from "../../../constants/colors";
import NavElement from "../NavElement";
import {Link} from "react-router-dom";
import {pageNavigationData} from "../../../externalData";

const NavContainer = styled('nav')`
  background: ${mainColor};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80px;
  z-index: 250;
`
const ListWrapper = styled('ul')`
  list-style: none;
  color: white;
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