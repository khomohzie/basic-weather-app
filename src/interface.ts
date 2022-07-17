export interface SearchData {
	value: string;
	label: string;
}

export interface Weather {
	data: {
		city: string;
		weather: {
			description: string;
			icon: string;
		}[];
		main: {
			temp: number;
			humidity: number;
			feels_like: number;
			pressure: number;
		};
		wind: {
			speed: number;
			deg: number;
		};
	};
}

export interface TForecast {
	data: {
		list: {
			city?: string;
			weather: {
				description: string;
				icon: string;
			}[];
			main: {
				temp_max: number;
				temp_min: number;
				humidity: number;
				feels_like: number;
				pressure: number;
				sea_level: number;
			};
			wind: {
				speed: number;
				deg: number;
			};
			clouds: {
				all: number;
			};
		}[];
	};
}
