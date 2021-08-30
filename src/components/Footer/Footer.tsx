import React from 'react';

import { Box, Container, makeStyles } from '@material-ui/core';
import Copyright from '../Copyright/Copyright';

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth='md' component='footer' className={classes.footer}>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default Footer;
