import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {
	const [name, setName] = useState("");
	const [reps, setReps] = useState(0);
	const [weight, setWeight] = useState(0);
	const [unit, setUnit] = useState("");
	const [date, setDate] = useState("");

	const history = useHistory();

	const addExercise = async () => {
		const newExercise = {
			name: name,
			reps: reps,
			weight: weight,
			unit: unit,
			date: date,
		};
		const response = await fetch("/exercise", {
			method: "post",
			body: JSON.stringify(newExercise),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status === 201) {
			alert("Successfully added the exercise!");
		} else {
			alert(`Failed to add exercise, status code = ${response.status}`);
		}
		history.push("/");
	};

	return (
		<>
			<article>
				<h2>Add an exercise entry to the collection</h2>
				<p>
					Add a new exercise entry and corresponding details using the form
					below.
				</p>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<fieldset>
						<legend>Which exercise are you adding?</legend>
						<p>
							<label for="name">Exercise name</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								id="name"
								required
							/>
						</p>

						<p>
							<label for="reps">Number of reps</label>
							<input
								type="number"
								value={reps}
								onChange={(e) => setReps(e.target.value)}
								id="reps"
								required
							/>
						</p>

						<p>
							<label for="weight">Total weight</label>
							<input
								type="number"
								value={weight}
								onChange={(e) => setWeight(e.target.value)}
								id="weight"
								required
							/>
						</p>

						<p>
							<label for="unit">Unit of measurement</label>
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
							<label for="date">Date exercise was performed</label>
							<input
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								id="date"
								required
							/>
						</p>

						<p>
							<label for="submit">
								<button type="submit" onClick={addExercise} id="submit">
									Add to the collection
								</button>{" "}
							</label>
						</p>
					</fieldset>
				</form>
			</article>
		</>
	);
};

export default AddExercisePage;
