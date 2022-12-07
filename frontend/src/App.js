// Import dependencies
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";

// Import Components, styles, media
import Navigation from "./components/Nav";
import "./App.css";

// Import Pages
import HomePage from "./pages/HomePage";
import AddExercisePage from "./pages/AddExercisePage";
import EditExercisePage from "./pages/EditExercisePage";

// Define the function that renders the content in routes using State.
function App() {
	const [exercise, setExercise] = useState([]);

	return (
		<>
			<Router>
				<header>
					<h1>Otiosum Exercise</h1>
					<p>Exercise tracking for the lazy.</p>
					<p>
						All of us want to be healthy, but sometimes we lack the motivation.
						Sometimes we're lazy. Maybe that means we lack the motivation to go
						to the gym, or maybe we don't have much time for exercie, or maybe
						we dislike exercise, but nonetheless we still want to stay or get
						healthy. This tracker allows us to battle our lazy tendencies and
						stay healthy.
					</p>
				</header>

				<Navigation />

				<main>
					<Route path="/" exact>
						<HomePage setExercise={setExercise} />
					</Route>

					<Route path="/add-exercise">
						<AddExercisePage />
					</Route>

					<Route path="/edit-exercise">
						<EditExercisePage exercise={exercise} />
					</Route>
					<p></p>
				</main>

				<footer>
					<p>&copy; 2022 Amy Henderson</p>
				</footer>
			</Router>
		</>
	);
}

export default App;
