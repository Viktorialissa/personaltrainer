import React from "react";
import { CSVLink } from 'react-csv';


export default function CsvFile(props){

    const headers = [
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Streetaddress", key: "streetaddress" },
        { label: "Postcode", key: "postcode" },
        { label: "City", key: "city" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone" }
      ];
       

  return (

    <div  className="App">
      <CSVLink
        headers={headers}
        data={props.customers}
        filename="Customerlist">
        Customer info (CSV)
      </CSVLink>
    </div>
  );
}