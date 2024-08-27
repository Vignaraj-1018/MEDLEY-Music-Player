import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetAlbumQuery } from '../redux/apiStore/SpotifyAPI';
import { ClockIcon, LikeIcon, PlayIcon } from '../assets';

const Album = () => {

    const params = useParams();

    const {data : albumData, isFetching: isDataLoading} = useGetAlbumQuery(params.id);

    console.log(albumData);

    const formatDuration = (durationMs) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <div className="flex flex-col gap-8 p-8 w-full">
            <div className="flex flex-row gap-10 w-full">
                <img src={albumData?.images[0].url} alt="Album thumbnail" className='flex h-60 w-60'/>
                <div className="flex flex-col gap-10 w-full justify-end">
                    <span className="flex text-lg font-bold">Album</span>
                    <span className="text-5xl font-bold">{albumData?.name}</span>
                    <div className="flex flex-row gap-2 items-center">
                        {albumData?.artists.map((item, index)=>(
                            <span key={index} className="flex text-lg font-bold">{item.name}</span>
                        ))}
                        <span className="flex bg-white w-2 h-2 rounded-full"></span>
                        <span className="flex text-lg font-semibold">{albumData?.release_date.slice(0,4)}</span>
                        <span className="flex bg-white w-2 h-2 rounded-full"></span>
                        <span className="flex text-lg font-semibold">{albumData?.total_tracks} songs</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-5">
                <div className="flex justify-center items-center bg-green-500 rounded-full h-12 w-12 cursor-pointer">
                    <img src={PlayIcon} alt="Play"/>
                </div>
                <img src={LikeIcon} alt="Like" className='flex h-12 w-12 cursor-pointer'/>
            </div>
            <div className="flex flex-col w-full gap-5">
                <div className="flex flex-row items-center">
                    <span className="flex w-1/12 justify-center text-zinc-700">#</span>
                    <span className="flex w-10/12 text-xl font-semibold">Title</span>
                    <span className="flex w-1/12 justify-center">
                        <img src={ClockIcon} alt="Time" />
                    </span>
                </div>
                <div className="flex h-px w-full bg-zinc-700"></div>
                <div className="flex flex-col gap-4">
                    {albumData?.tracks.items.map((item, index)=>(
                        <div className="flex flex-row items-center hover:bg-zinc-200 rounded-xl cursor-pointer group" key={index}>
                            <span className="flex w-1/12 justify-center text-zinc-700">
                                <span className="flex group-hover:hidden">{index + 1}</span>
                                <img src={PlayIcon} alt="Play" className='group-hover:flex hidden h-4 w-4'/>
                            </span>
                            <div className="flex w-10/12 flex-col">
                                <span className="flex text-xl font-semibold">
                                    {item.name}
                                </span>
                                <div className="flex flex-row gap-3 items-center">
                                    {item.explicit && <span className="flex bg-zinc-100 rounded-lg p-1 text lg font-semibold w-6 items-center justify-center">E</span>}
                                    {item.artists.map((artist, index)=>(
                                        <span key={index} className="flex text-base font-semibold text-zinc-600">{artist.name}</span>
                                    ))}
                                </div>
                            </div>
                            <span className="flex w-1/12 justify-center">{formatDuration(item.duration_ms)}</span>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Album