import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

import "react-big-calendar/lib/css/react-big-calendar.css";
import { API_getTrainings } from "../constants"; 

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})


export default function BigCalendar() {

	const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch(API_getTrainings)
        .then(response => response.json())
		.then(data => {
		const events = data.map(training => {
			const startDate = new Date(training.date);
			const endDate = new Date(startDate.getTime() + training.duration * 60000);
			return {
				id: training.id,
				title: `${training.activity} | ${training.customer.firstname} ${training.customer.lastname}`,
				start: startDate,
				end: endDate
			}
		});
		setTrainings(events);
	})
	.catch(err => console.error(err));
        
    };

	
	console.log(trainings);

	return (
		<div className="container mt-3" style={{ height: "80vh" }}>
			<Calendar
				localizer={localizer}
				events={trainings}
				startAccessor="start"
				endAccessor="end"
				step={30}
            	timeslots={1}
            	dayLayoutAlgorithm="no-overlap"
			/>
		</div>
	);
}