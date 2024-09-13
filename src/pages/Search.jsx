import React, { useEffect, useState } from 'react'
import { searchPageBanner } from '../assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useSearchQuery } from '../redux/apiStore/SpotifyAPI';
import { ListAlbum, ListPlaylist, ListTracks, Loader } from '../components';

const Search = () => {

	const navigate = useNavigate();
	const [searchResults, setSearchResults] = useState();
	// const [trackResults, setTrackResults] = useState();
	// const [playlistResults, setPlaylistResults] = useState();
	// const [albumResults, setAlbumResults] = useState();

	const handleBrowseLink = (item) => {
		navigate(`/genre/${item.id}`)
	}

	const searchPrompt = useSelector((state)=> state.promptString);

	const { data: trackResults, isFetching: isTracksFetching, isError: isErrorTracksFetching } = useSearchQuery( {query:searchPrompt.prompt_string, type: 'track'}, {
		skip: !searchPrompt.isActive
	});

	const { data: playlistResults, isFetching: isPlaylistFetching, isError: isErrorPlaylistFetching } = useSearchQuery( {query:searchPrompt.prompt_string, type: 'playlist'}, {
		skip: !searchPrompt.isActive
	});

	const { data: albumResults, isFetching: isAlbumFetching, isError: isErrorAlbumFetching } = useSearchQuery( {query:searchPrompt.prompt_string, type: 'album'}, {
		skip: !searchPrompt.isActive
	});
	
	useEffect(() => {
		if (trackResults && playlistResults && albumResults){
			console.log("All Results:", trackResults, playlistResults, albumResults);
		}
	}, [trackResults, playlistResults, albumResults]);

	if (isTracksFetching && isPlaylistFetching && isAlbumFetching){
		return (
			<Loader/>
		)
	}
	
	return (
		<div className='flex flex-col p-5 gap-5'>
		  {!searchPrompt.isActive ? (
			<>
			  <span className='flex text-2xl font-bold'>Browse All</span>
			  <div className='flex flex-wrap gap-5'>
				{searchPageBanner.map((item, key) => (
				  <div
					className='flex h-52 w-40 p-5 rounded-2xl bg-zinc-500 relative overflow-hidden cursor-pointer'
					key={key}
					onClick={() => handleBrowseLink(item)}
				  >
					<span className='flex text-xl font-bold text-white'>{item.title}</span>
					<img
					  src={item.imgUrl}
					  alt='Image'
					  className='flex h-28 w-28 absolute -bottom-4 -right-3 rotate-[25deg] aspect-square'
					/>
				  </div>
				))}
			  </div>
			</>
		  ) : (
			<div className='flex flex-col p-5 gap-5'>
				<span className='flex text-2xl font-bold'>
					Search Results for: {searchPrompt?.prompt_string}
				</span>
				<ListTracks dataList={trackResults?.tracks.items.slice(0,5)} title={'Tracks'}/>
				<ListAlbum dataList={albumResults?.albums.items.slice(0,10)} title={'Albums'}/>
				<ListPlaylist dataList={playlistResults?.playlists.items.slice(0,10)} title={'Playlists'}/>
			</div>
		  )}
		</div>
	);
}

export default Search