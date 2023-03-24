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
  font-size: 18px;
  padding: 0 62px;

  & pre {
    padding: 0 12px;
    white-space: break-spaces;
    word-break: break-word;
  }

  white-space: break-spaces;
  word-break: break-word;
  
  @media (max-width: 430px) {
    padding: 0 12px;
    font-size: 14px;
    & pre {
      font-size: 14px;
      padding: 0 12px!important;
    }
  }
`
const FrameVideo = styled('iframe')`
  @media (max-width: 430px) {
    height: 200px;
    width: 100%;
    margin: 20px 0px 0px 0px!important;
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
        <FrameVideo
          width="560"
          height="315"
          style={{ display: 'block', margin: '20px 0 0 62px', borderRadius: '10px' }}
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