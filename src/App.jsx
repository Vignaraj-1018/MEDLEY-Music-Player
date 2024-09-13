import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Album, Home, Playlist, Search } from './pages'
import Navbar from './components/Navbar'
import axios from 'axios'
import { SongBar } from './components'
import { useDispatch, useSelector } from 'react-redux'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Genre from './pages/Genre'
import { myHelperBackendAPI } from './assets'
import { clearPromptString, setPromptString } from './redux/slices/SearchPrompt'

function App() {

	const [country, setCountry] = useState('');
	const [searchInput, setSearchInput] = useState('');
    const {isActive} = useSelector((state)=>state.player);
	const searchPrompt = useSelector((state)=> state.promptString);

	const dispatch = useDispatch();

	const location = useLocation();

	const isSearchRoute = location.pathname === '/search';

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

	const sendWebsiteViewAnalytics = () => {
		if (window.sessionStorage.getItem("viewAnalyticsSent")){
			// console.log("old Session");
		  }
		  else{
			window.sessionStorage.setItem("viewAnalyticsSent",true);
			// console.log("new Session");
			let data = {
			  name: "Medley Music Player Website",
			  url:"https://medley-web.netlify.app/"
			}
			let url = myHelperBackendAPI + "/my_website_analytics/website_view";
			axios.post(url,data)
			.then((resp)=>{
			  // console.log(resp);
			})
			.catch((err)=>{
			  console.log(err);
			});
		  }
	}

	useEffect(()=>{
		getCountryCode();
		// sendWebsiteViewAnalytics();
	},[]);

	const navigate = useNavigate();

	const handleForwardClick = () =>{
		navigate(1);
		dispatch(clearPromptString());
	}

	const handleBackwardClick = () =>{
		navigate(-1);
		dispatch(clearPromptString());
	}

	// Update the local input state when user types
	const handleSearchInputChange = (s) => {
		setSearchInput(s);
	};
	
	// Use effect to handle delayed search prompt dispatch
	useEffect(() => {
		const timer = setTimeout(() => {
		  if (searchInput) {
			dispatch(setPromptString(searchInput)); // Dispatch the search string after 1 second
		  }
		  else{
			dispatch(clearPromptString());
		  }
		}, 1000);
	
		return () => clearTimeout(timer); // Cleanup if input changes before 1 second
	}, [searchInput, dispatch]);

	// console.log(searchPrompt);

  	return (
    <div className='flex flex-col h-[100dvh] w-full overflow-auto bg-primary justify-between'>
		<div className={`flex flex-row ${isActive? 'h-[90dvh]' : 'h-full'} gap-4 p-4`}>
			<div className="flex w-1/5">
				<Navbar/>
			</div>
			<div className="flex w-4/5">
				<div className="flex flex-col w-full rounded-xl bg-zinc-200 bg-gradient-to-b from-zinc-400 items-start overflow-auto">
					<div className="flex w-full justify-between items-center sticky top-0 bg-gradient-to-b bg-zinc-400 p-6 z-50">
						<div className="flex gap-10 flex-row items-center">
							<div className="flex gap-2">
								<div className="flex bg-zinc-100 rounded-full p-2 cursor-pointer h-9" onClick={handleBackwardClick}>
									<svg stroke="currentColor" fill="currentColor" strokeWidth="3" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>
								</div>
								<div className="flex bg-zinc-100 rounded-full p-2 cursor-pointer h-9" onClick={handleForwardClick}>
									<svg stroke="currentColor" fill="currentColor" strokeWidth="3" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>
								</div>
							</div>
							{isSearchRoute && <div className="flex items-center">
								<input type="text" name="search" id="search" className='flex border-none bg-zinc-900 rounded-3xl py-2 px-5 text-zinc-400 w-80' placeholder='What do you want to listen to?' onChange={(e) => handleSearchInputChange(e.target.value)} autoComplete='off'/>
							</div>}
						</div>
						<div className="flex bg-white py-2 px-4 text-lg font-semibold cursor-pointer hover:scale-105 rounded-2xl select-none">Login</div>
					</div>
					<Routes>
						<Route path={'/'} element={<Home/>}/>
						<Route path={'/playlist/:id'} element={<Playlist/>}/>
						<Route path={'/album/:id'} element={<Album/>}/>
						<Route path={'/search'} element={<Search/>}/>
						<Route path={'/genre/:id'} element={<Genre/>}/>
					</Routes>
				</div>
			</div>
		</div>
		<SongBar/>
		<ToastContainer />
    </div>
  )
}

export default App
