import React from "react";
import styled from "styled-components";
import {backColor} from "../../constants/colors";

const FooterWrapper = styled('div')`
    background-color: ${backColor};
    position: absolute;
    bottom: 0;
    width: 100%;
    line-height: 3.5rem;
    padding-left: 80px;
    height: 62px;
`
const FooterBox = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`
const MailLink = styled('a')`
  color: #6c757d;
`
const CopyRight = styled('span')`
  color: #6c757d;
`
const SocNetworkContainer = styled('div')`
  display: flex;
`
const SocNetworkLink = styled('a')`
  margin: auto 5px;
`
const SocNetworkImg = styled('img')`
  width: 36px; 
  height: 36px; 
  object-fit: cover;
`

const Footer = () => {
    return(
        <FooterWrapper>
            <FooterBox>
                <CopyRight>© 2021 StuDopolis.</CopyRight>
                <MailLink href="https://gogame_school@mail.ru">gogame_school@mail.ru</MailLink>
                <SocNetworkContainer>
                    <SocNetworkLink href="https://www.instagram.com/gogame_school/?hl=ru">
                        <SocNetworkImg id="LnkBr00imageimageimage"
                            alt="Instagram - Белый круг"
                            data-type="image" itemProp="image"
                            src="https://static.wixstatic.com/media/da7ef6dd1302486c9a67baebe4b364bc.png/v1/fill/w_45,h_45,al_c,q_85,usm_0.66_1.00_0.01/da7ef6dd1302486c9a67baebe4b364bc.webp"
                        />
                    </SocNetworkLink>
                    <SocNetworkLink href="https://vk.com/gogameschool">
                        <SocNetworkImg id="LnkBr01imageimageimage"
                            alt="Vkontakte - Белый круг" data-type="image"
                            itemProp="image"
                            src="https://static.wixstatic.com/media/f96243f8a8f44e6c952d86da576cec13.png/v1/fill/w_45,h_45,al_c,q_85,usm_0.66_1.00_0.01/f96243f8a8f44e6c952d86da576cec13.webp"
                        />
                    </SocNetworkLink>
                </SocNetworkContainer>
            </FooterBox>
        </FooterWrapper>
    )
}

export default Footer