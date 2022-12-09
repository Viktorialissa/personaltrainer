import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Button } from "@mui/material";
import format from 'date-fns/format';
import { API_getTrainings, API_trainings } from "../constants"; 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import EditTraining from "./editTraining";


export default function Traininglist() {
    
    const [trainings, setTrainings]= useState([]);

    function nameValueGetter(params) {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
      }

    const [columnDefs] = useState([
        {field: 'date', headerName: 'Date', sortable: true, filter: true, valueFormatter: params => format(new Date(params.value), "dd.MM.yyyy hh:mm")},
        {field: 'duration', headerName: 'Duration', sortable: true, filter: true},  
        {field: 'activity',headerName: 'Activity', sortable: true, filter: true},
        {field: 'customer', valueGetter: nameValueGetter, headerName: 'Name', sortable: true, filter: true, width: 300},
        {width: 150,
            cellRenderer: params => <EditTraining data={params.data} editTraining={editTraining} />},
        {   field: "id",
            headerName: '',
            width: 160, 
            cellRenderer: params =>
             <Button size="small"
             color="warning"
             onClick={() => deleteTraining(params.value)}>Delete</Button>
        }
    
    ])

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch(API_getTrainings)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                alert('Something went wrong!');
        
        })
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }
    
    const deleteTraining = (data) => {
            console.log(data);
            window.confirm('Are you sure?')
            fetch(API_trainings + data, {method: 'DELETE'})
            .then(response => {
                if (response.ok)
                    getTrainings();
                else
                    alert('Something went wrong!')
                })
                .catch(err => console.error(err))
            } 
           

            const editTraining = (training, url) => {
                
                fetch(url, {
                    method: 'PUT',
                    headers: {'Content-type':'application/json'},
                    body: JSON.stringify(training)
                })
                .then(response => {
                    if (response.ok)
                    getTrainings();
                    else
                    alert('Something went wrong');
                })
                .catch(err => console.error(err))
            };
            
            return (
                <>
                <div className="ag-theme-material" style={{height: 700, width: '90%', margin: 'auto'}}>
                    <AgGridReact
                        rowData = {trainings}
                        columnDefs = {columnDefs}
                        pagination = {true}
                        paginationPageSize = {10}
                        suppressCellFocus={true}
                    />
                </div>
                </>
            );
          
}