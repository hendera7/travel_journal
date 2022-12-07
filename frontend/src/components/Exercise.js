import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const unitTypes = {
	lbs: "Pounds",
	kgs: "Kilograms",
	miles: "Miles",
	kilometers: "Kilometers",
	seconds: "Seconds",
	minutes: "Minutes",
};

function Exercise({ exercise, onEdit, onDelete }) {
	const date = exercise.date.slice(0, 10);
	const name = exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1);
	const unit = unitTypes[exercise.unit];
	return (
		<tr>
			<td>{name}</td>
			<td>{exercise.reps}</td>
			<td>{exercise.weight}</td>
			<td>{unit}</td>
			<td>{date}</td>
			<td>
				<MdEdit onClick={() => onEdit(exercise)} />
			</td>
			<td>
				<MdDeleteForever onClick={() => onDelete(exercise._id)} />
			</td>
		</tr>
	);
}

export default Exercise;
