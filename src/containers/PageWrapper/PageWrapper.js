import React from "react";
import styled from "styled-components";

const ContentWrapper = styled('div')`
  width: 980px;
  margin: 80px auto;

  @media (max-width: 430px) {
    width: 100%;
    margin: 20px auto;
  }
`

const PageWrapper = (props) => {
  return(
    <ContentWrapper>
      {props.children}
    </ContentWrapper>
  )
}

export default PageWrapper