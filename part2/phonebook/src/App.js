import { useState, useEffect } from "react";
import { getAll, create, update, deleteById } from "./services/phonebook";

const Filter = ({ value, onChange }) => (
	<div>
		filter shown with: <input value={value} onChange={onChange} />
	</div>
);

const PersonForm = ({ persons, updateData, setNotification }) => {
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const addNote = (event) => {
		event.preventDefault();

		let elements = event.target.elements;
		let person = persons.find((person) => person.name === elements.name.value);
		if (
			person &&
			window.confirm(`${elements.name.value} is already added to phonebook, replace the old number with new one?`)
		) {
			update(person.id, {
				...person,
				number: elements.number.value,
			}).then(() => {
				setNotification({ type: "success", message: "Number updated" });
				setTimeout(() => setNotification(null), 5000);
				updateData();
			});
		} else {
			create({
				name: elements.name.value,
				number: elements.number.value,
			}).then(() => {
				setNotification({ type: "success", message: "Person added" });
				setTimeout(() => setNotification(null), 5000);
				updateData();
			});
		}

		setNewName("");
		setNewNumber("");
	};

	return (
		<form onSubmit={addNote}>
			<div>
				name: <input name="name" value={newName} onChange={(event) => setNewName(event.target.value)} />
			</div>
			<div>
				number:
				<input name="number" value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Persons = ({ persons, filter, updateData, setNotification }) => (
	<>
		{persons
			.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
			.map((person) => (
				<Person key={person.id} person={person} updateData={updateData} setNotification={setNotification} />
			))}
	</>
);

const Person = ({ person, updateData, setNotification }) => {
	const handleDelete = () => {
		if (window.confirm(`Delete ${person.name}?`)) {
			deleteById(person.id)
				.then(() => updateData())
				.catch((err) => {
					setNotification({ type: "error", message: `Inforrmation of ${person.name} han already been removed from server`});
					setTimeout(() => setNotification(null), 5000);
				});
		}
	};

	return (
		<p>
			{person.name} {person.number} <button onClick={handleDelete}>delete</button>
		</p>
	);
};

const Notification = ({ notification }) => {
	const boxStyle = {
		background: "lightgrey",
		fontSize: "20px",
		borderStyle: "solid",
		borderRadius: "5px",
		padding: "10px",
		marginBottom: "10px",
	};
	const errorStyle = {
		color: "red",
		...boxStyle,
	};
	const successStyle = {
		color: "green",
		...boxStyle,
	};

	return <div style={notification.type === "error" ? errorStyle : successStyle}>{notification.message}</div>;
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [filter, setFilter] = useState("");
	const [notification, setNotification] = useState(null);

	const updateData = () => {
		getAll().then((data) => {
			setPersons(data);
		});
	};

	useEffect(updateData, []);

	return (
		<div>
			<h2>Phonebook</h2>
			{notification && <Notification notification={notification} />}
			<Filter value={filter} onChange={(event) => setFilter(event.target.value)} />
			<h3>add a new</h3>
			<PersonForm persons={persons} updateData={updateData} setNotification={setNotification} />
			<h3>Numbers</h3>
			<Persons persons={persons} filter={filter} updateData={updateData} setNotification={setNotification} />
		</div>
	);
};

export default App;
