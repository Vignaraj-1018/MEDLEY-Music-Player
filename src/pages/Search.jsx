import React from 'react'
import { searchPageBanner } from '../assets'
import { useNavigate } from 'react-router-dom'

const Search = () => {

	const navigate = useNavigate();

	const handleBrowseLink = (item) => {
		navigate(`/genre/${item.id}`)
	}

	return (
		<div className='flex flex-col p-5 gap-5'>
			<span className="flex text-2xl font-bold">Browse All</span>
			<div className="flex flex-wrap gap-5">
			{searchPageBanner.map((item, key)=>(
				<div className="flex h-52 w-40 p-5 rounded-2xl bg-zinc-500 relative overflow-hidden cursor-pointer" key={key} onClick={() => handleBrowseLink(item)}>
				<span className="flex text-xl font-bold text-white">{item.title}</span>
				<img src={item.imgUrl} alt="Image" className="flex h-28 w-28 absolute -bottom-4 -right-3 rotate-[25deg] aspect-square" />
				</div>
			))}    
			</div>
		</div>
  )
}

export default Search