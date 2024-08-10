import React from 'react'
import { useDispatch } from 'react-redux';
import useFetchHomeData from '../redux/usefetchHomeDate';

const Home = () => {
	const dispatch = useDispatch()
	const {data, isFetching, error} = useFetchHomeData();

	if (!isFetching){
		console.log(data);
	}

	return (
		<div>Home</div>
	)
}

export default Home