import React from 'react'
import { PlayIcon } from '../assets';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong, trigger } from '../redux/slices/PlayerSlice';

const listTracks = ({dataList, title}) => {

    console.log(dataList, title);
    const dispatch = useDispatch();

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

    return (
        <div className='flex flex-col gap-5'>
            <div className="flex text-2xl font-bold">
				{title}
			</div>
            <div className="flex flex-col gap-4">
				{dataList?.map((item, index)=>(
					<div className="flex text-xl gap-4 h-24 p-3 rounded-lg w-[30rem] justify-between items-center hover:bg-zinc-400 cursor-pointer select-none group" key={index} onClick={() => {handlePlayClick(dataList, item, index)}}>
                        <div className="flex gap-3 items-center">
                            <img src={item.album.images[0].url} alt="Thumbnail" className="flex h-16 w-16 rounded-lg" />
                            <div className="flex flex-col gap-1">
                                <span className="flex text-xl font-semibold truncate w-[20rem]">{item.name}</span>
                                <div className="flex flex-row">
                                    {item.explicit && <span className="flex bg-zinc-100 rounded-lg p-1 text-xs font-semibold w-6 items-center justify-center">E</span>}
                                    <div className="flex flex-wrap gap-2">
                                        {item.artists.map((artist, index)=>(
                                            <span className="flex text-xs" key={index}>{artist.name}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="flex text-xl">{formatDuration(item.duration_ms)}</span>
					</div>
				))}
			</div>
        </div>
    )
}

export default listTracks