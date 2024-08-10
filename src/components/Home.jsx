import React from 'react'
import { useGetDiscoverListQuery } from '../redux/apiStore/SpotifyAPI'
import { useDispatch } from 'react-redux';

const Home = () => {
	const dispatch = useDispatch()
	const { data:discoverList, isFetching, error } = useGetDiscoverListQuery("IN");
	if (!isFetching){
		console.log(discoverList, isFetching, error);
	}
	return (
		<div>Home</div>
	)
}

export default Home