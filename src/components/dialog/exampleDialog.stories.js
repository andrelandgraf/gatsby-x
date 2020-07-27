import React from 'react';
import ExampleDialog from './exampleDialog';
import Dialog from './dialog';

export default { title: 'Dialog' };

export const withDefault = () => (
  <Dialog>
    <ExampleDialog />
  </Dialog>
);
