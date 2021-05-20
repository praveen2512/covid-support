import React from "react";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import {AccessTime, LocationOn, Person, Phone} from "@material-ui/icons"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    textAlign: "center",
    borderRadius: "10px solid black ",
    margin: "10px",
    padding: "5px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  headerRoot: {
    background: "#c7cbd1",
  },
});

export default function SimpleCard({ data }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const { Name, Latitude, Longitude, UpdatedDateTime } = data;
  const {
    VaccantNonO2Beds,
    AllotedNonO2Beds,
    VaccantO2Beds,
    AllotedO2Beds,
    VaccantICUBeds,
    AllotedICUBeds,
    TotalVaccantBeds,
    BedsAllotedForCovidTreatment,
  } = data.CovidBedDetails;

  const { ContactName, ContactNumber, Timing} = data.ContactDetails[0];
  const { Line1, Line2, Line3 } = data.AddressDetail;

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.headerRoot}
        title={Name}
        /*         subheader="September 14, 2016" */
      />
      <CardContent>
        <Grid container alignItems="center" justify="space-evenly">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            ></Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Vacant / Total
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justify="space-evenly">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Normal
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {VaccantNonO2Beds} / {AllotedNonO2Beds}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justify="space-evenly">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Oxygen
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {VaccantO2Beds} / {AllotedO2Beds}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justify="space-evenly">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              ICU
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {VaccantICUBeds} / {AllotedICUBeds}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justify="space-evenly">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Total
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {TotalVaccantBeds} / {BedsAllotedForCovidTreatment}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Phone />{ContactNumber !== "" ? ContactNumber : "N/A"}
          </Grid>
          <Grid item xs={12} md={4}>
            <Person />{ContactName !== "" ? ContactName : "N/A"}
          </Grid>
          <Grid item xs={12} md={4}>
            <AccessTime />{Timing && Timing !== "" ? Timing : "N/A"}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={12}>
            <LocationOn />{`${Line1 && Line1 !== "" ? Line1 : '' } ${Line2 && Line2 !== "" ? ", " + Line2 : '' } ${Line3 && Line3 !== "" ? ", " + Line3 : '' }`}
          </Grid>
          <Grid item xs={12} md={12}>
            <a href={`https://www.google.com/maps/search/?api=1&query=${Latitude},${Longitude}`} target="_blank">Location</a>
          </Grid> 
        </Grid>

      </CardContent>
    </Card>
  );
}
