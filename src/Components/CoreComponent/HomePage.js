import React, { useEffect, useState } from "react";
import { AppBar, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import ComboBox from "./AutoComplete";
import DataTable from "./DataTable";
import { searchList } from "../utils";

const useStyles = makeStyles((theme) => ({
  appBar: {
    padding: "30px",
  },
  input: {
    margin: "20px 0",
  },
}));

export default function HomePage() {
  const classes = useStyles();

  const [district, setDistrict] = useState({});
  const [hospitalList, setHospitalList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showHospitals, setShowHospitals] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (district && district["_id"]) {
      let request = {
        Districts: [district._id],
        FacilityTypes: ["CHO", "CHC", "CCC"],
        IsGovernmentHospital: true,
        IsPrivateHospital: true,
        SortValue: "Availability",
        pageLimit: 10000,
      };
      axios
        .post("https://tncovidbeds.tnega.org/api/hospitals", request)
        .then(async (response) => {
          setHospitalList(response.data.result);

          showHospitals(true);
        })
        .catch((error) => {});
    }
  }, [district]);

  useEffect(() => {
    console.log(`inside hospitalList effect`);
    setFilteredList(hospitalList);
    const temp = [];
    for (let i = 1; i <= Math.ceil(hospitalList.length / itemsPerPage); i++) {
        temp.push(i);
    }
    setPageNumbers(temp);
  }, [hospitalList]);

  useEffect(() => {
    console.log(`inside filteredList effect`);
  }, [filteredList]);

  useEffect(() => {
    const searchResult = searchList(hospitalList, searchTerm);
    setFilteredList(searchResult);
  }, [searchTerm]);

  useEffect(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    console.log(`${firstIndex} : ${lastIndex}`);
    const temp = hospitalList.slice(firstIndex, lastIndex);    
    console.log(`temp : ${temp}`)
    setFilteredList(temp);
  }, [currentPage]);

  const handleDistrictChange = (event, value) => {
    setDistrict(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={() => {
          handlePageChange(number);
        }}
      >
        {number}
      </li>
    );
  });

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Grid container spacing={3} alignItems="center" justify="center">
          <Typography variant="h6" className={classes.title}>
            Tamil Nadu Covid19 Hospital Bed Availability
          </Typography>
        </Grid>
      </AppBar>
      <Grid
        container
        direction="column"
        spacing={3}
        alignItems="center"
        justify="center"
        className={classes.input}
      >
        <Grid item>
          <ComboBox handleDistrictChange={handleDistrictChange} />
        </Grid>
        <Grid>
          <ul className="page-numbers">{renderPageNumbers}</ul>
        </Grid>
        <Grid item>
          {hospitalList.length > 0 && (
            <>
              <TextField
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search`}
                fullWidth
                autoFocus
              />
              <DataTable hospitalList={filteredList} />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
