import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country, weather }) => {
	return (
		<>
			<h1>{country.name}</h1>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<h3>languages:</h3>
			<ul>
				{country.languages.map((language) => (
					<li key={language.name}>{language.name}</li>
				))}
			</ul>
			<img alt="flag" src={country.flags.png} />

			<h2>Weather in {weather.name}</h2>
			<p>temperature {weather.main.temp} Celcius</p>
			<img alt="flag" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
			<p>wind {weather.wind.speed} m/s</p>
		</>
	);
};

function App() {
	const [countries, setCountries] = useState([]);
	const [weather, setWeather] = useState({});
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (search) {
			axios.get(`https://restcountries.com/v2/name/${search}`).then((response) => setCountries(response.data));
		}
	}, [search]);

	useEffect(() => {
		if (countries.length === 1) {
			axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
				)
				.then((response) => setWeather(response.data));
		}
	}, [countries]);

	return (
		<div>
			<div>
				find countries <input value={search} onChange={(event) => setSearch(event.target.value)} />
			</div>

			{countries.length > 10 ? (
				<p>Too many matches, specify another filter</p>
			) : countries.length > 1 ? (
				countries.map((country) => (
					<p key={country.name}>
						{country.name} <button onClick={() => setSearch(country.name)}>show</button>
					</p>
				))
			) : countries.length === 1 ? (
				<Country country={countries[0]} weather={weather} />
			) : (
				<p>No countries</p>
			)}
		</div>
	);
}

export default App;
