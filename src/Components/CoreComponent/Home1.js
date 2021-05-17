import React from 'react';
import Dialogue from './Dialogue';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { FormHelperText, Typography } from '@material-ui/core';
import ComboBox from './AutoComplete'
import AppBar from '@material-ui/core/AppBar';
import DataTable from './DataTable';
const axios = require('axios')


const useStyles = makeStyles((theme) => ({
  appBar:{
      padding: "30px",
  },
  input: {
      margin: '20px 0',
  }
}));

const Home1 = (props) => {
  const [visibility, setVisibility] = React.useState(false);
  const [hospitalData , setHospitalData] = React.useState([])
  const classes = useStyles();


  const processDistrictData = (result) =>{
   let displayData = []
   let temp = {}
   result.map((value,index)=>{
       //console.log('DataProcessed',index,value)
       temp ={}
       temp['Name'] = value.Name
       temp['TotalNormalBed'] = value.CovidBedDetails.AllotedNonO2Beds
       temp['TotalNormalBedVacant'] = value.CovidBedDetails.VaccantNonO2Beds
       temp['TotalO2Bed'] = value.CovidBedDetails.AllotedO2Beds
       temp['TotalO2BedVacant'] = value.CovidBedDetails.VaccantO2Beds
       temp['TotalICUBed'] = value.CovidBedDetails.AllotedICUBeds
       temp['TotalICUBedVacant'] = value.CovidBedDetails.VaccantICUBeds
       temp['TotalBed'] = value.CovidBedDetails.BedsAllotedForCovidTreatment
       temp['TotalBedVacant'] = value.CovidBedDetails.TotalVaccantBeds
       displayData.push(temp)
   })
   
   console.log('HospitalData',displayData)
   setHospitalData(displayData)
  }

   const handleSelect =  (event,value) => {
      //console.log('From Handle Select',value)
      if(value  !== '' && value !== undefined && value["_id"] !== undefined){
       let request = {
            "Districts": [value._id],
            "FacilityTypes": ["CHO", "CHC", "CCC"],
            "IsGovernmentHospital": true,
            "IsPrivateHospital": true,
            "SortValue": "Availability",
            "pageLimit" : 10000
            }
        axios.post('https://tncovidbeds.tnega.org/api/hospitals',request)
        .then(async (response)=>{
            //console.log('POST API result',JSON.stringify(response.data))
            await processDistrictData(response.data.result)
            setVisibility(true)
        })
        .catch(error =>{

        })          
      }
    }

  return (
    <>
    <AppBar position='static' className={classes.appBar}>        
    <Grid container spacing={3} alignItems='center' justify='center'>
    <Typography variant="h6" className={classes.title}>
            Tamil Nadu Covid19 Hospital Bed Availability
    </Typography>
    </Grid>
    </AppBar>
    <Grid container direction='column' spacing={3} alignItems='center' justify='center' className={classes.input}>
        <Grid item>
        <ComboBox handleSelect={handleSelect}/>
        </Grid>
        <Grid item>
            {visibility ? <DataTable hospitalData ={hospitalData}/> : null}
        </Grid>
    </Grid>
    </>
  );
}

export default Home1;