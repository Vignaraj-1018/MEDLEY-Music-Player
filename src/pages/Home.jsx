import React from 'react'
import { useDispatch } from 'react-redux';
import useFetchHomeData from '../redux/usefetchHomeDate';
import Discover from '../components/Discover';
import HomePlaylist from '../components/HomePlaylist';
import { Loader } from '../components';

const Home = () => {
	const dispatch = useDispatch()
	const {data, isFetching, error} = useFetchHomeData();

	if (isFetching){
		return (
			<Loader/>
		)
	}
	else if (!isFetching){
		console.log(data);
	}

	return (
		<div className='flex'>
			
			<div className="flex flex-col p-6 gap-8">
				<Discover dataList={data.discoverList}/>
				<HomePlaylist title={data.trendingList?.message} dataList={data.trendingList?.playlists.items}/>
			</div>
		</div>
	)
}

export default Home