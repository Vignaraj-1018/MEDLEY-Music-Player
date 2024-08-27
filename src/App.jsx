import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Album, Home, Playlist, Search } from './pages'
import Navbar from './components/Navbar'
import axios from 'axios'

function App() {

	const [country, setCountry] = useState('');
	const getCountryCode = () => {
		let countryCode = sessionStorage.getItem('country')
		if (!countryCode){
			axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_L3PnaceqX67pZAErfo5M5vaFylgP7')
				.then((res)=> {
					sessionStorage.setItem('country', res?.data?.location?.country);
					setCountry(res?.data?.location?.country);
				})
				.catch((err)=>console.log(err))
				.finally();
		}
		else{
			setCountry(countryCode);
		}
	}

	useEffect(()=>{
		getCountryCode()
	},[]);

	const navigate = useNavigate();

	const handleForwardClick = () =>{
		navigate(1);
	}

	const handleBackwardClick = () =>{
		navigate(-1);
	}
	
  return (
    <div className='flex flex-col h-[100dvh] w-full overflow-auto bg-primary justify-between'>
		<div className="flex flex-row h-full gap-4 p-4">
			<div className="flex w-1/5">
				<Navbar/>
			</div>
			<div className="flex w-4/5">
				<div className="flex flex-col w-full rounded-xl bg-zinc-200 bg-gradient-to-b from-zinc-400 items-start overflow-auto">
					<div className="flex w-full justify-between items-center sticky top-0 bg-gradient-to-b bg-zinc-400 p-6 z-50">
						<div className="flex gap-2">
							<div className="flex bg-zinc-100 rounded-full p-2 cursor-pointer" onClick={handleBackwardClick}>
								<svg stroke="currentColor" fill="currentColor" strokeWidth="3" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>
							</div>
							<div className="flex bg-zinc-100 rounded-full p-2 cursor-pointer" onClick={handleForwardClick}>
								<svg stroke="currentColor" fill="currentColor" strokeWidth="3" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>
							</div>
						</div>
						<div className="flex bg-white py-2 px-4 text-lg font-semibold cursor-pointer hover:scale-105 rounded-2xl select-none">Login</div>
					</div>
					<Routes>
						<Route path={'/'} element={<Home/>}/>
						<Route path={'/playlist/:id'} element={<Playlist/>}/>
						<Route path={'/album/:id'} element={<Album/>}/>
						<Route path={'/search'} element={<Search/>}/>
					</Routes>
				</div>
			</div>
		</div>
    </div>
  )
}

export default App
