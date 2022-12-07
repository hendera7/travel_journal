import "dotenv/config";
import express from "express";
import * as exercise from "./exercises-model.mjs";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

const unitTypes = ["lbs", "kgs", "miles", "kilometers", "seconds", "minutes"];

function errorHelper(req) {
	const errors = [];
	if (typeof req.body.name !== "string" || req.body.name.length <= 0) {
		errors.push("Please enter a valid name.");
	}
	if (isNaN(req.body.reps) || req.body.reps <= 0) {
		errors.push("Please enter a valid number of reps.");
	}
	if (isNaN(req.body.weight) || req.body.weight <= 0) {
		errors.push("Please enter a valid weight");
	}
	if (typeof req.body.unit !== "string" || !unitTypes.includes(req.body.unit)) {
		errors.push("Please select a valid unit type.");
	}
	if (isNaN(Date.parse(req.body.date))) {
		errors.push("Please enter a valid date.");
	}
	return errors;
}

// CREATE controller ******************************************
app.post("/exercise", (req, res) => {
	const errors = errorHelper(req);
	if (errors.length > 0) {
		res.status(400).json({
			error: "File could not be created.",
			errors: errors,
		});
	} else {
		exercise
			.createExercise(
				req.body.name,
				req.body.reps,
				req.body.weight,
				req.body.unit,
				req.body.date
			)
			.then((exercise) => {
				res.status(201).json(exercise);
			})
			.catch((error) => {
				console.log(error);
				res.status(400).json({
					error: "Creation of a document failed due to invalid syntax.",
				});
			});
	}
});

// RETRIEVE controller ****************************************************
// GET exercises filtered by name, reps, etc.
app.get("/exercise", (req, res) => {
	/* let filter = {};
	filter by name, reps, etc.
	if (req.query.name !== undefined) {
		filter = { name: req.query.name };
	}
	if (req.query.reps !== undefined) {
		filter = { reps: req.query.reps };
	}
	if (req.query.weight !== undefined) {
		filter = { weight: req.query.weight };
	}
	if (req.query.unit !== undefined) {
		filter = { unit: req.query.unit };
	}
	if (req.query.date !== undefined) {
		filter = { date: req.query.date };
	} */
	exercise
		.findExercise()
		.then((exercise) => {
			res.status(201).json(exercise);
		})
		.catch((error) => {
			console.error(error);
			res.send({ Error: "Request to retrieve documents failed" });
		});
});

// GET exercises by ID
app.get("/exercise/:_id", (req, res) => {
	const exerciseId = req.params._id;
	exercise
		.findExerciseById(exerciseId)
		.then((exercise) => {
			if (exercise !== null) {
				res.status(200).json(exercise);
			} else {
				res.status(404).json({ Error: "Document not found" });
			}
		})
		.catch((error) => {
			res.status(400).json({ Error: "Request to retrieve document failed" });
		});
});

// UPDATE controller ************************************
app.put("/exercise/:_id", (req, res) => {
	const errors = errorHelper(req);
	if (errors.length > 0) {
		res.status(400).json({
			error: "File could not be updated.",
			errors: errors,
		});
	} else {
		exercise
			.replaceExercise(
				req.params._id,
				req.body.name,
				req.body.reps,
				req.body.weight,
				req.body.unit,
				req.body.date
			)

			.then((numUpdated) => {
				if (numUpdated === 1) {
					res.status(200).json({
						_id: req.params._id,
						name: req.body.name,
						reps: req.body.reps,
						weight: req.body.weight,
						unit: req.body.unit,
						date: req.body.date,
					});
				} else {
					res.status(404).json({ Error: "Document not found" });
				}
			})
			.catch((error) => {
				console.error(error);
				res.status(400).json({ Error: "Request to update a document failed" });
			});
	}
});

// DELETE Controller ******************************
app.delete("/exercise/:_id", (req, res) => {
	exercise
		.deleteById(req.params._id)
		.then((deletedCount) => {
			if (deletedCount === 1) {
				res.status(204).send();
			} else {
				res.status(404).json({ Error: "Document not found" });
			}
		})
		.catch((error) => {
			console.error(error);
			res.send({ error: "Request to delete a document failed" });
		});
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
