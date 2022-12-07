import React from "react";
import Exercises from "./Exercise";

function ExerciseList({ exercise, onDelete, onEdit }) {
	return (
		<table id="exercise">
			<caption>Edit Existing Exercises Below</caption>
			<thead>
				<tr>
					<th>Name</th>
					<th>Reps</th>
					<th>Weight</th>
					<th>Unit</th>
					<th>Date</th>
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

export default ExerciseList;
