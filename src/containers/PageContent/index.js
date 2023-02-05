import React from "react";
import styled from "styled-components";
import {mainColor, textColor1} from "../../constants/colors";
import {FrontEnd_s1} from "../../externalData/FrontEnd/FrontEnd_1/FrontEnd_s1";
import parse from 'html-react-parser';

const ContentSubTitle = styled('h3')`
  margin-top: 30px;
`
const SubTitleNumeration = styled('span')`
  color: white;
  background: ${mainColor};
  padding: 3px;
  border: 1px solid ${mainColor};
  border-radius: 3px;
  margin: 0 12px;
`
const ContentText = styled('p')`
  color: ${textColor1};
  margin-top: 10px;
  text-align: justify;
  font-size: 16px;
  & iframe {
    display: block;
    margin: auto;
  }
`

const PageContent = ({
 pageData, currentPageId
}) => {
  const array = pageData[`page${currentPageId+1}`].map((el, index) => {
    if(Object.keys(el)[0] === 'pageSecondTitles'){
      return (
        <ContentSubTitle key={index}>
          <SubTitleNumeration key={index}>{`${currentPageId+1}.${el.num}`}.</SubTitleNumeration>
          {el.pageSecondTitles}
        </ContentSubTitle>
      )
    }else if(Object.keys(el)[0] === 'pageText'){
      return(
        <ContentText key={index}>
          {parse(el.pageText)}
        </ContentText>
      )
    }else if(Object.keys(el)[0] === 'pageVideo'){
      return(
        <iframe
          width="560"
          height="315"
          src={el.pageVideo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    }
  })
  return array
}

export default PageContent