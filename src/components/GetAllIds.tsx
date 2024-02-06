import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { nanoid } from 'nanoid';

const url = 'http://127.0.0.1:8000/clean/cleanings'

const GetAllIds = () => {

	interface GetAllCleaningsResponse {
		results: string[];
	}

	const [cleanings, setCleanings] = useState<GetAllCleaningsResponse>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>(null);

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response: AxiosResponse = await axios.get(
				url,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
			const responseData: GetAllCleaningsResponse = response.data;
			setCleanings(responseData);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className='image-container'>
			<div>
				{isLoading && <p>Loading...</p>}
				{error ? (
					<p>Oops there was an error: {error.message}</p>
				) : cleanings ? (
					<div className="card">
						<h1>Previous Chat IDs</h1>
						<ul>
							{cleanings.results.map((cleaning) => {
								return (
									<li key={nanoid()}>
										{cleaning}
									</li>
								);
							})}
						</ul>
					</div>
				) : (
					<p>No cleanings found</p>
				)}
			</div>
		</section>
	);
};


export default GetAllIds;
