import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export const EditExercisePage = ({ exercise }) => {
	console.log(exercise);
	const [name, setName] = useState(exercise.name);
	const [reps, setReps] = useState(exercise.reps);
	const [weight, setWeight] = useState(exercise.weight);
	const [unit, setUnit] = useState(exercise.unit);
	const [date, setDate] = useState(exercise.date);

	const history = useHistory();

	const editExercise = async () => {
		const response = await fetch(`/exercise/${exercise._id}`, {
			method: "PUT",
			body: JSON.stringify({
				name: name,
				reps: reps,
				weight: weight,
				unit: unit,
				date: date,
			}),
			headers: { "Content-Type": "application/json" },
		});

		if (response.status === 200) {
			alert("Successfully edited document!");
		} else {
			const errMessage = await response.json();
			alert(
				`Failed to update document. Status ${response.status}. ${errMessage.error} ${errMessage.errors}.`
			);
		}
		history.push("/");
	};

	return (
		<>
			<article>
				<h2>Edit an exercise entry in the collection</h2>
				<p>
					You can edit any part of the exercise entry to update or correct it.
				</p>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<fieldset>
						<legend>What do you want to change?</legend>
						<p>
							<label htmlFor="name">Exercise name</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								id="name"
								required
							/>
						</p>

						<p>
							<label htmlFor="reps">Number of reps</label>
							<input
								type="number"
								value={reps}
								onChange={(e) => setReps(e.target.value)}
								id="reps"
								required
							/>
						</p>

						<p>
							<label htmlFor="weight">Total weight</label>
							<input
								type="number"
								value={weight}
								onChange={(e) => setWeight(e.target.value)}
								id="weight"
								required
							/>
						</p>

						<p>
							<label htmlFor="unit">Unit of measurement</label>
							<select
								value={unit}
								onChange={(e) => setUnit(e.target.value)}
								id="unit"
								required
							>
								<option value="lbs">Pounds</option>
								<option value="kgs">Kilograms</option>
								<option value="miles">Miles</option>
								<option value="kilometers">Kilometers</option>
								<option value="seconds">Seconds</option>
								<option value="minutes">Minutes</option>
							</select>
						</p>

						<p>
							<label htmlFor="date">Date exercise was performed</label>
							<input
								type="date"
								value={date.slice(0, 10)}
								onChange={(e) => setDate(e.target.value)}
								id="date"
								required
							/>
						</p>

						<p>
							<label htmlFor="submit">
								<button onClick={editExercise} id="submit">
									Save updates to the collection
								</button>{" "}
							</label>
						</p>
					</fieldset>
				</form>
			</article>
		</>
	);
};
export default EditExercisePage;
