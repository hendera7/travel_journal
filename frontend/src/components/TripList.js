import React from "react";
import Trips from "./Trips";

function TripList({ exercise }) {
	return (
		<table id="exercise">
			<caption>Click on a trip below to see details about the trip!</caption>
			<thead>
				<tr>
					<th>Country</th>
					<th>City</th>
					<th>Month</th>
					<th>Year</th>
					<th>Duration</th>
					<th>Solo or Group</th>
					<th>Transportation</th>
				</tr>
			</thead>
			<tbody>
				{exercise.map((exercise, i) => (
					<Exercises
						exercise={exercise}
						key={i}
						onDelete={onDelete}
						onEdit={onEdit}
					/>
				))}
			</tbody>
		</table>
	);
}

export default TripList;
