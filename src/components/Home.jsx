import React from 'react'
import { useDispatch } from 'react-redux';
import useFetchHomeData from '../redux/usefetchHomeDate';
import Discover from './Discover';
import Trending from './Trending';
import FeaturedPlaylist from './FeaturedPlaylist';
import NewReleases from './NewReleases';
import SuggestedArtists from './SuggestedArtists';

const Home = () => {
	const dispatch = useDispatch()
	const {data, isFetching, error} = useFetchHomeData();

	if (!isFetching){
		console.log(data);
	}

	return (
		<div className='flex flex-col gap-8 w-full rounded-xl bg-zinc-200 bg-gradient-to-b from-zinc-400 p-6 items-start'>
			<div className="flex w-full justify-between items-center">
				<div className="flex gap-2">
					<div className="flex bg-zinc-100 rounded-full p-2 cursor-pointer">
						<svg stroke="currentColor" fill="currentColor" strokeWidth="3" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>
					</div>
					<div className="flex bg-zinc-100 rounded-full p-2 cursor-pointer">
						<svg stroke="currentColor" fill="currentColor" strokeWidth="3" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>
					</div>
				</div>
				<div className="flex bg-white py-2 px-4 text-lg font-semibold cursor-pointer hover:scale-105 rounded-2xl">Login</div>
			</div>
			<Discover/>
			<Trending/>
			<FeaturedPlaylist/>
			<NewReleases/>
			<SuggestedArtists/>
		</div>
	)
}

export default Home