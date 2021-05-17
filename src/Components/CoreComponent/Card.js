import React from 'react';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        textAlign:'center',
        borderRadius: '10px solid black ',
        margin: '10px',
        padding: '5px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    headerRoot: {
        background: '#c7cbd1'
    }
});

export default function SimpleCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    let { data } = props

    return (
        <Card className={classes.root}>
            <CardHeader
            className={classes.headerRoot}
                title={data.Name}
            /*         subheader="September 14, 2016" */
            />
            <CardContent>
                <Grid container alignItems='center' justify='space-evenly'>
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            
                         </Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                           Vacant / Total
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems='center' justify='space-evenly'>
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Normal
                         </Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {data.TotalNormalBedVacant} / {data.TotalNormalBed}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems='center' justify='space-evenly'>
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Oxygen
                         </Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {data.TotalO2BedVacant} / {data.TotalO2Bed}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems='center' justify='space-evenly'>
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            ICU
                         </Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {data.TotalICUBedVacant} / {data.TotalICUBed}
                        </Typography>
                    </Grid>                    
                </Grid>
                <Grid container alignItems='center' justify='space-evenly'>
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Total
                         </Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {data.TotalBedVacant} / {data.TotalBed}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
