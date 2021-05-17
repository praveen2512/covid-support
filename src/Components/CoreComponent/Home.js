import React from 'react';
import Dialogue from './Dialogue';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { FormHelperText, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'space-between'
  },
  btn: {
    marginLeft: '20px',
    padding: '6px 40px 6px 40px',
    background: '#4267B2',
    '&:hover': {
      background: '#4267B2',
    },
    color: '#fff'
  },
  btn2: {
    marginLeft: '20px',
    padding: '5px 15px'
  }
}));

const Home = (props) => {
  const [visibility, setVisibility] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setVisibility(!visibility)
  }

  return (
    <div style={{overflow: 'hidden'}}>

      {
        visibility ? <Dialogue handleClickOpen={handleClickOpen} /> : <Button variant='contained' color='primary' onClick={handleClickOpen}>Click Here</Button>
      }

    </div>
  );
}

export default Home;