import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Statistic = ({ text, votes }) => (
	<>
		<p>{text}</p>
		<p>has {votes} votes</p>
	</>
);

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
	];

	const [selected, setSelected] = useState(0);
	const [mostVoted, setMostVoted] = useState(0);
	const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

	const handleNext = () => setSelected(Math.floor(Math.random() * (anecdotes.length - 0)) + 0);

	const handleVote = () => {
		let votes = [...points];
		votes[selected] += 1;
		setPoints(votes);
		if (votes[selected] > votes[mostVoted]) {
			setMostVoted(selected);
		}
	};

	return (
		<div>
			<Header text="Anecdote of the day" />
			<Statistic text={anecdotes[selected]} votes={points[selected]} />
			<Button onClick={handleVote} text="vote" />
			<Button onClick={handleNext} text="next anecdote" />

			<Header text="Anecdote with most votes" />
			<Statistic text={anecdotes[mostVoted]} votes={points[mostVoted]} />
		</div>
	);
};

export default App;
