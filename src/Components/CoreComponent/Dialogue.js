import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dialog:{
   padding: 0,
   margin: 0, 
   padding:'50px',
  },
  root: {
    height:'auto',
    width:'100%',
    margin: '100px 0 0 0',
    padding: '10px'
  },
  item: {
    display: 'flex',
    alignItems:"center",
    justifyContent: 'space-between'
  },
  btn: {
     marginLeft: '20px',
     marginTop: '20px',
     padding: '6px 50px 6px 50px',
     background: '#4267B2',
     '&:hover':{
       background: '#4267B2',
     },
     color: '#fff',
     [theme.breakpoints.up('md')]:{
      marginLeft: '20px',
      marginTop: '20px',
      padding: '6px 40px 6px 60px',
     },
     [theme.breakpoints.up('sm')]:{
      marginLeft: '20px',
     marginTop: '20px',
     padding: '6px 40px 6px 60px',
     }

  },
  btn2: {
    marginLeft: '20px',
    padding:'5px 15px',
    marginTop: '20px',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Dialogue(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div /* style={{overflow-x: 'hidden'}} */>

      <Dialog fullScreen open={true} onClose={props.handleClickOpen} TransitionComponent={Transition} className={classes.dialog}>
      
      <Grid container justify='flex-end'>          
          <Button autoFocus color="inherit" onClick={props.handleClickOpen}>
            <CloseIcon />
          </Button>
        </Grid>
        <Grid container direction='column' alignItems='center' justify='center' spacing={5} className={classes.root}>
       {/*  <Paper elevation={0}> */}
    <Grid item >
    <Paper elevation={0}> 
    <Typography variant='h5'>Cerrar Sesion</Typography>
    </Paper>
       
    </Grid>
    <Grid item >
    <Paper elevation={0}>
    <Typography variant='h7'>Estas seguro que  quieres cerrar sesion?</Typography>
       </Paper>
       
    </Grid>
    <Grid item className={classes.item} >
    <Paper elevation={0}> 
    <Button variant='contained' className={classes.btn} /* onClick={props.handleClickOpen} */>CERRAR SESION</Button>
       <Button variant='outlined' className={classes.btn2} /* onClick={props.handleClickOpen} */>PERMANCER CONECTADO</Button>
    </Paper>
      
    </Grid>
    {/* </Paper> */}
  </Grid>
  
      </Dialog>
    </div>
  );
}
