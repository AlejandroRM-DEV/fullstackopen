import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
	const total = good + neutral + bad;
	const average = (good + bad * -1) / total;
	const positive = (good * 100) / total;

	if (total === 0) return <p>No given feedback</p>;
	return (
		<table>
			<tbody>
				<StatisticLine text="good" value={good} />
				<StatisticLine text="neutral" value={neutral} />
				<StatisticLine text="bad" value={bad} />
				<StatisticLine text="all" value={total} />
				<StatisticLine text="average" value={average} />
				<StatisticLine text="positive" value={positive} />
			</tbody>
		</table>
	);
};
const StatisticLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => setGood(good + 1);
	const handleNeutralClick = () => setNeutral(neutral + 1);
	const handleBadClick = () => setBad(bad + 1);

	return (
		<div>
			<Header text="give feedback" />
			<Button text={"good"} onClick={handleGoodClick} />
			<Button text={"neutral"} onClick={handleNeutralClick} />
			<Button text={"bad"} onClick={handleBadClick} />
			<Header text="statistics" />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
