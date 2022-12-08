import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts";
import Lodash from 'lodash';
import { API_getTrainings } from "../constants"; 

export default function BarChartPage() {
    
    const [trainingData, setTrainingData] = useState([]);

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
        .then(training => {
            const activityGroup = Lodash.groupBy(training, 'activity');

            const trainingActivity = [];

            for (const activity in activityGroup) {
                const activitySum = Lodash.sumBy(activityGroup[activity], training => training.duration);
                trainingActivity.push({
                    activity: activity,
                    duration: activitySum
                });
            }
            setTrainingData(trainingActivity);
            })
            .catch(err => console.error(err));
    }

    return (
        
        <BarChart data={trainingData} height={450} width={850} margin={{
            top: 10, right: 10, bottom: 10, left: 10,
          }}>
            <CartesianGrid strokeDasharray="1" stroke="#DFE2E6"/>
            <XAxis dataKey="activity" />
            <YAxis label={{ value: "Duration in minutes", angle: -90, position: 'left'}}/>
            <Area dataKey="activity" fill="#f70707" stroke="#505050" />
            <Tooltip cursor={{ fill: "transparent" }}/>
            <Bar dataKey="duration" fill="#f70707" barSize={100}/>
        </BarChart>
    );
}
