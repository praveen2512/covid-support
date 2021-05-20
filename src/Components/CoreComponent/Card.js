import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Divider} from "@material-ui/core";

import {AccessTime, Contacts, LocationOn, Person, Phone, PhoneAndroid} from "@material-ui/icons"

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
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

  const { ContactDetails, Name, Latitude, Longitude, UpdatedDateTime, PrimaryContactPerson, MobileNumber, Landline } = data;
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
        <Divider />
        <Grid container className="">
          <Grid item xs={12} md={6} className="my-3">
            <Contacts />{PrimaryContactPerson !== "" ? PrimaryContactPerson : "N/A"}
          </Grid>
          <Grid item xs={12} md={6} className="my-3">
            <PhoneAndroid />{MobileNumber !== "" ? MobileNumber : "N/A"}
          </Grid>
        </Grid>
        <Divider />
        {
          ContactDetails.map((contact, idx) => <>
          <Grid key={contact._id ? contact._id : idx } container className="">
            <Grid item xs={12} md={4} className="my-3">
              <Phone />{contact.ContactNumber !== "" ? contact.ContactNumber : "N/A"}
            </Grid>
            <Grid item xs={12} md={4} className="my-3">
              <Person />{contact.ContactName !== "" ? contact.ContactName : "N/A"}
            </Grid>
            <Grid item xs={12} md={4} className="my-3">
              <AccessTime />{contact.Timing && contact.Timing !== "" ? contact.Timing : "N/A"}
            </Grid>
          </Grid>
          <Divider />
        </>)
        }
        
        <Grid container className="">
          <Grid item xs={12} md={12} className="my-3">
            <LocationOn />{`${Line1 && Line1 !== "" ? Line1 : '' } ${Line2 && Line2 !== "" ? ", " + Line2 : '' } ${Line3 && Line3 !== "" ? ", " + Line3 : '' }`}
          </Grid>
          <Grid item xs={12} md={12} className="my-3">
            <a href={`https://www.google.com/maps/search/?api=1&query=${Latitude},${Longitude}`} target="_blank" rel="noreferrer">Location</a>
          </Grid> 
        </Grid>

      </CardContent>
    </Card>
  );
}
