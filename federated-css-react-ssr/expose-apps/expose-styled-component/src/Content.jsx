import React from "react";
import styled from 'styled-components';

//styled component Li
const StyledComponent = styled.div`
  border : 2px solid green;
  width: 50%;
  padding: 12px;
  background-color: purple;
  color: white;
`;

export default () => (
    <div>
        <StyledComponent data-e2e="FEDERATED_CSS_BUTTON">This is exposed Styled Component content</StyledComponent>
    </div>
);
