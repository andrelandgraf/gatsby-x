import React, { useContext } from 'react';

import { DialogContext } from '../contexts/dialog';
import { SEO, Button, Stack } from '../components';
import ExampleDialog from '../components/dialog/exampleDialog';

const DialogExamplePage = () => {
  const { openDialog } = useContext(DialogContext);

  return (
    <Stack gap="20px" centered={false}>
      <SEO title="Example Dialog" />
      <h1>Example Dialog</h1>
      <p>
        Click the button below to trigger the dialog. You should not be able to
        interact with the page while the dialog is open.
      </p>
      <Button
        label="Open Dialog"
        onClick={() => openDialog(<ExampleDialog />)}
        primary
      />
    </Stack>
  );
};

export default DialogExamplePage;
