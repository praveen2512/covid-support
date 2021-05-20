import React, { useEffect, useState } from "react";
import { AppBar, Grid, CircularProgress, TextField, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
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
  const [renderList, setRenderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (district && district["_id"]) {
      setLoading(true);
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
        .then( (response) => {
          setHospitalList(response.data.result);
          setLoading(false);
          setShowList(true)
        })
        .catch((error) => {
          console.log(`error while loading data :: ${error}`)
        });
    }
  }, [district]);

  useEffect(() => {
    setFilteredList(hospitalList);    
    setCurrentPage(1)
  }, [hospitalList]);

  useEffect(() => {
    const temp = [];
    for (let i = 1; i <= Math.ceil(filteredList.length / itemsPerPage); i++) {
      temp.push(i);
    }
    setPageNumbers(temp);
  }, [filteredList]);

  useEffect(() => {
    const searchResult = searchList(hospitalList, searchTerm);
    setFilteredList(searchResult);
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const temp = filteredList.slice(firstIndex, lastIndex);
    setRenderList(temp);
  }, [filteredList, currentPage]);

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
        className={number === currentPage ? 'active-page' : ''}
      >
        {number}
      </li>
    );
  });

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    return(
      <Pagination
          count={pageNumbers.length}
          page={currentPage}
          onChange={handleChangePage}
          defaultPage={1}
          color="primary"
          size="small"
          showFirstButton
          showLastButton
          classes={{ ul: classes.paginator }}
        />
    )
  }

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Grid container spacing={3} alignItems="center" justify="center">
          <Typography variant="h6" className={classes.title}>
            Covid Support-Know Hospital Availability
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
      </Grid>
      <Grid
        container
        direction="column"
        spacing={3}
        alignItems="center"
        justify="center"
        className={classes.input}
      >
        {
          !showList ? <h2>Please Select a district</h2> : <>
            {loading ? <CircularProgress /> : (
              <>
                <Grid item sm={12}>
                  <TextField
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={`Search Hospital`}
                      className="px-3"
                      autoFocus
                    />
                </Grid>
              {renderList.length > 0 ? (
                <>                
                  <Grid item sm={12}>                  
                    {renderPagination()}
                    {/* <ul className="page-numbers">{renderPageNumbers}</ul> */}
                  </Grid>
                  <Grid item sm={12}>
                      <DataTable hospitalList={renderList} />
                  </Grid>
                  <Grid item sm={12}>
                    {renderPagination()}
                    {/* <ul className="page-numbers">{renderPageNumbers}</ul> */}
                  </Grid>
                </>
                ) : <h2>No Hospitals found</h2>}
              </>
            )}

          </>
        }
        
      </Grid>
    </>
  );
}
