import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

type Props = {
	onSearchChange: Function;
};

const Search = ({ onSearchChange }: Props) => {
	const [search, setSearch] = useState(null);

	const handleOnChange = (searchData: any) => {
		setSearch(searchData);
		onSearchChange(searchData);
	};

	const loadOptions = async (inputValue: string) => {
		return fetch(
			`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
			geoApiOptions
		)
			.then((response) => response.json())
			.then((response) => {
				// console.log(response);

				return {
					options: response.data.map((city: any) => {
						return {
							value: `${city.latitude} ${city.longitude}`,
							label: `${city.name} ${city.countryCode}`,
						};
					}),
				};
			})
			.catch((err) => console.error(err));
	};

	return (
		<div style={{ margin: "0 24px" }}>
			<AsyncPaginate
				placeholder="Search for a city"
				debounceTimeout={600}
				value={search}
				onChange={handleOnChange}
				loadOptions={loadOptions}
			/>
		</div>
	);
};

export default Search;
