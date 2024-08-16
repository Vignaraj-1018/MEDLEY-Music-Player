import React from 'react'
import { PlayIcon } from '../assets';

const Discover = ({dataList}) => {

	console.log(dataList);
	return (
		<div className='flex flex-col gap-6'>
			<div className="flex text-2xl font-bold">
				Good Morning!
			</div>
			<div className="flex flex-wrap gap-4">
				{dataList?.albums?.items?.slice(0, 8).map((item, index)=>(
					<div className="flex text-xl gap-4 rounded-lg bg-zinc-500 justify-start items-center w-[20rem] hover:bg-zinc-700 cursor-pointer select-none group" key={index}>
						<img src={item.images[0].url} alt="Thumbnail" className="flex h-20 w-20 rounded-l-lg" />
						<span className="flex text-xl font-semibold truncate w-[10rem] text-white">{item.name}</span>
						<div className="hidden justify-center items-center bg-green-600 rounded-full h-10 w-10 group-hover:flex hover:scale-110">
							<img src={PlayIcon} alt="Play"/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Discover