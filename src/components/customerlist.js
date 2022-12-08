import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Button } from "@mui/material";
import { API_trainings, API_customer } from "../constants"; 
import AddCustomer from "./addCustomer";
import EditCustomer from "./editCustomer";
import AddTraining from "./addTraining";
import CsvFile from "./csvFile";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';


export default function Customerlist() {
    
    const [customers, setCustomers]= useState([]);
    
    
    const [columnDefs] = useState([
          {field: "firstname", headerName: '', width: 170, 
           cellRenderer: params => <AddTraining addTraining={addTraining} customer={params.data}/>},
          {field: 'firstname', sortable: true, filter: true, width: 160},
          {field: 'lastname', sortable: true, filter: true, width: 160},
          {field: 'streetaddress', sortable: true, filter: true, width: 160},
          {field: 'postcode', sortable: true, filter: true, width: 160},
          {field: 'city', sortable: true, filter: true, width: 160},
          {field: 'email', sortable: true, filter: true, width: 180},
          {field: 'phone', sortable: true, filter: true, width: 160},
          {width: 150,
            cellRenderer: params => <EditCustomer data={params.data} updateCustomer={updateCustomer} />},
          {field: "customer", headerName: '', width: 120, 
            cellRenderer: params =>
            <Button size="small"
            color="warning"
            onClick={() => deleteCustomer(params.data)}>Delete</Button>
          }
        
    ]);
    

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch(API_customer)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                alert('Something went wrong!');
        
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    };
    
    const addCustomer = (customer) => {
        
        fetch(API_customer, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok)
                getCustomers();
            else
                alert('Something went wrong');
        })
        .catch(err => console.error(err))
    };

    const addTraining = (training) => {
        
        fetch(API_trainings, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok)
                getCustomers();
            else
                alert('Something went wrong');
        })
        .catch(err => console.error(err))
    };
            
    const updateCustomer = (customer, url) => {
                
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok)
                getCustomers();
            else
            alert('Something went wrong');
        })
        .catch(err => console.error(err))
    };
            
    const deleteCustomer = (data) => {
        console.log(data);
        window.confirm('Are you sure?')
        fetch(data.links[1].href, {method: 'DELETE'})
        .then(response => {
            if (response.ok)
                getCustomers();
            else
                alert('Something went wrong!')
        })
        .catch(err => console.error(err))
    }
                      

    return (
        <>
        <AddCustomer addCustomer={addCustomer}/>      
        <CsvFile customers={customers} />
        <div className="ag-theme-material" style={{height: 700, width: '95%', margin: 'auto'}}>
            <AgGridReact
                rowData = {customers}
                columnDefs = {columnDefs}
                pagination = {true}
                paginationPageSize = {10}
                suppressCellFocus={true}
            />
        </div>
        </>
    );
          
}