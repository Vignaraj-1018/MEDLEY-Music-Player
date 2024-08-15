import React from 'react'
import { HomeIcon, LibraryIcon, PlusIcon, RightArrow, SearchIcon, UserIcon } from '../assets'

const Navbar = () => {
  return (
	<div className='flex flex-col w-full gap-4 h-full justify-between'>
		<div className="flex flex-col rounded-xl h-[10rem] bg-zinc-200 p-6">
			<div className="flex h-1/2 w-full gap-6 items-center cursor-pointer hover:bg-zinc-300 p-2 rounded-lg">
				<img src={HomeIcon} alt="Home" className='flex h-6 w-6'/>
				<span className="flex text-lg font-semibold">Home</span>
			</div>
			<div className="flex h-1/2 w-full gap-6 items-center cursor-pointer hover:bg-zinc-300 p-2 rounded-lg">
				<img src={SearchIcon} alt="Home" className='flex h-6 w-6'/>
				<span className="flex text-lg font-semibold">Search</span>
			</div>
		</div>
		<div className="flex flex-col h-full rounded-xl bg-zinc-200 p-6 gap-8">
			<div className="flex flex-row w-full justify-between items-center">
				<div className="flex gap-4">
					<svg role="img" fill="currentColor" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path></svg>
					<span className="flex text-lg font-semibold">Your Libray</span>
				</div>
				<div className="flex gap-2">
					<img src={PlusIcon} alt="Plus" className='flex h-6 w-6'/>
					<img src={RightArrow} alt="RightArrow" className='flex h-6 w-6'/>
				</div>
			</div>
			<div className="flex flex-row gap-4">
				<div className="flex p-1 bg-zinc-300 text-lg rounded-xl font-semibold">Playlists</div>
				<div className="flex p-1 bg-zinc-300 text-lg rounded-xl font-semibold">Artists</div>
				<div className="flex p-1 bg-zinc-300 text-lg rounded-xl font-semibold">Albums</div>
			</div>
			<div className="flex justify-center items-center h-40">
				<span className="flex text-base font-semibold">Log in to view your playlists.</span>
			</div>
		</div>
	</div>
  )
}

export default Navbar