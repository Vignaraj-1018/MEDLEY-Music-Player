import React from 'react'
import { PlayIcon } from '../assets';
import { useNavigate } from 'react-router-dom';

const Discover = ({dataList, title}) => {

	// console.log(dataList);

	const navigate = useNavigate();

	const handleAlbumClick = (item) => {
		console.log(item);
		navigate(`/album/${item.id}`);
	}

	const handlePlay = (e, item) => {
		e.stopPropagation();
		console.log(item);
        navigate(`/album/${item.id}?play=true`);
	}

	return (
		<div className='flex flex-col gap-6'>
			<div className="flex text-2xl font-bold">
				{title}
			</div>
			<div className="flex flex-wrap gap-4">
				{dataList?.map((item, index)=>(
					<div className="flex text-xl gap-4 rounded-lg bg-zinc-500 justify-start items-center w-[20rem] hover:bg-zinc-700 cursor-pointer select-none group" key={index} onClick={() => {handleAlbumClick(item)}}>
						<img src={item.images[0].url} alt="Thumbnail" className="flex h-20 w-20 rounded-l-lg" />
						<span className="flex text-xl font-semibold truncate w-[10rem] text-white">{item.name}</span>
						<div className="hidden justify-center items-center bg-green-600 rounded-full h-10 w-10 group-hover:flex hover:scale-110 z-40" onClick={(e)=> handlePlay(e, item)}>
							<img src={PlayIcon} alt="Play"/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Discover