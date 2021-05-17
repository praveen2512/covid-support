/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
const axios = require('axios');


export default function ComboBox(props) {

    const [option,setOption] = useState({});

    useEffect( () => {
        axios.get('https://tncovidbeds.tnega.org/api/district')
        .then(resposne => {
           // console.log('Api Resposne',resposne.data)
            setOption(resposne.data.result)
        })
        .catch(error => {
           // console.log('Api Error',error)
        })
    },[]);

    


  return (
    <Autocomplete
      id="combo-box"
      options={option}
      getOptionLabel={(option) => option.Name}
      style={{ width: 300 }}
      onChange={(event,value)=>props.handleSelect(event,value)}
      renderInput={(params) => <TextField {...params} label="Select District" variant="outlined" />}
    />
  );
}