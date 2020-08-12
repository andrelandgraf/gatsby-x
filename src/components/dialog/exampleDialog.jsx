import React, { useRef, useContext } from 'react';
import styled from 'styled-components';

import STYLES from '../../enums/styles';
import { DialogContext } from '../../contexts/dialog';
import useFocusTrab from '../../hooks/useFocusTrab';
import useFocusOnMount from '../../hooks/useFocusOnMount';
import Button from '../clickables/button';
import Dialog from './dialog';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
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

const ExampleDialog = () => {
  const firstFocusableRef = useRef();
  const lastFocusableRef = useRef();
  useFocusOnMount(firstFocusableRef);
  const handleKeyDown = useFocusTrab(firstFocusableRef, lastFocusableRef);
  const { closeDialog } = useContext(DialogContext);

  return (
    <Dialog title="Modal Dialog" handleKeyDown={handleKeyDown}>
      <Container>
        <h1>Modal Dialog</h1>
        <p>
          Thank you very much for checking by! This is a modal dialog!
          <br />
          It uses the dialog component and inserts styled children.
        </p>
        <ButtonContainer>
          <Button ref={firstFocusableRef} label="Back" onClick={closeDialog} />
          <Button
            ref={lastFocusableRef}
            label="Continue"
            onClick={() => {}}
            primary
          />
        </ButtonContainer>
      </Container>
    </Dialog>
  );
};

export default ExampleDialog;
