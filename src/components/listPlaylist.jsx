import React from 'react'
import { PlayIcon } from '../assets'
import { useNavigate } from 'react-router-dom';

const HomePlaylist = ({title, dataList}) => {

	const navigate = useNavigate();

	const handlePlaylistClick = (item) => {
		// console.log(item);
		navigate(`/playlist/${item.id}`);
	}

	const handlePlay = (e, item) => {
		e.stopPropagation();
		// console.log(item);
        navigate(`/playlist/${item.id}?play=true`);
	}

  return (
    <div className='flex flex-col gap-4'>
		<div className="flex justify-between">
			<span className="flex text-2xl font-bold">{title}</span>
		</div>

		<div className="flex flex-row flex-wrap gap-4 overflow-auto w-full">
			{dataList?.map((item, index) =>(
				<div className="flex flex-col gap-2 text-2xl font-semibold text-white w-[12rem] rounded-xl p-2 bg-zinc-500 hover:bg-zinc-700 cursor-pointer select-none group" key={index} onClick={() => {handlePlaylistClick(item)}}>
					<div className="flex relative">
						<img src={item.images[0].url} alt="" className="flex h-[12rem] w-[12rem] rounded-lg" />
						<div className="hidden justify-center items-center bg-green-600 rounded-full h-14 w-14 group-hover:flex hover:scale-110 absolute right-2 bottom-2 z-40" onClick={(e)=> handlePlay(e, item)}>
							<img src={PlayIcon} alt="Play"/>
						</div>
					</div>
					<span className="flex text-lg text-white font-semibold">{item.name}</span>
					<span className="text-base text-zinc-300 font-semibold truncate">{item.description}</span>
				</div>
			))}
		</div>

    </div>
  )
}

export default HomePlaylist