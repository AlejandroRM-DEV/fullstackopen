const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

const Header = (props) => {
	return <h1>{props.name}</h1>;
};

const Content = (props) => {
	return (
		<div>
			{props.parts.map((part) => (
				<Part name={part.name} exercises={part.exercises} />
			))}
		</div>
	);
};

const Part = (props) => {
	return (
		<p>
			{props.name} {props.exercises}
		</p>
	);
};

const Total = (props) => {
	return <p>Number of exercises {props.parts.reduce((previous, current) => previous + current.exercises, 0)}</p>;
};

export default App;
