import React from "react";
import styled from "styled-components";
import {mainColor, secondColor} from "../../../constants/colors";
import NavElement from "../NavElement";
import {Link} from "react-router-dom";

import logo from './media/logo.png'
import homeImg from './media/home_new.png'
import learn_newImg from './media/learn_new.png'
import freelanceImg from './media/freelance_new.png'
import ratingImg from './media/rating_new.png'
import companyImg from './media/company_new.png'
import newsImg from './media/news_new.png'
import messageImg from './media/message_new.png'
import helpImg from './media/help_new.png'
import exitImg from './media/exit_new.png'


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
const titlesObj = [
  {img: logo, msg: false, logo: true, link: 'home'},
  {name: 'Кабинет', img: homeImg, msg: false, link: 'profile'},
  {name: 'Обучение', img: learn_newImg, msg: true, link: 'learn'},
  {name: 'Фриланс', img: freelanceImg, msg: false, link: 'freelance'},
  {name: 'Рейтинг', img: ratingImg, msg: false, link: 'rating'},
  {name: 'Модель', img: ratingImg, msg: false, link: 'model'},
  /*{name: 'Карьера', img: companyImg, msg: false},
  {name: 'Новости', img: newsImg, msg: false},
  {name: 'Почта', img: messageImg, msg: false},
  {name: 'Помощь', img: helpImg, msg: false},
  {name: 'Выйти', img: exitImg, msg: false},*/
]

const Navbar = () => {
  return(
    <NavContainer>
      <ListWrapper>
        {
          titlesObj.map((list, index) => (
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