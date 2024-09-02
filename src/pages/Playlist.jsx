import React, { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useGetPlaylistQuery } from '../redux/apiStore/SpotifyAPI';
import { ClockIcon, LikeIcon, PlayIcon } from '../assets';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong, trigger } from '../redux/slices/PlayerSlice';
import { Loader } from '../components';

const Playlist = () => {

	const params = useParams();
    const [query] = useSearchParams();
	const dispatch = useDispatch();
    const navigate = useNavigate();

	console.log(params, query.get('play'));

    const {data : playlistData, isFetching: isDataLoading} = useGetPlaylistQuery(params.id);


	const formatDuration = (durationMs) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

	const handlePlayClick = (data, song, i) =>{
		console.log(song);
		dispatch(setActiveSong({song, data, i}));
		dispatch(playPause(false));
		dispatch(trigger(true));
	}

	console.log(playlistData);

    const handlePlaylistPlay = () =>{
        handlePlayClick(playlistData?.tracks.items, playlistData?.tracks.items[0].track, 0);
    }

    useEffect(()=>{
        if (query.get('play') == 'true' && !isDataLoading){
            handlePlaylistPlay();
            query.delete('play');
            navigate('', { replace: true });
        }
    }, [query, isDataLoading]);

    if (isDataLoading){
		return (
			<Loader/>
		)
	}

	return (
		<div className="flex flex-col gap-8 p-8 w-full">
            <div className="flex flex-row gap-10 w-full">
                <img src={playlistData?.images[0].url} alt="Album thumbnail" className='flex h-60 w-60'/>
                <div className="flex flex-col gap-10 w-full justify-end">
                    <span className="flex text-lg font-bold">Playlist</span>
                    <span className="text-5xl font-bold">{playlistData?.name}</span>
					<span className="flex font-semibold text-zinc-700">{playlistData?.description}</span>
                    <div className="flex flex-row gap-2 items-center">
						<span className="flex text-lg font-semibold">{playlistData?.owner.display_name}</span>
                        <span className="flex bg-white w-2 h-2 rounded-full"></span>
                        <span className="flex text-lg font-semibold">{playlistData?.followers.total} followers</span>
                        <span className="flex bg-white w-2 h-2 rounded-full"></span>
                        <span className="flex text-lg font-semibold">{playlistData?.total_tracks} songs</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-5">
                <div className="flex justify-center items-center bg-green-500 rounded-full h-12 w-12 cursor-pointer" onClick={handlePlaylistPlay}>
                    <img src={PlayIcon} alt="Play"/>
                </div>
                <img src={LikeIcon} alt="Like" className='flex h-12 w-12 cursor-pointer'/>
            </div>
            <div className="flex flex-col w-full gap-5">
                <div className="flex flex-row items-center">
                    <span className="flex w-1/12 justify-center text-zinc-700">#</span>
                    <span className="flex w-7/12 text-xl font-semibold">Title</span>
                    <span className="flex w-3/12 text-xl font-semibold">Album</span>
                    <span className="flex w-1/12 justify-center">
                        <img src={ClockIcon} alt="Time" />
                    </span>
                </div>
                <div className="flex h-px w-full bg-zinc-700"></div>
                <div className="flex flex-col gap-4">
                    {playlistData?.tracks.items.map((item, index)=>(
                        <div className="flex flex-row items-center hover:bg-zinc-200 rounded-xl cursor-pointer group" key={index} onClick={()=>handlePlayClick(playlistData?.tracks.items,item.track, index)}>
                            <span className="flex w-1/12 justify-center text-zinc-700">
                                <span className="flex group-hover:hidden">{index + 1}</span>
                                <img src={PlayIcon} alt="Play" className='group-hover:flex hidden h-4 w-4'/>
                            </span>
                            <div className="flex w-7/12 flex-col">
                                <span className="flex text-xl font-semibold">
                                    {item.track.name}
                                </span>
                                <div className="flex flex-row gap-3 items-center">
                                    {item.track.explicit && <span className="flex bg-zinc-100 rounded-lg p-1 text lg font-semibold w-6 items-center justify-center">E</span>}
                                    {item.track.artists.map((artist, index)=>(
                                        <span key={index} className="flex text-base font-semibold text-zinc-600">{artist.name}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex w-3/12 flex-col">
								<span className="flex text-xl font-semibold">
                                    {item.track.album.name}
                                </span>
							</div>
                            <span className="flex w-1/12 justify-center">{formatDuration(item.track.duration_ms)}</span>

                        </div>
                    ))}
                </div>
            </div>
        </div>
	)
}

export default Playlist