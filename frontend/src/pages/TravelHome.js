import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const HomePage = ({ setExercise }) => {
	// Use the history for updating
	const history = useHistory();

	// Use state to bring in the data
	const [exercises, setExercises] = useState([]);

	// RETRIEVE the list of exercises
	const loadExercise = async () => {
		const response = await fetch("/exercise");
		const exercises = await response.json();
		setExercises(exercises);
	};

	// UPDATE a exercises
	const onEditExercise = async (exercise) => {
		setExercise(exercise);
		history.push("/edit-exercise");
	};

	// DELETE an exercise
	const onDeleteExercise = async (_id) => {
		const response = await fetch(`/exercise/${_id}`, { method: "DELETE" });
		if (response.status === 204) {
			const getResponse = await fetch("/exercise");
			const exercise = await getResponse.json();
			setExercise(exercise);
		} else {
			console.error(
				`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`
			);
		}
	};

	// LOAD the exercises
	useEffect(() => {
		loadExercise();
	}, []);

	// DISPLAY the exercises
	return (
		<>
			<article>
				<h2>Travel Journal</h2>
				<p>Click on a trip below for details and stories!</p>
				<ExerciseList
					exercise={exercises}
					onEdit={onEditExercise}
					onDelete={onDeleteExercise}
				/>
			</article>
		</>
	);
};

export default HomePage;
