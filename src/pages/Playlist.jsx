import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPlaylistQuery } from '../redux/apiStore/SpotifyAPI';

const Playlist = () => {

	const params = useParams();

	console.log(params);

	const playlistData = useGetPlaylistQuery(params.id);

	console.log(playlistData);

	return (
		<div>Playlist</div>
	)
}

export default Playlist