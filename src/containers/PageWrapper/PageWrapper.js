import React from "react";
import styled from "styled-components";

const ContentWrapper = styled('div')`
  width: 980px;
  margin: 80px auto;
`

const PageWrapper = (props) => {
  return(
    <ContentWrapper>
      {props.children}
    </ContentWrapper>
  )
}

export default PageWrapper