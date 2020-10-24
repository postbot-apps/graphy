/**@jsx jsx */
import { jsx } from '@emotion/core';
import { Pane, Spinner } from 'evergreen-ui';
import { FunctionComponent } from 'react';

export const Loading: FunctionComponent = () => {
  return (
    <Pane height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Spinner />
    </Pane>
  );
};
