import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components'
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
	
  return (
    <div className='flex flex-col h-[100dvh] w-full overflow-auto bg-primary'>
      <Navbar/>
      <div className="flex h-full">
        <Routes>
          <Route path={'/'} element={<Home/>}/>
        </Routes>
      </div>
      <div className="flex p-1 w-full text sm bg-zinc-600 text-white justify-center">Copyrights © 2024</div>
    </div>
  )
}

export default App
