import React from 'react';
import styled from 'styled-components';

import STYLES from '../../enums/styles';
import Button from '../clickables/button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  margin-left: auto;
  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    width: 100%;
  }
  button {
    margin-right: 10px;
    @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
      width: 100%;
      margin: 5px 0;
    }
  }
`;

const ExampleDialog = () => (
  <Container>
    <h1>Modal Dialog</h1>
    <p>
      Thank you very much for checking by! This is a modal dialog!
      <br />
      It uses the dialog component and inserts styled children.
    </p>
    <ButtonContainer>
      <Button label="Back" onClick={() => {}} />
      <Button label="Continue" onClick={() => {}} primary />
    </ButtonContainer>
  </Container>
);

export default ExampleDialog;
