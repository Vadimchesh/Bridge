import React from 'react';

import { Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/Vadimchesh'>
        Vadzim Lindo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright