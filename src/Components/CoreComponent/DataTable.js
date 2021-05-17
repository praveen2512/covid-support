import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SimpleCard from './Card'
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles({
    table: {
        /* minWidth: 650, */
    },
    rowCell1: {
    padding: '6px 35px'
    },
    rowCell2: {
        padding: '6px 35px'
    }
});


export default function DataTable(props) {
    const classes = useStyles();
    const {hospitalData} = props.hospitalData
    return (        
            props.hospitalData.map((data,key) => {
                return(
                    <SimpleCard key={key} data={data} />
                )
            })  
                  
    );
}
